package com.gerencia.appGestao.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MovimentacaoDTO {
    private Long id;
    private Long produtoId;
    private int quantidade;
    private String descricao;
    private LocalDateTime data;
}