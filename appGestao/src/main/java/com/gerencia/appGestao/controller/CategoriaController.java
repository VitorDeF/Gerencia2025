package com.gerencia.appGestao.controller;

import com.gerencia.appGestao.model.CategoriaModel;
import com.gerencia.appGestao.repository.CategoriaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoriaController {
    private final CategoriaRepository categoriaRepository;

    public CategoriaController(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @PostMapping("/novaCategoria")
    public CategoriaModel novaCategoria(@RequestBody CategoriaModel categoriaModel) {
        return categoriaRepository.save(categoriaModel);
    }

    @GetMapping("/categorias")
    public List<CategoriaModel> listarCategorias() {
        return categoriaRepository.findAll();
    }

    @GetMapping("/categorias/{id}")
    public CategoriaModel buscarCategoriaPorId(@PathVariable Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    @PutMapping("/categorias/{id}")
    public CategoriaModel atualizarCategoria(@PathVariable Long id, @RequestBody CategoriaModel categoriaModel) {
        categoriaModel.setId(id);
        return categoriaRepository.save(categoriaModel);
    }

    @DeleteMapping("/categorias/{id}")
    public void deletarCategoria(@PathVariable Long id) {
        categoriaRepository.deleteById(id);
    }
}
