package com.example.msgestion_empresa.repository;


import com.example.msgestion_empresa.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository <Empresa,Integer> {
}
