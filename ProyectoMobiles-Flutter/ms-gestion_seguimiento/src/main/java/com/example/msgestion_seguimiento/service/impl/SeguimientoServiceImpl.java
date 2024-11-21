package com.example.msgestion_seguimiento.service.impl;

import com.example.msgestion_seguimiento.dto.EstudianteDto;
import com.example.msgestion_seguimiento.dto.OfertaDto;
import com.example.msgestion_seguimiento.entity.Seguimiento;
import com.example.msgestion_seguimiento.feign.EstudianteFeign;
import com.example.msgestion_seguimiento.feign.OfertaFeign;
import com.example.msgestion_seguimiento.repository.SeguimientoRepository;
import com.example.msgestion_seguimiento.service.SeguimientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
// import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@Service
public class SeguimientoServiceImpl implements SeguimientoService {
    @Autowired
    private SeguimientoRepository seguimientoRepository;

    @Autowired
    private EstudianteFeign estudianteFeign;

    @Autowired
    private OfertaFeign ofertaFeign;

    @Override
    public List<Seguimiento> lista() {
        List<Seguimiento> seguimientos = seguimientoRepository.findAll();
        // Carga los datos de Estudiante, Oferta y Empresa para cada seguimiento
        for (Seguimiento seguimiento : seguimientos) {
            if (seguimiento.getEstudianteId() != null) {
                EstudianteDto estudianteDto = estudianteFeign.buscarPorId(seguimiento.getEstudianteId());
                seguimiento.setEstudianteDto(estudianteDto); // Asignar el Estudiante DTO
            }
            if (seguimiento.getOfertaId() != null) {
                OfertaDto ofertaDto = ofertaFeign.buscarPorId(seguimiento.getOfertaId());
                seguimiento.setOfertaDto(ofertaDto); // Asignar el Oferta DTO

            }
        }
        return seguimientos;
    }

    @Override
    public Seguimiento guardar(Seguimiento seguimiento) {
        return seguimientoRepository.save(seguimiento);
    }

    @Override
    public Optional<Seguimiento> buscarPorId(Integer id) {
        Optional<Seguimiento> seguimientoOptional = seguimientoRepository.findById(id);
        // Si se encuentra el seguimiento, cargar datos de Estudiante, Oferta y Empresa
        if (seguimientoOptional.isPresent()) {
            Seguimiento seguimiento = seguimientoOptional.get();
            if (seguimiento.getEstudianteId() != null) {
                EstudianteDto estudianteDto = estudianteFeign.buscarPorId(seguimiento.getEstudianteId());
                seguimiento.setEstudianteDto(estudianteDto); // Asignar el Estudiante DTO
            }
            if (seguimiento.getOfertaId() != null) {
                OfertaDto ofertaDto = ofertaFeign.buscarPorId(seguimiento.getOfertaId());
                seguimiento.setOfertaDto(ofertaDto); // Asignar el Oferta DTO
            }
            return Optional.of(seguimiento);
        }
        return Optional.empty();
    }

    @Override
    public Seguimiento actualizar(Seguimiento seguimiento) {
        return seguimientoRepository.save(seguimiento);
    }

    @Override
    public void eleminar(Integer id) {
        seguimientoRepository.deleteById(id);

    }

    // @Override
    // public void subirArchivo(Integer id, MultipartFile archivo) throws IOException {
    //     // Verifica si el seguimiento existe
    //     Optional<Seguimiento> seguimientoOptional = seguimientoRepository.findById(id);
    //     if (seguimientoOptional.isEmpty()) {
    //         throw new RuntimeException("Seguimiento con ID " + id + " no encontrado.");
    //     }

    //     // Valida que el archivo no esté vacío
    //     if (archivo.isEmpty()) {
    //         throw new RuntimeException("El archivo está vacío.");
    //     }

    //     // Define la ruta donde se almacenará el archivo
    //     String uploadsDir = "uploads/";
    //     Path uploadsPath = Paths.get(uploadsDir);

    //     // Crea el directorio si no existe
    //     if (!Files.exists(uploadsPath)) {
    //         Files.createDirectories(uploadsPath);
    //     }

    //     // Guarda el archivo en la carpeta `uploads/`
    //     String archivoNombre = "seguimiento_" + id + "_" + archivo.getOriginalFilename();
    //     Path archivoPath = uploadsPath.resolve(archivoNombre);
    //     Files.copy(archivo.getInputStream(), archivoPath, StandardCopyOption.REPLACE_EXISTING);

    //     // (Opcional) Log para confirmar
    //     System.out.println("Archivo guardado en: " + archivoPath.toAbsolutePath());
    // }

}