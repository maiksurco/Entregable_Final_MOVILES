package com.example.msgestion_notificacion.service;


import com.example.msgestion_notificacion.entity.Notificacion;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface NotificacionService {
    List<Notificacion> lista();
    Notificacion guardar(Notificacion notificacion);
    Optional<Notificacion> buscarPorId(Integer id);
    Notificacion actualizar(Notificacion notificacion);
    void eleminar(Integer id);
}