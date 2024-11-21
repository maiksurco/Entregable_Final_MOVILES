package com.example.msgestion_empresa.service.impl;

import com.example.msgestion_empresa.entity.Empresa;
import com.example.msgestion_empresa.repository.EmpresaRepository;
import com.example.msgestion_empresa.service.EmpresaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EmpresaServiceImpl implements EmpresaService {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Override
    public List<Empresa> lista() {
        return empresaRepository.findAll();
    }

    @Override
    public Empresa guardar(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @Override
    public Optional<Empresa> buscarPorId(Integer id) {
        return empresaRepository.findById(id);
    }

    @Override
    public Empresa actualizar(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @Override
    public void eleminar(Integer id) {
        empresaRepository.deleteById(id);

    }
}
