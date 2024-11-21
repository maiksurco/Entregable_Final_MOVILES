import 'package:dio/dio.dart';
import 'package:lb_app/modelo/NotificacionModelo.dart';
import 'package:lb_app/modelo/PostulacionModelo.dart';
import 'package:lb_app/util/UrlApi.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:retrofit/http.dart';
import 'package:retrofit/retrofit.dart';

part 'postulacion_api.g.dart';

@RestApi(baseUrl: UrlApi.urlApix)
abstract class PostulacionApi {
  factory PostulacionApi(Dio dio,{String? baseUrl}) = _PostulacionApi;

  static PostulacionApi create(){
    final dio = Dio();
    dio.interceptors.add(PrettyDioLogger());
    return PostulacionApi(dio);
  }

  // Método para guardar una notificación
  @POST('/notificacion')
  Future<NotificacionModelo> guardarNotificacion(@Body() NotificacionModelo notificacion);
  
  // Metodo para obtener la lista completa de las postulaciones
  @GET('/postulacion')
  Future<List<PostulacionModelo>> listarPostulaciones();

  // Metodo para buscar una postulacion especifico por su ID
  @GET('/postulacion/{id}')
  Future<PostulacionModelo> buscarPostulacion(@Path('id') int id);

  // Método para editar/actualizar una postulacion existente
  @PUT("/postulacion")
  Future<PostulacionModelo> editarPostulacion(@Body() PostulacionModelo postulacion);

  // Método para eliminar una postulacion por su ID
  @DELETE("/postulacion/{id}")
  Future<void> eliminarPostulacion(@Path("id") int id);
}