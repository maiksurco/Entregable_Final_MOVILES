package com.example.msgestion_oferta.service.impl;

import com.example.msgestion_oferta.dto.EmpresaDto;
import com.example.msgestion_oferta.entity.Oferta;
import com.example.msgestion_oferta.feign.EmpresaFeign;
import com.example.msgestion_oferta.repository.OfertaRepository;
import com.example.msgestion_oferta.service.OfertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OfertaServiceImpl implements OfertaService {
    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private EmpresaFeign empresaFeign;

    @Override
    public List<Oferta> lista() {
        List<Oferta> ofertas = ofertaRepository.findAll();
        // Cargar datos de EmpresaDto para cada oferta
        for (Oferta oferta : ofertas) {
            if (oferta.getEmpresaId() != null) {
                EmpresaDto empresaDto = empresaFeign.buscarPorId(oferta.getEmpresaId());
                oferta.setEmpresaDto(empresaDto);
            }
        }
        return ofertas;
    }

    @Override
    public Oferta guardar(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    @Override
    public Optional<Oferta> buscarPorId(Integer id) {
        Optional<Oferta> ofertaOptional = ofertaRepository.findById(id);
        if (ofertaOptional.isPresent()) {
            Oferta oferta = ofertaOptional.get();
            if (oferta.getEmpresaId() != null) {
                EmpresaDto empresaDto = empresaFeign.buscarPorId(oferta.getEmpresaId());
                oferta.setEmpresaDto(empresaDto);
            }
            return Optional.of(oferta);
        }
        return Optional.empty();
    }

    @Override
    public Oferta actualizar(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    @Override
    public void eleminar(Integer id) {
        ofertaRepository.deleteById(id);

    }

    // Método para obtener información de la empresa desde ms-gestion_empresa
    public EmpresaDto obtenerEmpresaPorId(Integer id) {
        return empresaFeign.buscarPorId(id);
    }
}
