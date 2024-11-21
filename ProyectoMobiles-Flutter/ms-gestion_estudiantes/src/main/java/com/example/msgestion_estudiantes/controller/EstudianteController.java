package com.example.msgestion_estudiantes.controller;


import com.example.msgestion_estudiantes.entity.Estudiante;
import com.example.msgestion_estudiantes.service.EstudianteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/estudiante")
public class EstudianteController {
    @Autowired
    private EstudianteService estudianteService;

    @GetMapping
    ResponseEntity<List<Estudiante>> lista(){
        return ResponseEntity.ok(estudianteService.lista());
    }
    @PostMapping
    ResponseEntity<Estudiante> guardar(@RequestBody Estudiante estudiante) {
        return ResponseEntity.ok(estudianteService.guardar((estudiante)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Estudiante> buscarPorId(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok(estudianteService.buscarPorId(id).get());

    }

    @PutMapping
    ResponseEntity<Estudiante> actualizar(@RequestBody Estudiante estudiante){
        return ResponseEntity.ok(estudianteService.actualizar((estudiante)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<List<Estudiante>> eleminar(@PathVariable(required = true) Integer id){
        estudianteService.eleminar(id);
        return ResponseEntity.ok(estudianteService.lista());

    }
}
