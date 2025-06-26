package com.gerencia.appGestao.repository;

import com.gerencia.appGestao.model.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<ProdutoModel , Long> {
    ProdutoModel findByNome(String nome);
    ProdutoModel findById(long id);
    List<ProdutoModel> findAllByCategoriaNome(String nomeCategoria);
    List<ProdutoModel> findByCategoriaId(Long categoriaId);
    List<ProdutoModel> findByAtivoTrue();
    List<ProdutoModel> findByCategoriaIdAndAtivoTrue(Long categoriaId);
}
