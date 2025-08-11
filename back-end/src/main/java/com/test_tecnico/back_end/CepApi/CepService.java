package com.test_tecnico.back_end.CepApi;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CepService {
    private final RestTemplate restTemplate = new RestTemplate();

    public CepResultDTO buscarUF(String cep) {
        String url = "https://viacep.com.br/ws/" + cep + "/json/";

        ResponseEntity<CepResultDTO> resp = restTemplate.getForEntity(
                url, CepResultDTO.class
        );
        assert resp.getBody() != null;
        return resp.getBody();
    }
}
