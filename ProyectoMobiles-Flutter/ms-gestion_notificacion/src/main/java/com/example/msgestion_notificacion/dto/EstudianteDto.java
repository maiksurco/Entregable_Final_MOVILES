package com.example.msgestion_notificacion.dto;

import lombok.Data;

@Data
public class EstudianteDto {
    private Integer id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String carrera;
    private String universidad;
    private String habilidades;
    private String horasCompletadas;
}
