package com.gerencia.appGestao.controller;

import com.gerencia.appGestao.model.MovimentacaoModel;
import com.gerencia.appGestao.repository.MovimentacaoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovimentacaoController {
    private final MovimentacaoRepository movimentacaoRepository;
    public MovimentacaoController(MovimentacaoRepository movimentacaoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
    }

    @PostMapping("/novaMovimentacao")
    public MovimentacaoModel salvar(@RequestBody MovimentacaoModel movimentacaoModel) {
        return movimentacaoRepository.save(movimentacaoModel);
    }

    @GetMapping("/movimentacoes")
    public List <MovimentacaoModel> listarMovimentacoes() {
        return movimentacaoRepository.findAll();
    }
}
