package com.example.msgestion_postulacion.dto;

import lombok.Data;

@Data
public class OfertaDto {
    private Integer id;
    private String titulo;
    private String descripcion;
    private String ubicacion;
    private String tipoPracticante;
    private String duracion;
}
