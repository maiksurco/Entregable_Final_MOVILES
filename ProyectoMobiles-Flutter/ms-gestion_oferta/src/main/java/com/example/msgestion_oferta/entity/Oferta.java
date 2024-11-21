package com.example.msgestion_oferta.entity;

import com.example.msgestion_oferta.dto.EmpresaDto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Oferta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo;
    private String descripcion;
    private String ubicacion;
    private String tipoPracticante;
    private String duracion; //DIAS, MESES

    // Campo para almacenar el ID de la empresa asociada
    private Integer empresaId;

    // Campo transitorio para almacenar datos de la empresa sin persistencia
    @Transient
    private EmpresaDto empresaDto;
}