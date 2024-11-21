import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class PostulacionModelo {
  PostulacionModelo({
    required this.id,
    required this.estadoPostulacion,
    required this.fechaPostulacion,
    required this.estudianteId,
    required this.estudianteDto,
    required this.ofertaId,
    required this.ofertaDto,
  });

  final int id;
  final String estadoPostulacion;
  final String fechaPostulacion;
  final int estudianteId;
  final EstudianteDto estudianteDto;
  final int ofertaId;
  final OfertaDto ofertaDto;

  factory PostulacionModelo.fromJson(Map<String, dynamic> json) {
    return PostulacionModelo(
      id: json['id'] ?? 0,
      estadoPostulacion: json['estadoPostulacion'] ?? '',
      fechaPostulacion: json['fechaPostulacion'] ?? '',
      estudianteId: json['estudianteId'] ?? 0,
      estudianteDto: EstudianteDto.fromJson(json['estudianteDto'] ?? {}),
      ofertaId: json['ofertaId'] ?? 0,
      ofertaDto: OfertaDto.fromJson(json['ofertaDto'] ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'estadoPostulacion': estadoPostulacion,
      'fechaPostulacion': fechaPostulacion,
      'estudianteId': estudianteId,
      'estudianteDto': estudianteDto.toJson(),
      'ofertaId': ofertaId,
      'ofertaDto': ofertaDto.toJson(),
    };
  }
}

@JsonSerializable()
class EstudianteDto {
  EstudianteDto({
    required this.id,
    required this.nombre,
    required this.apellidoPaterno,
    required this.apellidoMaterno,
    required this.dni,
    required this.carrera,
    required this.universidad,
    required this.habilidades,
    required this.horasCompletadas,
  });

  final int id;
  final String nombre;
  final String apellidoPaterno;
  final String apellidoMaterno;
  final int dni;
  final String carrera;
  final String universidad;
  final String habilidades;
  final String horasCompletadas;

  factory EstudianteDto.fromJson(Map<String, dynamic> json) {
    return EstudianteDto(
      id: json['id'] ?? 0,
      nombre: json['nombre'] ?? '',
      apellidoPaterno: json['apellidoPaterno'] ?? '',
      apellidoMaterno: json['apellidoMaterno'] ?? '',
      dni: json['dni'] ?? 0,
      carrera: json['carrera'] ?? '',
      universidad: json['universidad'] ?? '',
      habilidades: json['habilidades'] ?? '',
      horasCompletadas: json['horasCompletadas'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'apellidoPaterno': apellidoPaterno,
      'apellidoMaterno': apellidoMaterno,
      'dni': dni,
      'carrera': carrera,
      'universidad': universidad,
      'habilidades': habilidades,
      'horasCompletadas': horasCompletadas,
    };
  }
}

@JsonSerializable()
class OfertaDto {
  OfertaDto({
    required this.id,
    required this.titulo,
    required this.descripcion,
    required this.ubicacion,
    required this.tipoPracticante,
    required this.duracion,
  });

  final int id;
  final String titulo;
  final String descripcion;
  final String ubicacion;
  final String tipoPracticante;
  final String duracion;

  factory OfertaDto.fromJson(Map<String, dynamic> json) {
    return OfertaDto(
      id: json['id'] ?? 0,
      titulo: json['titulo'] ?? '',
      descripcion: json['descripcion'] ?? '',
      ubicacion: json['ubicacion'] ?? '',
      tipoPracticante: json['tipoPracticante'] ?? '',
      duracion: json['duracion'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'titulo': titulo,
      'descripcion': descripcion,
      'ubicacion': ubicacion,
      'tipoPracticante': tipoPracticante,
      'duracion': duracion,
    };
  }
}