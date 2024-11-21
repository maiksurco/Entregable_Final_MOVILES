package com.example.msgestion_estudiantes.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.msgestion_estudiantes.dto.AuthUserDto;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@FeignClient(name = "ms-auth-service", path = "/auth")
public interface AuthUserFeign {
    @CircuitBreaker(name = "authuserCB", fallbackMethod = "fallbackMethod")
    @GetMapping("/users/{id}")
    AuthUserDto buscarPorId(@PathVariable("id") Integer id);

    // Método de fallback
    default AuthUserDto fallbackMethod(Integer id, Throwable throwable) {
        // Devuelve un objeto AuthUserDto con valores predeterminados
        AuthUserDto authUserFallback = new AuthUserDto();
        authUserFallback.setId(id);
        authUserFallback.setUserName("Usuario no disponible");
        // Establece otros valores predeterminados según tu estructura de AuthUserDto
        return authUserFallback;
    }
}