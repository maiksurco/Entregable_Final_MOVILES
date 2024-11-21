package com.example.msgestion_postulacion.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.msgestion_postulacion.dto.OfertaDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@FeignClient(name = "ms-gestionoferta-service", path = "/oferta")
public interface OfertaFeign {
    @CircuitBreaker(name = "ofertaListarPorIdCB", fallbackMethod = "fallbackMethod")
    @GetMapping("/{id}")
    OfertaDto buscarPorId(@PathVariable("id") Integer id);

    // Método de fallback
    default OfertaDto fallbackMethod(Integer id, Throwable throwable) {
        // Devuelve un objeto EstudianteDto con valores predeterminados
        OfertaDto ofertaFallback = new OfertaDto();
        ofertaFallback.setId(id);
        ofertaFallback.setTitulo("Oferta no disponible");
        // Establece otros valores predeterminados según tu estructura de EstudianteDto
        return ofertaFallback;
    }
}
