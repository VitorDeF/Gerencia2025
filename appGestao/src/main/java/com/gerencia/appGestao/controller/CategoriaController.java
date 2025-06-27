package com.gerencia.appGestao.controller;

import com.gerencia.appGestao.dto.CategoriaDTO;
import com.gerencia.appGestao.model.CategoriaModel;
import com.gerencia.appGestao.model.ProdutoModel;
import com.gerencia.appGestao.repository.CategoriaRepository;
import com.gerencia.appGestao.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CategoriaController {
    private final CategoriaRepository categoriaRepository;
    private final ProdutoRepository produtoRepository;

    public CategoriaController(CategoriaRepository categoriaRepository, ProdutoRepository produtoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.produtoRepository = produtoRepository;
    }

    @PostMapping("/novaCategoria")
    public CategoriaDTO novaCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        CategoriaModel categoria = new CategoriaModel();
        categoria.setNome(categoriaDTO.getNome());
        CategoriaModel saved = categoriaRepository.save(categoria);
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(saved.getId());
        dto.setNome(saved.getNome());
        dto.setProdutosIds(List.of());
        return dto;
    }

    @GetMapping("/categorias")
    public List<CategoriaDTO> listarCategorias() {
        return categoriaRepository.findAll().stream().map(cat -> {
            CategoriaDTO dto = new CategoriaDTO();
            dto.setId(cat.getId());
            dto.setNome(cat.getNome());
            if (cat.getProdutos() != null) {
                dto.setProdutosIds(cat.getProdutos().stream().map(ProdutoModel::getId).collect(Collectors.toList()));
            }
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("/categorias/{id}")
    public CategoriaDTO buscarCategoriaPorId(@PathVariable Long id) {
        CategoriaModel cat = categoriaRepository.findById(id).orElseThrow();
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(cat.getId());
        dto.setNome(cat.getNome());
        if (cat.getProdutos() != null) {
            dto.setProdutosIds(cat.getProdutos().stream().map(ProdutoModel::getId).collect(Collectors.toList()));
        }
        return dto;
    }
}