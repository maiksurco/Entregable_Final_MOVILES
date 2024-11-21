package com.example.msgestion_estudiantes.service;

import com.example.msgestion_estudiantes.entity.Estudiante;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public interface EstudianteService {
    List<Estudiante> lista();
    Estudiante guardar(Estudiante estudiante);
    Optional<Estudiante> buscarPorId(Integer id);
    Estudiante actualizar(Estudiante estudiante);
    void eleminar(Integer id);
}