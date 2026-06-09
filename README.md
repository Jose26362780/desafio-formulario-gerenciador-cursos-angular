# 📚 Sistema de Gerenciamento de Cursos - Angular Reactive Forms

Desafio prático do módulo de Reactive Forms com Angular. Uma aplicação completa para registrar, editar, visualizar e gerenciar cursos com módulos e aulas dinâmicos.

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── core/                              # Serviços & Config centralizados
│   │   ├── services/
│   │   │   ├── course.service.ts          # HTTP calls para API
│   │   │   └── validation.service.ts      # Validações customizadas
│   │   ├── guards/
│   │   │   └── course.guard.ts            # Proteção de rotas
│   │   └── interceptors/
│   │       └── error.interceptor.ts       # Tratamento global de erros
│   │
│   ├── shared/                            # Reutilizável em toda aplicação
│   │   ├── models/
│   │   │   ├── course.model.ts            # Interface de Curso
│   │   │   └── module.model.ts            # Interface de Módulo
│   │   ├── components/
│   │   │   ├── header/                    # Header de Minha Aplicação
│   │   │   ├── confirm-delete-course-dialog/            # Modal de confirmação
│   │   │   ├── loading-spinner/           # Spinner de carregamento
│   │   │   └── empty-state/               # Estado vazio
│   │   └── utils/
│   │       └── validators.ts              # Validadores customizados
│   │
│   ├── features/courses/                  # Feature principal - Cursos
│   │   ├── pages/
│   │   │   ├── course-list/               # Listagem de cursos
│   │   │   │   ├── course-list.component.ts
│   │   │   │   ├── course-list.component.html
│   │   │   │   └── course-list.component.css
│   │   │   ├── course-form/               # Criar/editar curso
│   │   │   │   ├── course-form.component.ts
│   │   │   │   ├── course-form.component.html
│   │   │   │   └── course-form.component.css
│   │   │   └── course-details/            # Visualizar curso
│   │   │       ├── course-details.component.ts
│   │   │       ├── course-details.component.html
│   │   │       └── course-details.component.css
│   │   │
│   │   └── components/
│   │       ├── course-card/                     (renderiza 1 card)
|   |       ├── course-card-filter/              (filtro + view toggle)
│   │       ├── empty-search-result/             (estado vazio)
│   │       ├── course-details-title-content/    (cabeçalho dos detalhes)
│   │       └── course-details-module-content/   (lista de módulos)
│   │
│   │
│   ├── environments/
│   │   ├── environment.ts #Configuração de Ambiente
│   │
│   ├── app.ts
│   ├── app.html
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.css
│
├── main.ts
├── index.html
└── styles.css

📋 Arquivos de Configuração
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

## 🎯 Arquitetura - Estrutura Simplificada (Junior)

### Estrutura em 3 Camadas:

**1. Core** - Serviços centralizados

- `course.service.ts`: Comunicação com API
- `validation.service.ts`: Validações de negócio
- `course.guard.ts`: Proteção de rotas
- `error.interceptor.ts`: Tratamento global de erros

**2. Shared** - Componentes e modelos reutilizáveis

- Modelos (Interfaces TypeScript)
- Componentes genéricos (Modal, Spinner, Empty State)
- Utilitários e validadores

**3. Features** - Funcionalidades da aplicação

- Páginas (pages/): Telas principais
- Componentes (components/): Componentes específicos da feature

### Fluxo Simples:

```
Componente
    ↓
  Service (faz chamada HTTP)
    ↓
  API
    ↓
  Service retorna dados
    ↓
Componente renderiza
```

## 🚀 Como Executar

### 1️⃣ Instalar Dependências

```bash
# Instalar dependências do frontend
npm install

# Instalar dependências da API
cd angular-challenge-course-forms-server
npm install
cd ..
```

### 2️⃣ Iniciar a API

```bash
# Em um terminal separado
cd angular-challenge-course-forms-server
npm start
```

A API estará disponível em `http://localhost:3000`

### 3️⃣ Iniciar a Aplicação

```bash
# No terminal principal
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## 📋 Funcionalidades

### ✅ Registro de Curso

- Formulário reativo com validação
- Campos: Nome, Descrição, Categoria
- Validações: nome obrigatório, descrição mín. 10 caracteres
- Mensagens de erro dinâmicas

### ✅ Gerenciamento de Módulos e Aulas

- Adicionar/remover módulos dinamicamente (FormArray)
- Cada módulo contém uma lista de aulas (FormArray aninhado)
- Adicionar/remover aulas dentro dos módulos
- Validação: cada módulo deve ter pelo menos uma aula

### ✅ Listagem de Cursos

- Visualizar todos os cursos cadastrados
- Filtrar cursos por nome
- Cards com informações resumidas

### ✅ Detalhes do Curso

- Visualizar todos os módulos e aulas
- Estrutura hierárquica visual

### ✅ Edição de Curso

- Carregar curso no formulário
- Atualizar dados na API
- Manter validade do formulário

### ✅ Exclusão de Curso

- Modal de confirmação
- Remover da API e da listagem

### ✅ Reset do Formulário

- Limpar todos os campos
- Resetar FormArrays de módulos e aulas

## 🔌 Endpoints da API

| Método   | Rota                    | Descrição                  |
| -------- | ----------------------- | -------------------------- |
| `GET`    | `/courses`              | Listar todos os cursos     |
| `GET`    | `/courses/search?name=` | Buscar cursos por nome     |
| `GET`    | `/courses/:id`          | Obter detalhes de um curso |
| `POST`   | `/courses`              | Criar novo curso           |
| `PUT`    | `/courses/:id`          | Atualizar curso existente  |
| `DELETE` | `/courses/:id`          | Deletar um curso           |

### Exemplo de Body (POST/PUT)

```json
{
  "name": "Formulários Reativos com Angular",
  "description": "Aprenda a criar formulários reativos com Angular.",
  "category": "Frontend",
  "modules": [
    {
      "name": "Fundamentos do Angular",
      "lessons": [{ "name": "Introdução ao Angular" }, { "name": "Componentes e Templates" }]
    },
    {
      "name": "Formulários Reativos",
      "lessons": [{ "name": "FormGroup e FormControl" }, { "name": "Validações Customizadas" }]
    }
  ]
}
```

## 📦 Serviços Principais

### `course.service.ts`

Responsável por toda comunicação com a API e lógica de cursos.

**Métodos principais:**

```typescript
// GET
getAllCourses(): Observable<Course[]>
getCourseById(id: string): Observable<Course>
searchCourses(name: string): Observable<Course[]>

// POST/PUT/DELETE
createCourse(course: Course): Observable<Course>
updateCourse(id: string, course: Course): Observable<Course>
deleteCourse(id: string): Observable<void>
```

### `validation.service.ts`

Centraliza validações customizadas para formulários.

**Validadores:**

- `courseNameValidator()`: Valida nome do curso
- `descriptionMinLength()`: Valida descrição mínima
- `moduleValidator()`: Valida módulos

### `error.interceptor.ts`

Intercepta erros HTTP globalmente e trata erros.

**Funcionalidades:**

- Captura erros de requisição
- Exibe mensagens de erro para o usuário
- Log de erros

## 📄 Páginas

### `course-list` (Listagem)

Página principal listando todos os cursos com funcionalidade de filtro.

**Funcionalidades:**

- Exibir todos os cursos
- Busca em tempo real por nome
- Navegar para detalhes
- Navegar para edição
- Deletar com confirmação

### `course-form` (Criar/Editar)

Criar e editar cursos.

**Funcionalidades:**

- Criar novo curso
- Editar curso existente
- Validação em tempo real
- Adicionar/remover módulos
- Adicionar/remover aulas
- Reset do formulário

### `course-details` (Detalhes)

Visualização detalhada do curso.

**Funcionalidades:**

- Ver estrutura completa do curso
- Ver todos os módulos e aulas
- Botões para editar ou voltar

## 🛠️ Tecnologias

- **Angular 21** - Framework
- **Reactive Forms** - Gerenciamento de formulários
- **TypeScript** - Linguagem
- **RxJS** - Programação reativa
- **JSON Server** - API mockada
- **Angular CLI** - Ferramentas de desenvolvimento

## 📚 Conceitos Principais

- ✅ **FormGroup** - Agrupamento de controles do formulário
- ✅ **FormControl** - Controles individuais
- ✅ **FormArray** - Arrays dinâmicos para módulos e aulas
- ✅ **Validators** - Validações (built-in + customizadas)
- ✅ **RxJS Observables** - Fluxo de dados reativo
- ✅ **Services** - Centralização de lógica
- ✅ **HTTP Interceptors** - Tratamento global de erros
- ✅ **Route Guards** - Proteção de rotas
- ✅ **Component Communication** - @Input/@Output entre componentes
- ✅ **Reactive Patterns** - Padrões com Observables

## 🔄 Fluxo de Dados

```
┌──────────────────────────────────┐
│   Componente (course-list)       │  ← User clica em um botão
└──────────────────┬───────────────┘
                   │
                   ↓
        ┌──────────────────┐
        │ course.service   │  ← Service faz chamada HTTP
        └────────┬─────────┘
                 │
                 ↓
        ┌──────────────────┐
        │   API Backend    │  ← /courses
        └────────┬─────────┘
                 │
                 ↓
        ┌──────────────────┐
        │  Observable<>    │  ← Service retorna dados
        └────────┬─────────┘
                 │
                 ↓
┌──────────────────────────────────┐
│  Componente recebe dados         │  ← Renderiza view
│  via subscribe() ou async pipe   │
└──────────────────────────────────┘
```

## 🧪 Como Testar

```bash
# Executar testes unitários
npm run test
```

## 📝 Notas Importantes

- A API é executada em `http://localhost:3000`
- Use `npm start` para a API (não use `npx json-server`)
- O servidor customizado inclui CORS, validação e geração de UUIDs
- O formulário impede submissão enquanto houver validações inválidas
- Mensagens de erro são exibidas em tempo real nos campos inválidos
- Todos os serviços são Singletons (instânciados uma única vez)
- Use `async` pipe no template para inscrever em Observables automaticamente

## 🎯 Regras de Negócio

1. **Nome do Curso** - Obrigatório
2. **Descrição** - Mínimo de 10 caracteres
3. **Módulos** - Pelo menos um módulo obrigatório
4. **Aulas** - Cada módulo deve ter pelo menos uma aula
5. **Remoção de Módulo** - Remove também todas as suas aulas
6. **Validação do Formulário** - Impede envio se houver erros
7. **Feedback Visual** - Erros destacados em tempo real

## 🚀 Próximos Passos (Evolução)

Depois de dominar essa estrutura, você pode evoluir para:

- **Repository Pattern** - Abstrair chamadas HTTP
- **State Management** - Usar BehaviorSubjects ou NGRX
- **Smart/Presentational** - Separar componentes por responsabilidade
- **Padrão Facade** - Orquestrar múltiplos serviços

---

Desenvolvido como desafio do módulo de Reactive Forms - Rocketseat 🚀
