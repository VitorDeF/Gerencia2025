package com.gerencia.appGestao.controller;

import com.gerencia.appGestao.model.CategoriaModel;
import com.gerencia.appGestao.model.MovimentacaoModel;
import com.gerencia.appGestao.model.ProdutoModel;
import com.gerencia.appGestao.repository.CategoriaRepository;
import com.gerencia.appGestao.repository.MovimentacaoRepository;
import com.gerencia.appGestao.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    public static class ProdutoComMovimentacaoDTO {
        public String nome;
        public int quantidade;
        public Long categoriaId;
        public String descricaoMovimentacao;

        public ProdutoComMovimentacaoDTO(String nome, int quantidade, Long categoriaId, String descricaoMovimentacao) {
            this.nome = nome;
            this.quantidade = quantidade;
            this.categoriaId = categoriaId;
            this.descricaoMovimentacao = descricaoMovimentacao;
        }
    }

    @PostMapping("/novoProduto")
    public ProdutoComMovimentacaoDTO novoProduto(@RequestBody ProdutoComMovimentacaoDTO dto) {
        ProdutoModel produto = new ProdutoModel();
        produto.setNome(dto.nome);
        produto.setQuantidade(dto.quantidade);

        if (dto.categoriaId == null || dto.categoriaId <= 0) {
            throw new IllegalArgumentException("Categoria é obrigatória");
        }

        CategoriaModel categoria = categoriaRepository.findById(dto.categoriaId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        produto.setCategoria(categoria);

        ProdutoModel produtoSalvo = produtoRepository.save(produto);

        MovimentacaoModel movimentacao = new MovimentacaoModel();
        movimentacao.setProdutoId(produtoSalvo);
        movimentacao.setQuantidade(dto.quantidade);
        movimentacao.setDescricao(dto.descricaoMovimentacao);
        movimentacao.setData(java.time.LocalDateTime.now());
        movimentacaoRepository.save(movimentacao);

        return new ProdutoComMovimentacaoDTO(dto.nome, dto.quantidade, dto.categoriaId, dto.descricaoMovimentacao);
    }

    @GetMapping("/produtos")
    public List<ProdutoModel> listarProdutos() {
        return produtoRepository.findAll();
    }

    @GetMapping("/produtos/{id}")
    public ProdutoModel buscarProdutoPorId(@PathVariable Long id) {
        return produtoRepository.findById(id).orElse(null);
    }

    public static class ProdutoUpdateDTO {
        public String nome;
        public int quantidade;
        public Long categoriaId;
    }

    @PutMapping("/produtos/{id}")
    public ProdutoModel atualizarProduto(@PathVariable Long id, @RequestBody ProdutoUpdateDTO dto) {
        ProdutoModel produto = produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        produto.setNome(dto.nome);
        produto.setQuantidade(dto.quantidade);

        CategoriaModel categoria = categoriaRepository.findById(dto.categoriaId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        produto.setCategoria(categoria);

        return produtoRepository.save(produto);
    }

    @GetMapping("/produtos/categoria/{categoriaId}")
    public List<ProdutoModel> listarProdutosPorCategoria(@PathVariable Long categoriaId) {
        return produtoRepository.findByCategoriaId(categoriaId);
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
}
