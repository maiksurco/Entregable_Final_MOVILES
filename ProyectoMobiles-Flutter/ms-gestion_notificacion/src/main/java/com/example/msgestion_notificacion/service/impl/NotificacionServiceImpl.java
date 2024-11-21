package com.example.msgestion_notificacion.service.impl;

import com.example.msgestion_notificacion.dto.EstudianteDto;
import com.example.msgestion_notificacion.entity.Notificacion;
import com.example.msgestion_notificacion.feign.EstudianteFeign;
import com.example.msgestion_notificacion.repository.NotificacionRepository;
import com.example.msgestion_notificacion.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NotificacionServiceImpl implements NotificacionService {
    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private EstudianteFeign estudianteFeign;

    @Override
    public List<Notificacion> lista() {
        List<Notificacion> notificacions = notificacionRepository.findAll();
        // Cargar datos de EstudianteDto para cada notificacion
        for (Notificacion notificacion : notificacions){
            if (notificacion.getEstudianteId() != null) {
                EstudianteDto estudianteDto = estudianteFeign.buscarPorId(notificacion.getEstudianteId());
                notificacion.setEstudianteDto(estudianteDto);
            }
        }
        return notificacions;
    }

    @Override
    public Notificacion guardar(Notificacion notificacion) {
        return notificacionRepository.save(notificacion);
    }

    @Override
    public Optional<Notificacion> buscarPorId(Integer id) {
        Optional<Notificacion> notificacionOptional = notificacionRepository.findById(id);
        if (notificacionOptional.isPresent()){
            Notificacion notificacion = notificacionOptional.get();
            if (notificacion.getEstudianteId() != null) {
                EstudianteDto estudianteDto = estudianteFeign.buscarPorId(notificacion.getEstudianteId());
                notificacion.setEstudianteDto(estudianteDto);
            }
            return Optional.of(notificacion);
        } 
        return Optional.empty();
    }

    @Override
    public Notificacion actualizar(Notificacion notificacion) {
        return notificacionRepository.save(notificacion);
    }

    @Override
    public void eleminar(Integer id) {
        notificacionRepository.deleteById(id);

    }
    // Metodo para obtener información del estudiante desde ms-gestion_estudiante
    public EstudianteDto obtenerEstudiantePorId(Integer id) {
        return estudianteFeign.buscarPorId(id);
    }
}