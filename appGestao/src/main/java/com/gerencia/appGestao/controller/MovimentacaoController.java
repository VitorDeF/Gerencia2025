package com.gerencia.appGestao.controller;

import com.gerencia.appGestao.dto.MovimentacaoDTO;
import com.gerencia.appGestao.model.MovimentacaoModel;
import com.gerencia.appGestao.model.ProdutoModel;
import com.gerencia.appGestao.repository.MovimentacaoRepository;
import com.gerencia.appGestao.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MovimentacaoController {
    private final MovimentacaoRepository movimentacaoRepository;
    private final ProdutoRepository produtoRepository;

    public MovimentacaoController(MovimentacaoRepository movimentacaoRepository, ProdutoRepository produtoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
        this.produtoRepository = produtoRepository;
    }

    @PostMapping("/novaMovimentacao")
    public MovimentacaoDTO salvar(@RequestBody MovimentacaoDTO dto) {
        MovimentacaoModel model = new MovimentacaoModel();
        model.setQuantidade(dto.getQuantidade());
        model.setDescricao(dto.getDescricao());
        model.setData(dto.getData());
        ProdutoModel produto = produtoRepository.findById(dto.getProdutoId()).orElseThrow();
        model.setProdutoId(produto);

        MovimentacaoModel saved = movimentacaoRepository.save(model);

        MovimentacaoDTO response = new MovimentacaoDTO();
        response.setId(saved.getId());
        response.setProdutoId(saved.getProdutoId().getId());
        response.setQuantidade(saved.getQuantidade());
        response.setDescricao(saved.getDescricao());
        response.setData(saved.getData());
        return response;
    }

    @GetMapping("/movimentacoes")
    public List<MovimentacaoDTO> listarMovimentacoes() {
        return movimentacaoRepository.findAll().stream().map(mov -> {
            MovimentacaoDTO dto = new MovimentacaoDTO();
            dto.setId(mov.getId());
            dto.setProdutoId(mov.getProdutoId() != null ? mov.getProdutoId().getId() : null);
            dto.setQuantidade(mov.getQuantidade());
            dto.setDescricao(mov.getDescricao());
            dto.setData(mov.getData());
            return dto;
        }).collect(Collectors.toList());
    }
}