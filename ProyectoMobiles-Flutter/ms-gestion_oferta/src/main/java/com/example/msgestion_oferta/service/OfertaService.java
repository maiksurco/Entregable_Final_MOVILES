package com.example.msgestion_oferta.service;


import com.example.msgestion_oferta.entity.Oferta;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface OfertaService {
    List<Oferta> lista();
    Oferta guardar(Oferta oferta);
    Optional<Oferta> buscarPorId(Integer id);
    Oferta actualizar(Oferta oferta);
    void eleminar(Integer id);
}