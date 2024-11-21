import 'package:json_annotation/json_annotation.dart';

/// Modelo para la solicitud de autenticación (inicio de sesión)
@JsonSerializable()
class UsuarioModelo {
  UsuarioModelo({
    required this.userName,
    required this.password,
  });

  final String userName;
  final String password;

  // Método para crear una instancia de UsuarioModelo a partir de un JSON
  factory UsuarioModelo.fromJson(Map<String, dynamic> json) => UsuarioModelo(
        userName: json['userName'] ??
            '', // Asignar un valor vacío por defecto si no existe
        password: json['password'] ??
            '', // Asignar un valor vacío por defecto si no existe
      );

  // Método para convertir la instancia actual de UsuarioModelo a un JSON
  Map<String, dynamic> toJson() => {
        'userName': userName,
        'password': password,
      };
}

/// Modelo para la respuesta de autenticación
@JsonSerializable()
class RespUsuarioModelo {
  RespUsuarioModelo({
    required this.token,
    required this.authUserId,
    required this.role,
  });

  late String token;
  late int authUserId;
  late String role;

  factory RespUsuarioModelo.fromJson(Map<String, dynamic> json) =>
      RespUsuarioModelo(
        token: json['token'] ?? '',
        authUserId: json['authUserId'] ?? 0,
        role: json['role'] ?? '',
      );

  Map<String, dynamic> toJson() => {
        'token': token,
        'authUserId': authUserId,
        'role': role,
      };
}
