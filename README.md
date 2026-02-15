# **CSI606-2025-01 - Trabalho Final - Resultados**

## *Discente:* Emily Frade dos Santos - 23.1.8001

### Resumo

O **Lumen** é um sistema web para gerenciamento pessoal de cursos, desenvolvido como trabalho final da disciplina Web I. A aplicação permite que o usuário cadastre e organize seus cursos em um único lugar, com autenticação própria, listagem com filtros, acompanhamento de progresso, anotações e avaliação. O backend foi implementado em **Spring Boot (Java 21)** com Spring Security e JPA, e o frontend em **React** com Vite, React Router e React Bootstrap, consumindo a API REST e seguindo as ideias do protótipo em Figma.

---

### 1. Funcionalidades implementadas

Todas as funcionalidades previstas na proposta foram implementadas:

| Funcionalidade | Descrição |
|----------------|-----------|
| **Autenticação** | Cadastro de usuários (`/auth/register`) e login com sessão via HTTP Basic (credenciais armazenadas no frontend para chamadas à API). Endpoint `/auth/me` para obter o usuário atual. |
| **CRUD de cursos** | Criação, listagem, visualização/edição e exclusão de cursos, com dados persistidos por usuário (cada usuário vê apenas seus próprios cursos). |
| **Organização por categorias** | Cursos vinculados a categorias fixas (Tecnologia, Negócios, Design, Marketing, Dados, Desenvolvimento Pessoal, Idiomas). Na tela de listagem há filtro por categoria. |
| **Acompanhamento de progresso** | Campo de progresso (0–100%) por curso, atualizado na edição; na tela de edição é possível marcar módulos como concluídos e o progresso é calculado com base nisso. |
| **Anotações** | Campo de anotações (texto) por curso, editável na tela de edição do curso. |
| **Avaliação simples** | Campo de avaliação (rating) por curso, editável na tela de edição. |

---

### 2. Funcionalidades previstas e não implementadas

Nenhuma funcionalidade prevista no escopo da proposta deixou de ser implementada. As restrições definidas na proposta (recomendação de cursos, integração com plataformas externas, notificações/e-mail) foram respeitadas e não foram desenvolvidas, conforme combinado.

---

### 3. Outras funcionalidades implementadas

Além do escopo mínimo, foram incluídas:

- **Módulos por curso**: cadastro de módulos ao criar ou editar um curso; o progresso pode ser calculado com base nos módulos concluídos.
- **Status do curso**: cada curso possui status (Interesse, Em andamento, Concluído), com filtro por status na listagem.
- **Resumo na listagem**: cards com totais de cursos, em andamento, concluídos e nos interesses.
- **Busca**: filtro por texto (título, descrição ou instrutor) na listagem.
- **Campos extras no curso**: instrutor, duração, curso pago/preço e link de acesso, utilizados na criação e edição.
- **Layout responsivo** com Bootstrap e estrutura de layout alinhada ao protótipo.

---

### 4. Principais desafios e dificuldades

- **Integração frontend–backend**: garantir que todas as chamadas à API usassem o token de autenticação (HTTP Basic) e que o axios enviasse o header em todas as requisições; isso foi resolvido com um interceptor em `api.js` que adiciona o `Authorization` a partir do `localStorage`.
- **Isolamento de dados por usuário**: as operações de curso precisam considerar apenas o usuário logado; no backend, o `UserService` obtém o usuário atual via contexto do Spring Security e o `CourseService` filtra cursos por `user_id` e valida propriedade na edição e na busca por ID.
- **Progresso e módulos**: manter a consistência entre número de módulos, módulos concluídos e percentual de progresso na tela de edição exigiu cuidado no cálculo e na atualização do estado no React.
- **Segurança e CORS**: configuração do `SecurityConfig` para liberar rotas de autenticação (`/auth/**`), exigir autenticação nas demais e configurar CORS para o frontend.

---

### 5. Instruções para instalação e execução

#### Pré-requisitos

- **Java 21** (JDK)
- **Maven**
- **MySQL** (por exemplo, 8.x) em execução
- **Node.js** e **npm**

#### Banco de dados

1. Crie um banco de dados no MySQL chamado `lumen`:
   ```sql
   CREATE DATABASE lumen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. No arquivo `src/main/resources/application.yaml`, ajuste se necessário a URL, usuário e senha do MySQL:
    - `url`: `jdbc:mysql://localhost:3306/lumen?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`
    - `username`: `root`
    - `password`: `root`  
      O JPA está configurado com `ddl-auto: update`, então as tabelas serão criadas/atualizadas ao subir a aplicação.

#### Backend (API)

1. Na raiz do projeto (onde está o `pom.xml`):
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
2. A API ficará disponível em `http://localhost:8080`.

#### Frontend

1. Entre na pasta do frontend e instale as dependências:
   ```bash
   cd frontend
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse no navegador a URL indicada pelo Vite (em geral `http://localhost:5173`).

#### Uso básico

1. Acesse a aplicação e cadastre-se em “Cadastre-se”.
2. Faça login com e-mail e senha.
3. Na listagem, use “Adicionar curso” para criar um curso (título, categoria, status, opcionalmente módulos, instrutor, etc.).
4. Clique em um curso para editar e preencher progresso, avaliação e anotações.
5. Use os filtros por status e categoria e a busca para encontrar cursos.

---

### 6. Referências

- Spring Boot. *Spring Boot Reference Documentation*. Disponível em: https://docs.spring.io/spring-boot/docs/current/reference/html/.
- React. *React Documentation*. Disponível em: https://react.dev/.
- Figma. *Protótipo Lumen*. Disponível em: https://www.figma.com/community/file/1573505437578846314/lumen.
