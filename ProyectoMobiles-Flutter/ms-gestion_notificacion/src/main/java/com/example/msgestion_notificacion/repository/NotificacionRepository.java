package com.example.msgestion_notificacion.repository;

import com.example.msgestion_notificacion.entity.Notificacion;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificacionRepository extends JpaRepository <Notificacion,Integer> {
}