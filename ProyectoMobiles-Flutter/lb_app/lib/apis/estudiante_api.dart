import 'package:dio/dio.dart';
import 'package:lb_app/modelo/EstudianteModelo.dart';
import 'package:lb_app/util/UrlApi.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:retrofit/http.dart';

part 'estudiante_api.g.dart';

@RestApi(baseUrl: UrlApi.urlApix)
abstract class EstudianteApi {
  factory EstudianteApi(Dio dio, {String? baseUrl}) = _EstudianteApi;

  static EstudianteApi create() {
    final dio = Dio();
    dio.interceptors.add(PrettyDioLogger());
    return EstudianteApi(dio);
  }

  // Método para obtener la lista completa de estudiantes
  @GET("/estudiante")
  Future<List<EstudianteModelo>> listarEstudiantes();

  // Método para buscar un estudiante específico por su ID
  @GET("/estudiante/{id}")
  Future<EstudianteModelo> buscarEstudiante(@Path("id") int id);

  // Método para editar/actualizar un estudiante existente
  @PUT("/estudiante")
  Future<EstudianteModelo> editarEstudiante(@Body() EstudianteModelo estudiante);

  // Método para eliminar un estudiante por su ID
  @DELETE("/estudiante/{id}")
  Future<void> eliminarEstudiante(@Path("id") int id);
}