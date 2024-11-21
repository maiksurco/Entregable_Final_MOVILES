package com.example.msgestion_notificacion.entity;

import java.time.LocalDateTime;
import com.example.msgestion_notificacion.dto.EstudianteDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String mensaje;
    private LocalDateTime fechaEnvio;
 
    // Campo para almacenar el ID de la estudiante asociada
    private Integer estudianteId;

    // Campo transitorio para almacenar datos de la estudiante sin persistencia
    @Transient
    private EstudianteDto estudianteDto;
}