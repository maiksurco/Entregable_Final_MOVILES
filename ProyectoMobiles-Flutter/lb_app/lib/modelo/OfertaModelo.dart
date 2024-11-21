import 'package:json_annotation/json_annotation.dart';

// Indica que esta clase se serializa y deserializa con JSON
@JsonSerializable()
class OfertaModelo {
  // Constructor
  OfertaModelo({
    required this.id,
    required this.titulo,
    required this.descripcion,
    required this.ubicacion,
    required this.tipoPracticante,
    required this.duracion,
    required this.empresaId,
    required this.empresaDto,
  });

  // Campos del modelo
  final int id;
  final String titulo;
  final String descripcion;
  final String ubicacion;
  final String tipoPracticante;
  final String duracion;
  final int empresaId;
  final EmpresaDto empresaDto;

  // Método para convertir de JSON a objeto OfertaModelo
  factory OfertaModelo.fromJson(Map<String, dynamic> json) {
    return OfertaModelo(
      id: json['id'] ?? 0,
      titulo: json['titulo'] ?? '',
      descripcion: json['descripcion'] ?? '',
      ubicacion: json['ubicacion'] ?? '',
      tipoPracticante: json['tipoPracticante'] ?? '',
      duracion: json['duracion'] ?? '',
      empresaId: json['empresaId'] ?? 0,
      empresaDto: EmpresaDto.fromJson(json['empresaDto'] ?? {}), // Asegúrate de que empresaDto no sea nulo
    );
  }

  // Método para convertir de objeto OfertaModelo a JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'titulo': titulo,
      'descripcion': descripcion,
      'ubicacion': ubicacion,
      'tipoPracticante': tipoPracticante,
      'duracion': duracion,
      'empresaId': empresaId,
      'empresaDto': empresaDto.toJson(), // Convierte empresaDto a JSON
    };
  }
}

@JsonSerializable()
class EmpresaDto {
  // Constructor de la clase EmpresaDto
  EmpresaDto({
    required this.id,
    required this.nombre,
    required this.sector,
    required this.descripcion,
    required this.direccion,
    required this.telefono,
  });

  // Campos de la clase EmpresaDto
  final int id;
  final String nombre;
  final String sector;
  final String descripcion;
  final String direccion;
  final String telefono;

  // Método para convertir de JSON a objeto EmpresaDto
  factory EmpresaDto.fromJson(Map<String, dynamic> json) {
    return EmpresaDto(
      id: json['id'] ?? 0,
      nombre: json['nombre'] ?? '',
      sector: json['sector'] ?? '',
      descripcion: json['descripcion'] ?? '',
      direccion: json['direccion'] ?? '',
      telefono: json['telefono'] ?? '',
    );
  }

  // Método para convertir de objeto EmpresaDto a JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'sector': sector,
      'descripcion': descripcion,
      'direccion': direccion,
      'telefono': telefono,
    };
  }
}