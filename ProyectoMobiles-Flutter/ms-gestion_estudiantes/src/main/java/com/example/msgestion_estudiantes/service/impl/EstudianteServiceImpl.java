package com.example.msgestion_estudiantes.service.impl;

import com.example.msgestion_estudiantes.dto.AuthUserDto;
import com.example.msgestion_estudiantes.entity.Estudiante;
import com.example.msgestion_estudiantes.feign.AuthUserFeign;
import com.example.msgestion_estudiantes.repository.EstudianteRepository;
import com.example.msgestion_estudiantes.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EstudianteServiceImpl implements EstudianteService {
    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private AuthUserFeign authUserFeign;

    @Override
    public List<Estudiante> lista() {
        List<Estudiante> estudiantes = estudianteRepository.findAll();
        // Cargar datos de AuthUserDto para cada estudiante
        for (Estudiante estudiante : estudiantes) {
            if (estudiante.getAuthUserId() != null) {
                AuthUserDto authUserDto = authUserFeign.buscarPorId(estudiante.getAuthUserId());
                estudiante.setAuthUserDto(authUserDto); // Aquí se asigna el DTO al estudiante
            }
        }
        return estudiantes;
    }

    @Override
    public Estudiante guardar(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Optional<Estudiante> buscarPorId(Integer id) {
        Optional<Estudiante> estudianteOptional = estudianteRepository.findById(id);
        if (estudianteOptional.isPresent()) {
            Estudiante estudiante = estudianteOptional.get();
            
            // Si el estudiante tiene un ID de usuario autenticado, obtener los detalles de ese usuario
            if (estudiante.getAuthUserId() != null) {
                AuthUserDto authUserDto = authUserFeign.buscarPorId(estudiante.getAuthUserId());
                // Setear el DTO en el campo transitorio de la entidad Estudiante
                estudiante.setAuthUserDto(authUserDto);
            }
            
            return Optional.of(estudiante);
        }
        return Optional.empty();
    }

    @Override
    public Estudiante actualizar(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    public void eleminar(Integer id) {
        estudianteRepository.deleteById(id);
    }

    // Método para obtener información del authUser desde ms-auth
    public AuthUserDto obtenerUsuarioPorId(Integer id) {
        return authUserFeign.buscarPorId(id);
    }
}