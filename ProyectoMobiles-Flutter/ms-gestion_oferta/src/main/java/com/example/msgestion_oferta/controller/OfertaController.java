package com.example.msgestion_oferta.controller;

import com.example.msgestion_oferta.entity.Oferta;
import com.example.msgestion_oferta.service.OfertaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/oferta")
public class OfertaController {
    @Autowired
    private OfertaService ofertaService;

    @GetMapping
    ResponseEntity<List<Oferta>> lista(){
        return ResponseEntity.ok(ofertaService.lista());
    }
    @PostMapping
    ResponseEntity<Oferta> guardar(@RequestBody Oferta oferta) {
        return ResponseEntity.ok(ofertaService.guardar((oferta)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Oferta> buscarPorId(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok(ofertaService.buscarPorId(id).get());

    }

    @PutMapping
    ResponseEntity<Oferta> actualizar(@RequestBody Oferta oferta){
        return ResponseEntity.ok(ofertaService.actualizar((oferta)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<List<Oferta>> eleminar(@PathVariable(required = true) Integer id){
        ofertaService.eleminar(id);
        return ResponseEntity.ok(ofertaService.lista());

    }
}
