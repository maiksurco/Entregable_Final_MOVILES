package com.example.msgestion_postulacion.dto;

import lombok.Data;

@Data
public class EstudianteDto {
    private Integer id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private Integer dni;
    private String carrera;
    private String universidad;
    private String habilidades;
    private String horasCompletadas;
}