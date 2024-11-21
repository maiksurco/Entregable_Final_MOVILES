package com.example.msgestion_postulacion.repository;

import com.example.msgestion_postulacion.entity.Postulacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostulacionRepository extends JpaRepository <Postulacion,Integer> {
}