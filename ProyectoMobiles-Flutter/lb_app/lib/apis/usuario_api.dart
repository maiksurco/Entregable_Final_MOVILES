import 'package:dio/dio.dart';
import 'package:lb_app/modelo/UsuarioModelo.dart';
import 'package:lb_app/util/UrlApi.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:retrofit/http.dart';
import 'package:retrofit/retrofit.dart';

part 'usuario_api.g.dart';

@RestApi(baseUrl: UrlApi.urlApix)
abstract class UsuarioApi {
  // Constructor de fábrica para Retrofit
  factory UsuarioApi(Dio dio, {String baseUrl}) = _UsuarioApi;

  // Método estático de creación para configurar interceptores y otros ajustes de Dio
  static UsuarioApi create() {
    final dio = Dio(
      BaseOptions(
        baseUrl: UrlApi.urlApix, // Usa tu URL del servidor aquí
        connectTimeout: Duration(milliseconds: 30000),  // Tiempo de espera para la conexión (en milisegundos)
        receiveTimeout: Duration(milliseconds: 30000),  // Tiempo de espera para la respuesta (en milisegundos)
        headers: {
          'Content-Type': 'application/json', // Asegúrate de usar el tipo correcto
        },
      ),
    );
    dio.interceptors.add(PrettyDioLogger()); // Para ver los logs detallados
    return UsuarioApi(dio); // Retorna la instancia de UsuarioApi configurada
  }

  // Endpoint para el login
  @POST("/auth/login")
  Future<RespUsuarioModelo> login(@Body() UsuarioModelo usuario);
}