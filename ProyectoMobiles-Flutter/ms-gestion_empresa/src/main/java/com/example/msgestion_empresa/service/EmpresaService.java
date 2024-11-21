package com.example.msgestion_empresa.service;


import com.example.msgestion_empresa.entity.Empresa;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface EmpresaService {
    List<Empresa> lista();
    Empresa guardar(Empresa empresa);
    Optional<Empresa> buscarPorId(Integer id);
    Empresa actualizar(Empresa empresa);
    void eleminar(Integer id);
}
