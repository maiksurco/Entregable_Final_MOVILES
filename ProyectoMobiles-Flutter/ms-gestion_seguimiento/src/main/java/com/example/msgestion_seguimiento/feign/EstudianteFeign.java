package com.example.msgestion_seguimiento.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.msgestion_seguimiento.dto.EstudianteDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@FeignClient(name = "ms-gestionestudiantes-service", path = "/estudiante")
public interface EstudianteFeign {
    @CircuitBreaker(name = "estudianteListarPorIdCB", fallbackMethod = "fallbackMethod")
    @GetMapping("/{id}")
    EstudianteDto buscarPorId(@PathVariable("id") Integer id);

    // Método de fallback
    default EstudianteDto fallbackMethod(Integer id, Throwable throwable) {
        // Devuelve un objeto EstudianteDto con valores predeterminados
        EstudianteDto estudianteFallback = new EstudianteDto();
        estudianteFallback.setId(id);
        estudianteFallback.setNombre("Estudiante no disponible");
        // Establece otros valores predeterminados según tu estructura de EstudianteDto
        return estudianteFallback;
    }
}