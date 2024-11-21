import 'package:json_annotation/json_annotation.dart';
import 'PostulacionModelo.dart';

@JsonSerializable()
class NotificacionModelo {
  NotificacionModelo({
    required this.id,
    required this.mensaje,
    required this.fechaEnvio,
    required this.estudianteId,
    required this.estudianteDto,
  });

  final int id;
  final String mensaje;
  final DateTime fechaEnvio;
  final int estudianteId;
  final EstudianteDto estudianteDto;

  factory NotificacionModelo.fromJson(Map<String, dynamic> json) {
    return NotificacionModelo(
      id: json['id'] ?? 0,
      mensaje: json['mensaje'] ?? '',
      fechaEnvio: DateTime.parse(json['fechaEnvio'] ?? ''),
      estudianteId: json['estudianteId'] ?? 0,
      estudianteDto: EstudianteDto.fromJson(json['estudianteDto'] ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'mensaje': mensaje,
      'fechaEnvio': fechaEnvio.toIso8601String(),
      'estudianteId': estudianteId,
      'estudianteDto': estudianteDto.toJson(),
    };
  }
}