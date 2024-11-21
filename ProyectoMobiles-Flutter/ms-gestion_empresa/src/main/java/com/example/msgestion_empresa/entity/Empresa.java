package com.example.msgestion_empresa.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String sector;
    private String descripcion;
    private String direccion;
    private String telefono;
}
