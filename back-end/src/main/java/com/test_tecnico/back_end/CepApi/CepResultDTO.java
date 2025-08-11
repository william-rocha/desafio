package com.test_tecnico.back_end.CepApi;

public record CepResultDTO(
        String cep,
        String logradouro,
        String complemento,
        String bairro,
        String uf,
        String ibge,
        String gia,
        String ddd,
        String siafi
) {
}
