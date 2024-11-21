package com.example.msgestion_estudiantes.repository;


import com.example.msgestion_estudiantes.entity.Estudiante;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EstudianteRepository extends JpaRepository <Estudiante,Integer> {
}
