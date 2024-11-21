package com.example.msgestion_empresa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.msgestion_empresa.entity.Empresa;
import com.example.msgestion_empresa.service.EmpresaService;

import java.util.List;
@RestController
@RequestMapping("/empresa")
public class EmpresaController {
    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    ResponseEntity<List<Empresa>> lista(){
        return ResponseEntity.ok(empresaService.lista());
    }
    @PostMapping
    ResponseEntity<Empresa> guardar(@RequestBody Empresa empresa) {
        return ResponseEntity.ok(empresaService.guardar((empresa)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Empresa> buscarPorId(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok(empresaService.buscarPorId(id).get());

    }

    @PutMapping
    ResponseEntity<Empresa> actualizar(@RequestBody Empresa empresa){
        return ResponseEntity.ok(empresaService.actualizar((empresa)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<List<Empresa>> eleminar(@PathVariable(required = true) Integer id){
        empresaService.eleminar(id);
        return ResponseEntity.ok(empresaService.lista());

    }
}
