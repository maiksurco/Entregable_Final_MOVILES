package com.example.msgestion_seguimiento.repository;

import com.example.msgestion_seguimiento.entity.Seguimiento;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SeguimientoRepository extends JpaRepository <Seguimiento,Integer> {
}
