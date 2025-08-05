# Monolito (Front-end + Back-end)

Este projeto é um monolito que integra uma aplicação **front-end Angular** com um **back-end Spring Boot**, ambos organizados em seus respectivos diretórios (`front-end/` e `back-end/`). O sistema simula uma estrutura completa com persistência de dados, consumo de API e interface amigável com Angular Material.

---

## 📁 Estrutura do Projeto

```
desafio/
├── back-end/      # API REST com Spring Boot, PostgreSQL e JPA
└── front-end/     # SPA com Angular 19 e Angular Material
```

---

## 🚀 Tecnologias Utilizadas

### 🔧 Back-end: `Spring Boot`
- **Java 21**
- **Spring Boot 3.5.4**
- **Spring Data JPA** – ORM para acesso ao banco de dados
- **Hibernate Validator** – Validação de dados com anotações
- **Banco de dados: PostgreSQL**
- **Banco em memória (para testes): H2**
- **Spring Boot DevTools** – Hot reload para desenvolvimento
- **Maven** – Gerenciador de dependências

#### 📦 Dependências principais:
```xml
spring-boot-starter-web
spring-boot-starter-data-jpa
spring-boot-starter-validation
spring-boot-devtools
postgresql
h2 (testes)
```

---

### 💻 Front-end: `Angular 19`
- **Angular CLI 19**
- **Angular Material** – Componentes visuais modernos
- **RxJS** – Programação reativa
- **ngx-mask** – Máscaras para campos de formulário (CPF, CNPJ, CEP, etc.)
- **Proxy Config** – Redirecionamento de chamadas da API durante o `ng serve`

#### 📦 Algumas bibliotecas:
```json
"@angular/material": "^19.2.19",
"ngx-mask": "^20.0.3"
```

---

## ▶️ Como executar

### 1. Back-end (Spring Boot)

```bash
cd back-end
./mvnw spring-boot:run
```

> Certifique-se de configurar corretamente o `application.properties` com as credenciais do banco PostgreSQL.

### 2. Front-end (Angular)

```bash
cd front-end
npm install
npm run start
```

> Obs. importante rodar com `npm run start` para `proxy-config.js` redirecionar chamadas para o back-end.

---

## 🛠️ Observações

- O projeto ainda está em desenvolvimento.
- O front-end consome APIs REST do back-end diretamente.
- Possui validações no front e back-end para dados sensíveis como CPF, CNPJ, idade, etc.

---

## 📌 Requisitos para rodar localmente

- Node.js 18+
- Angular CLI 19+
- Java 21
- Maven 3.9+
- PostgreSQL

---
