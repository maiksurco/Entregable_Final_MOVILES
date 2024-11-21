package com.example.msgestion_notificacion.controller;

import com.example.msgestion_notificacion.entity.Notificacion;
import com.example.msgestion_notificacion.service.NotificacionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/notificacion")
public class NotificacionController {
    @Autowired
    private NotificacionService notificacionService;

    @GetMapping
    ResponseEntity<List<Notificacion>> lista(){
        return ResponseEntity.ok(notificacionService.lista());
    }
    @PostMapping
    ResponseEntity<Notificacion> guardar(@RequestBody Notificacion notificacion) {
        return ResponseEntity.ok(notificacionService.guardar((notificacion)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Notificacion> buscarPorId(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok(notificacionService.buscarPorId(id).get());

    }

    @PutMapping
    ResponseEntity<Notificacion> actualizar(@RequestBody Notificacion notificacion){
        return ResponseEntity.ok(notificacionService.actualizar((notificacion)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<List<Notificacion>> eleminar(@PathVariable(required = true) Integer id){
        notificacionService.eleminar(id);
        return ResponseEntity.ok(notificacionService.lista());

    }
}
