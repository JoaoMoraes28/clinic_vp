# Clinic VP

O Clinic VP é um sistema de gerenciamento de clínicas médicas desenvolvido com o objetivo de centralizar e organizar processos relacionados ao atendimento e à administração de uma clínica.

A aplicação permite o gerenciamento de pacientes, médicos, recepcionistas, administradores, consultas, prontuários, especialidades, medicamentos, prescrições, exames e agendas médicas, proporcionando uma estrutura integrada para o funcionamento da clínica.

O projeto possui uma API REST desenvolvida em Python e FastAPI. A validação e serialização dos dados são realizadas com Pydantic, enquanto a autenticação utiliza JWT e o armazenamento seguro de senhas é realizado com Argon2 através do pwdlib. Utilizando PostgreSQL como banco de dados e SQLAlchemy para o mapeamento e gerenciamento das entidades. No desenvolvimento web será utilizado o framework Angular e Tailwind CSS para estilização. 

Entre os principais recursos do sistema estão:

* Gerenciamento de pacientes e seus dados;
* Cadastro e gerenciamento de médicos e especialidades;
* Gerenciamento de recepcionistas e administradores;
* Gerenciamento da disponibilidade e duração das consultas dos médicos;
* Agendamento e gerenciamento de consultas;
* Gerenciamento de prontuários e histórico médico;
* Cadastro de medicamentos e prescrições;
* Gerenciamento de exames e laboratórios;
* Autenticação e autorização baseada em funções;
* Gerenciamento seguro de senhas e primeiro acesso;
* Banco de dados relacional estruturado para representar as regras e relacionamentos do domínio clínico.

O projeto foi desenvolvido buscando aplicar boas práticas de desenvolvimento de APIs, modelagem de bancos de dados relacionais, desenvolvimento web, separação de responsabilidades, validação de dados e segurança, servindo também como projeto prático para aprofundamento em desenvolvimento backend com Python.


## Database

O banco foi projetado utilizando um modelo relacional, buscando representar as principais entidades e regras de negócio presentes no domínio de uma clínica utlizando PostgreSQL.

---

### Tecnologias

* **PostgreSQL** — Sistema gerenciador de banco de dados relacional.
* **SQL** — Linguagem utilizada para definição e manipulação da estrutura do banco.
* **ENUM** — Utilizado para representar conjuntos de valores fixos, como status, gênero, tipo sanguíneo e prioridade.
* **Foreign Keys (FK)** — Utilizadas para garantir a integridade referencial entre as entidades.
* **Constraints** — Utilizadas para aplicar regras de unicidade e integridade dos dados.
* **Views** — Utilizadas para trazer dados de diversas tabelas, unindo-os em uma única resposta para o back-end.
* **Triggers** — Utilizadas para criação de INSERT quando determinadas ações são feitas no banco de dados.
* **Procedures** — Utilizadas para tratar, manipular e gerar dados de acordo com a necessidade da aplicação.

---

### Estrutura do Banco

A estrutura atual do banco é centrada nas seguintes tabelas:

#### Usuários e profissionais

O sistema possui três tipos de profissionais:

* **Administradores**
* **Médicos**
* **Recepcionistas**

Cada categoria possui seus próprios dados específicos, como informações pessoais, contato, credenciais de acesso e, no caso dos médicos e recepcionistas, informações relacionadas à sua situação profissional.

---

#### Pacientes

A tabela `patient` armazena os dados cadastrais e algumas informações complementares dos pacientes.

Entre os dados armazenados estão:

* Nome
* CPF
* Gênero
* Telefone
* E-mail
* Estado civil
* Data de nascimento
* Tipo sanguíneo
* Peso
* Altura
* Telefone de emergência
* Observações
* Fotografia
* Data de cadastro
* Status de ativo/inativo

Os endereços dos pacientes são armazenados separadamente em:

```text
patient_address
```

Essa separação permite manter os dados cadastrais do paciente independentes das informações de endereço.

---

#### Consultas

A tabela `consultation` armazena os dados registrados para uma consulta marcada.

Entre os dados armazenados estão:

* Recepcionista
* Doutor(a)
* Paciente
* Especialidade
* Data
* Hora

---

### ENUMs

O banco utiliza tipos `ENUM` do PostgreSQL para restringir determinados campos a valores previamente definidos como status de consultas, gêneros, tipo sanguíneo e estado civil.

### Integridade e regras do banco

O banco utiliza diferentes mecanismos do PostgreSQL para garantir a consistência dos dados.

#### Primary Keys

Todas as entidades principais possuem uma chave primária, normalmente utilizando:

```sql
SERIAL PRIMARY KEY
```

#### Foreign Keys

As relações entre as entidades são implementadas através de `FOREIGN KEY`.

Exemplos:

```text
doctor_speciality
doctor_day
consultation
consultation_record
medical_recipe
consultation_record_exame
```

#### Unique Constraints

Restrições `UNIQUE` são utilizadas para impedir duplicidades em dados que precisam ser exclusivos.

Exemplos:

* CPF
* E-mail
* Nome de especialidade
* Nome de laboratório
* Nome de tipo de exame
* Combinações entre entidades associativas

#### Cascade

Algumas relações utilizam:

```sql
ON DELETE CASCADE
```

principalmente em relações onde o registro dependente não deve permanecer após a exclusão da entidade principal.

---

### Modelagem

- [Modelo Concentitual](https://app.brmodeloweb.com/publicview/6a60f459a0360f6e6c16a500)
- [Modelo Lógico](https://app.brmodeloweb.com/logic/6a62a3c5037b600a4dee9801)

---

### Relação com o Backend

O banco de dados faz parte da arquitetura geral do **Clinic VP**, sendo consumido pelo backend da aplicação.

A arquitetura utiliza:

```text
Frontend
   │
   ▼
FastAPI
   │
   ▼
SQLAlchemy
   │
   ▼
PostgreSQL
```

O **SQLAlchemy** é responsável pelo mapeamento das entidades do banco para os modelos utilizados pela aplicação Python, enquanto o PostgreSQL é responsável pela persistência e integridade dos dados.

---

## Backend API

### Sobre o projeto

O **Clinic VP** é uma API REST desenvolvida em **Python** utilizando **FastAPI**, destinada ao gerenciamento de clínicas médicas.

O projeto foi desenvolvido seguindo uma arquitetura em camadas, separando responsabilidades entre rotas, regras de negócio, persistência de dados e modelos de validação, facilitando manutenção, escalabilidade e evolução do sistema.

---

### Tecnologias utilizadas

* Python 3.x
* FastAPI
* SQLAlchemy
* Pydantic
* JWT (JSON Web Token)
* Uvicorn
* Passlib / BCrypt para hash de senhas

---

### Arquitetura

O projeto foi organizado buscando separar responsabilidades entre as diferentes camadas da aplicação.

```text
src/
│
├── app.py                 # Inicialização da aplicação
│
├── routes/                # Endpoints da API
│
├── services/              # Regras de negócio
│
├── repositories/          # Camada de acesso aos dados (DAO/Repository)
│
├── database/
│   ├── connection.py
│   └── models/            # Modelos SQLAlchemy
│
├── schemas/               # Schemas Pydantic
│
├── security/              # JWT e criptografia
│
└── exception/             # Tratamento centralizado de exceções
```

Cada camada possui uma responsabilidade específica:

| Camada          | Responsabilidade                 |
| --------------- | -------------------------------- |
| Routes          | Receber requisições HTTP         |
| Services        | Executar regras de negócio       |
| Repositories    | Comunicação com o banco de dados |
| Database Models | Definição das tabelas            |
| Schemas         | Validação de entrada e saída     |
| Security        | Autenticação e criptografia      |
| Exception       | Padronização dos erros da API    |

---

### Funcionalidades

A API contempla funcionalidades como:

* Autenticação utilizando JWT
* Login de usuários
* Nível de acesso de acordo com o cargo de cada funcionário
* Alteração de senha
* Cadastro de usuários
* Gerenciamento de pacientes
* Gerenciamento de médicos
* Gerenciamento de consultas
* Gerenciamento de medicamentos
* Gerenciamento de laboratórios
* Operações CRUD das entidades do sistema
* Validação automática dos dados utilizando Pydantic
* Tratamento padronizado de exceções

---

#### Autenticação

A autenticação é baseada em **JSON Web Token (JWT)**.

Fluxo resumido:

1. O usuário realiza login.
2. A API valida as credenciais.
3. Um Access Token é gerado incluindo o nível de acesso do usuário.
4. As demais rotas protegidas utilizam esse token no header:

```http
Authorization: Bearer <token>
```

---

#### Organização da API

Cada recurso possui sua própria rota e sua própria camada de negócio, mantendo baixo acoplamento entre os módulos.

Exemplo:

```text
Paciente
    ↓
Routes
    ↓
Services
    ↓
Repositories
    ↓
Banco de Dados
```

Essa separação facilita testes, manutenção e futuras expansões.

---

#### Validação de dados

Toda entrada da API utiliza modelos Pydantic para validação automática.

Isso garante:

* validação de tipos;
* documentação automática;
* serialização de respostas;
* redução de erros de entrada.

---

#### Segurança

A API implementa:

* Hash seguro de senhas;
* Autenticação JWT;
* Validação de tokens;
* Controle de acesso às rotas protegidas.

---

## Documentação automática

Após iniciar a aplicação, a documentação pode ser acessada através do Swagger:

```text
http://localhost:8000/docs
```

ou

```text
http://localhost:8000/redoc
```

---

### Executando o projeto

#### Clonar o repositório

```bash
git clone https://github.com/JoaoMoraes28/clinic_vp.git
```

#### Entrar na pasta

```bash
cd clinic_vp/back_cvp
```

#### Criar ambiente virtual

Linux

```bash
python -m venv venv
source venv/bin/activate
```

Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

#### Instalar dependências

```bash
pip install -r requirements.txt
```

#### Configurar variáveis de ambiente

Configure as credenciais do banco de dados e demais variáveis necessárias.

Exemplo:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/clinic
SECRET_KEY=sua_chave_secreta
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

#### Executar

```bash
uvicorn src.app:app --reload
```

---

### Boas práticas adotadas

* Arquitetura em camadas
* Separação entre modelos de banco e schemas
* Centralização de tratamento de exceções
* Autenticação baseada em JWT
* Organização modular
* Rotas desacopladas da regra de negócio
* Utilização de tipagem com Python
* Documentação automática via OpenAPI

---

## Frontend Web

### 🚧 Em Desenvolvimento

A aplicação web ainda está em desenvolvimento. 

Este README será atualizado conforme novos componentes forem incorporados.

---

## Autor

**João Moraes**

Projeto desenvolvido com o objetivo de aplicar boas práticas de desenvolvimento backend utilizando FastAPI, arquitetura em camadas e autenticação baseada em JWT.
