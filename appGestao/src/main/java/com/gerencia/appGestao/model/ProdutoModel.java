package com.gerencia.appGestao.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NonNull
    private String nome;
    private int quantidade;
    private boolean ativo = true;
    @OneToMany(mappedBy = "produtoId")
    @JsonBackReference
    private List<MovimentacaoModel> movimentacao;
    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonBackReference
    private CategoriaModel categoria;
}
