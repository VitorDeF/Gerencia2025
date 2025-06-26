package com.gerencia.appGestao.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovimentacaoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = true)
    private ProdutoModel produtoId;
    private int quantidade;
    @Column(nullable = true)
    private String descricao;
    @Column(nullable = true)
    private java.time.LocalDateTime data;
}
