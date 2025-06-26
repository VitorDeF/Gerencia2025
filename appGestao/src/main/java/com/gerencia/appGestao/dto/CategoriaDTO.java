package com.gerencia.appGestao.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CategoriaDTO {
    private Long id;
    private String nome;
    private List<Long> produtosIds;
}