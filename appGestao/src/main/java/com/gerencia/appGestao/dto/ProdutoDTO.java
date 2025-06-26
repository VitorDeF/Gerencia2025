package com.gerencia.appGestao.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class ProdutoDTO {
    private Long id;
    private String nome;
    private int quantidade;
    private boolean ativo;
    private Long categoriaId;
}