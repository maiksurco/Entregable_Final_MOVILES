package com.example.msgestion_oferta.repository;


import com.example.msgestion_oferta.entity.Oferta;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OfertaRepository extends JpaRepository <Oferta,Integer> {
}
