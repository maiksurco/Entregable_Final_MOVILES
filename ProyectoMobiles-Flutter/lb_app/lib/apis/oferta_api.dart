import 'package:dio/dio.dart';
import 'package:lb_app/modelo/OfertaModelo.dart';
import 'package:lb_app/util/UrlApi.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:retrofit/http.dart';

part 'oferta_api.g.dart';

@RestApi(baseUrl: UrlApi.urlApix)
abstract class OfertaApi {
  factory OfertaApi(Dio dio, {String? baseUrl}) = _OfertaApi;

  static OfertaApi create() {
    final dio = Dio();
    dio.interceptors.add(PrettyDioLogger());
    return OfertaApi(dio);
  }

  // Método para guardar una oferta
  @POST('/oferta')
  Future<OfertaModelo> guardarOferta(@Body() OfertaModelo oferta);

  // Metodo para obtener la lista completa de las ofertas
  @GET('/oferta')
  Future<List<OfertaModelo>> listarOferta();

  // Metodo para buscar una oferta específica por su ID
  @GET('/oferta/{id}')
  Future<OfertaModelo> buscarOferta(@Path('id') int id);

  // Método para editar/actualizar una oferta existente
  @PUT('/oferta')
  Future<OfertaModelo> editarOferta(@Body() OfertaModelo oferta);

  // Método para eliminar una oferta por su ID
  @DELETE('/oferta/{id}')
  Future<void> eliminarOferta(@Path('id') int id);

  // Nuevo método para obtener empresas
  @GET('/empresa')
  Future<List<EmpresaDto>> obtenerEmpresas();
}