package com.gerencia.appGestao.repository;

import com.gerencia.appGestao.model.CategoriaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<CategoriaModel, Long> {
    CategoriaModel findByNome(String nome);
    CategoriaModel findById(long id);
}
