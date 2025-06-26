package com.gerencia.appGestao.repository;

import com.gerencia.appGestao.model.MovimentacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimentacaoRepository extends JpaRepository<MovimentacaoModel, Long> {
    MovimentacaoModel findMovimentacaoById(Long id);
    List<MovimentacaoModel> findByProdutoId_Id(long produtoIdId);
}
