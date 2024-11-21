package com.example.msgestion_postulacion.controller;

import com.example.msgestion_postulacion.entity.Postulacion;
import com.example.msgestion_postulacion.service.PostulacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/postulacion")
public class PostulacionController {
    @Autowired
    private PostulacionService postulacionService;

    @GetMapping
    ResponseEntity<List<Postulacion>> lista(){
        return ResponseEntity.ok(postulacionService.lista());
    }
    @PostMapping
    ResponseEntity<Postulacion> guardar(@RequestBody Postulacion postulacion) {
        return ResponseEntity.ok(postulacionService.guardar((postulacion)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Postulacion> buscarPorId(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok(postulacionService.buscarPorId(id).get());

    }

    @PutMapping
    ResponseEntity<Postulacion> actualizar(@RequestBody Postulacion postulacion){
        return ResponseEntity.ok(postulacionService.actualizar((postulacion)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<List<Postulacion>> eleminar(@PathVariable(required = true) Integer id){
        postulacionService.eleminar(id);
        return ResponseEntity.ok(postulacionService.lista());

    }
}
