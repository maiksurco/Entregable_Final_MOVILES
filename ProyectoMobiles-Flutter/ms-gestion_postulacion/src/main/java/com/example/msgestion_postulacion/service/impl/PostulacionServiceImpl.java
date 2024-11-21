package com.example.msgestion_postulacion.service.impl;

import com.example.msgestion_postulacion.dto.EstudianteDto;
import com.example.msgestion_postulacion.dto.OfertaDto;
import com.example.msgestion_postulacion.entity.Postulacion;
import com.example.msgestion_postulacion.feign.EstudianteFeign;
import com.example.msgestion_postulacion.feign.OfertaFeign;
import com.example.msgestion_postulacion.service.PostulacionService;
import com.example.msgestion_postulacion.repository.PostulacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostulacionServiceImpl implements PostulacionService {
    @Autowired
    private PostulacionRepository postulacionRepository;

    @Autowired
    private EstudianteFeign estudianteFeign;

    @Autowired
    private OfertaFeign ofertaFeign;

    @Override
    public List<Postulacion> lista() {
        List<Postulacion> postulaciones = postulacionRepository.findAll();

        // Cargar los datos de Estudiante y Oferta para cada postulacion
        for (Postulacion postulacion : postulaciones) {
            if (postulacion.getEstudianteId() != null) {
                EstudianteDto estudianteDto = estudianteFeign.buscarPorId(postulacion.getEstudianteId());
                postulacion.setEstudianteDto(estudianteDto); // Asignar el Estudiante DTO
            }
            if (postulacion.getOfertaId() != null) {
                OfertaDto ofertaDto = ofertaFeign.buscarPorId(postulacion.getOfertaId());
                postulacion.setOfertaDto(ofertaDto); // Asignar el Oferta DTO
            }
        }

        return postulaciones;
    }

    @Override
    public Postulacion guardar(Postulacion postulacion) {
        return postulacionRepository.save(postulacion);
    }

    @Override
    public Optional<Postulacion> buscarPorId(Integer id) {
        Optional<Postulacion> postulacionOptional = postulacionRepository.findById(id);
        
        // Si se encuentra la postulacion, cargar datos de Estudiante y Oferta
        if (postulacionOptional.isPresent()) {
            Postulacion postulacion = postulacionOptional.get();

            if (postulacion.getEstudianteId() != null) {
                EstudianteDto estudianteDto = estudianteFeign.buscarPorId(postulacion.getEstudianteId());
                postulacion.setEstudianteDto(estudianteDto);  // Asignar el Estudiante DTO
            }

            if (postulacion.getOfertaId() != null) {
                OfertaDto ofertaDto = ofertaFeign.buscarPorId(postulacion.getOfertaId());
                postulacion.setOfertaDto(ofertaDto);  // Asignar el Oferta DTO
            }

            return Optional.of(postulacion);
        }

        return Optional.empty();
    }

    @Override
    public Postulacion actualizar(Postulacion postulacion) {
        return postulacionRepository.save(postulacion);
    }

    @Override
    public void eleminar(Integer id) {
        postulacionRepository.deleteById(id);

    }
}