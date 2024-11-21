import 'package:json_annotation/json_annotation.dart';

/// Modelo para la solicitud de datos del estudiante
@JsonSerializable()
class EstudianteModelo {
  EstudianteModelo({
    required this.id,
    required this.nombre,
    required this.apellidoPaterno,
    required this.apellidoMaterno,
    required this.dni,
    required this.carrera,
    required this.universidad,
    required this.habilidades,
    required this.horasCompletadas,
    required this.authUserId,
    required this.authUserDto,
  });

  late final int id;
  late final String nombre;
  late final String apellidoPaterno;
  late final String apellidoMaterno;
  late final int dni;
  late final String carrera;
  late final String universidad;
  late final String habilidades;
  late final String horasCompletadas;
  late final int authUserId;
  late final AuthUserDto authUserDto;

  // Método para crear una instancia de EstudianteModelo a partir de un JSON
  factory EstudianteModelo.fromJson(Map<String, dynamic> json) {
    return EstudianteModelo(
      id: json['id'] ?? 0,
      nombre: json['nombre'] ?? '',
      apellidoPaterno: json['apellidoPaterno'] ?? '',
      apellidoMaterno: json['apellidoMaterno'] ?? '',
      dni: json['dni'] ?? 0,
      carrera: json['carrera'] ?? '',
      universidad: json['universidad'] ?? '',
      habilidades: json['habilidades'] ?? '',
      horasCompletadas: json['horasCompletadas'] ?? '',
      authUserId: json['authUserId'] ?? 0,
      authUserDto: AuthUserDto.fromJson(json['authUserDto'] ?? {}),
    );
  }

  // Método para convertir la instancia actual de EstudianteModelo a un JSON
  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['id'] = id;
    _data['nombre'] = nombre;
    _data['apellidoPaterno'] = apellidoPaterno;
    _data['apellidoMaterno'] = apellidoMaterno;
    _data['dni'] = dni;
    _data['carrera'] = carrera;
    _data['universidad'] = universidad;
    _data['habilidades'] = habilidades;
    _data['horasCompletadas'] = horasCompletadas;
    _data['authUserId'] = authUserId;
    _data['authUserDto'] = authUserDto.toJson();
    return _data;
  }
}

/// Submodelo para authUserDto en EstudianteModelo
@JsonSerializable()
class AuthUserDto {
  AuthUserDto({
    required this.id,
    required this.userName,
  });

  late final int id;
  late final String userName;

  // Método para crear una instancia de AuthUserDto a partir de un JSON
  factory AuthUserDto.fromJson(Map<String, dynamic> json) {
    return AuthUserDto(
      id: json['id'] ?? 0,
      userName: json['userName'] ?? '',
    );
  }

  // Método para convertir la instancia actual de AuthUserDto a un JSON
  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['id'] = id;
    _data['userName'] = userName;
    return _data;
  }
}