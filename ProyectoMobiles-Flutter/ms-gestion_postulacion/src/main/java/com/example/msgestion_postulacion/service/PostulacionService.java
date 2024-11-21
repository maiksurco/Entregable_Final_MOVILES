package com.example.msgestion_postulacion.service;

import com.example.msgestion_postulacion.entity.Postulacion;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface PostulacionService {
    List<Postulacion> lista();
    Postulacion guardar(Postulacion postulacion);
    Optional<Postulacion> buscarPorId(Integer id);
    Postulacion actualizar(Postulacion postulacion);
    void eleminar(Integer id);
}