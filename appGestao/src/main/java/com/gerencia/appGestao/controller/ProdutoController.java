package com.gerencia.appGestao.controller;

import com.gerencia.appGestao.dto.ProdutoDTO;
import com.gerencia.appGestao.model.CategoriaModel;
import com.gerencia.appGestao.model.MovimentacaoModel;
import com.gerencia.appGestao.model.ProdutoModel;
import com.gerencia.appGestao.repository.CategoriaRepository;
import com.gerencia.appGestao.repository.MovimentacaoRepository;
import com.gerencia.appGestao.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProdutoController {
    private final ProdutoRepository produtoRepository;
    private final MovimentacaoRepository movimentacaoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoController(ProdutoRepository produtoRepository, MovimentacaoRepository movimentacaoRepository, CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.movimentacaoRepository = movimentacaoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @PostMapping("/novoProduto")
    public ProdutoDTO novoProduto(@RequestBody ProdutoDTO dto) {
        ProdutoModel produto = new ProdutoModel();
        produto.setNome(dto.getNome());
        produto.setQuantidade(dto.getQuantidade());
        produto.setAtivo(true);

        if (dto.getCategoriaId() == null || dto.getCategoriaId() <= 0) {
            throw new IllegalArgumentException("Categoria é obrigatória");
        }

        CategoriaModel categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        produto.setCategoria(categoria);

        ProdutoModel produtoSalvo = produtoRepository.save(produto);

        MovimentacaoModel movimentacao = new MovimentacaoModel();
        movimentacao.setProdutoId(produtoSalvo);
        movimentacao.setQuantidade(dto.getQuantidade());
        movimentacao.setDescricao("Produto criado");
        movimentacao.setData(java.time.LocalDateTime.now());
        movimentacaoRepository.save(movimentacao);

        return toDTO(produtoSalvo);
    }

    @GetMapping("/produtos")
    public List<ProdutoDTO> listarProdutos() {
        return produtoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/produtos/{id}")
    public ProdutoDTO buscarProdutoPorId(@PathVariable Long id) {
        ProdutoModel produto = produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));
        return toDTO(produto);
    }

    @PutMapping("/produtos/{id}")
    public ProdutoDTO atualizarProduto(@PathVariable Long id, @RequestBody ProdutoDTO dto) {
        ProdutoModel produto = produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        produto.setNome(dto.getNome());
        produto.setQuantidade(dto.getQuantidade());
        produto.setAtivo(true);

        CategoriaModel categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        produto.setCategoria(categoria);

        ProdutoModel atualizado = produtoRepository.save(produto);
        return toDTO(atualizado);
    }

    @GetMapping("/produtos/categoria/{categoriaId}")
    public List<ProdutoDTO> listarProdutosPorCategoria(@PathVariable Long categoriaId) {
        return produtoRepository.findByCategoriaId(categoriaId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/produtos/{id}")
    public void deletarProduto(@PathVariable Long id) {
        produtoRepository.deleteById(id);
    }

    @PutMapping("/produtos/inativar/{id}")
    public void inativarProduto(@PathVariable Long id) {
        ProdutoModel produto = produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));
        produto.setAtivo(false);
        produtoRepository.save(produto);
    }

    private ProdutoDTO toDTO(ProdutoModel model) {
        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(model.getId());
        dto.setNome(model.getNome());
        dto.setQuantidade(model.getQuantidade());
        dto.setAtivo(model.isAtivo());
        dto.setCategoriaId(model.getCategoria().getId());
        return dto;
    }
}