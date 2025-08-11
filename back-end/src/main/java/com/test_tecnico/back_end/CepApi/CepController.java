package com.test_tecnico.back_end.CepApi;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cep")
public class CepController {

    private final CepService cepService;

    public CepController(CepService cepService) {
        this.cepService = cepService;
    }

    @GetMapping("/{cep}")
    public ResponseEntity<CepResultDTO> buscarCep(@PathVariable String cep) {
        CepResultDTO result = cepService.buscarUF(cep);
        return ResponseEntity.ok(result);
    }
}