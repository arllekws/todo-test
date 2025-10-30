# Today - Gerenciador de Tarefas com Métricas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## 📜 Visão Geral

**Today** é uma aplicação de gerenciamento de tarefas (To-Do) moderna e interativa, construída com React e TypeScript. A aplicação permite que os usuários adicionem, visualizem e completem tarefas, com todos os dados persistidos localmente no navegador através do `localStorage`. Além das funcionalidades padrão de um To-Do list, o projeto conta com um painel de métricas para gamificar a experiência e motivar o usuário, além de uma integração divertida com a API do Chuck Norris para doses diárias de humor.

## ✨ Funcionalidades Principais

- **Adicionar Tarefas**: Formulário intuitivo para adicionar novas tarefas com título e descrição.
- **Listar e Completar Tarefas**: Visualização clara de tarefas pendentes, com um botão para marcá-las como concluídas.
- **Persistência de Dados**: As tarefas pendentes e concluídas são salvas no `localStorage`, garantindo que os dados não sejam perdidos ao recarregar a página.
- **Painel de Métricas**: Uma aba dedicada para visualização de dados, incluindo:
  - **Gráfico de Tarefas Diárias**: Acompanhamento do número de tarefas concluídas por dia.
  - **Percentual de Conclusão**: Medidor que exibe a porcentagem total de tarefas concluídas.
  - **Medidor de Sequência (Streak)**: Gamificação que incentiva o usuário a manter uma sequência de dias completando tarefas.
- **Frases Motivacionais**: Integração com a `api.chucknorris.io` para exibir frases de Chuck Norris, atualizadas a cada 5 segundos.
- **Interface Responsiva e Estilizada**: Uso de CSS Modules para garantir estilos encapsulados e uma interface limpa.

## 🚀 Tecnologias Utilizadas

- **[React](https://reactjs.org/)**: Biblioteca para construção da interface de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática ao código.
- **[CSS Modules](https://github.com/css-modules/css-modules)**: Para estilização local e encapsulada dos componentes.
- **[React Hook Form](https://react-hook-form.com/)**: Para gerenciamento de formulários de forma performática e com validação.
- **[Date-fns](https://date-fns.org/)**: Biblioteca para manipulação e formatação de datas.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build moderna e ultrarrápida para desenvolvimento frontend.

## 📂 Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para manter uma clara separação de responsabilidades:

```
/src
|-- /assets
|   |-- deleteicon.svg
|-- /components
|   |-- /AddTodoForm
|   |-- /ChuckNorrisPhrase
|   |-- /FinishedTasks
|   |-- /Header
|   |-- /Metrics
|   |   |-- /CompletionPercent
|   |   |-- /DailyTodosChart
|   |   |-- /StreakMeter
|   |-- /Tabs
|   |-- /TodoCard
|   |-- /TodoList
|-- /pages
|   |-- /Home
|       |-- index.tsx
|       |-- style.module.css
|-- App.tsx
|-- main.tsx
```


# Projeto hospedado em: 
```bash
https://todo-test-mu-six.vercel.app/
```
## ⚙️ Como Executar o Projeto Localmente

Para executar este projeto em seu ambiente de desenvolvimento, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/arllekws/todo-test
   cd todo-test
   ```

2. **Instale as dependências:**
   Utilize `npm` ou `yarn` para instalar as dependências do projeto.
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Abra no navegador:**
   Acesse `http://localhost:5173` (ou a porta indicada no seu terminal) para visualizar a aplicação.

## 🧩 Documentação dos Componentes

O projeto é composto por vários componentes reutilizáveis, cada um com uma responsabilidade específica.

| Componente            | Descrição                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `Header`              | Exibe o título e o subtítulo da aplicação.                                                            |
| `Tabs`                | Sistema de abas para alternar entre a visualização de tarefas e as métricas.                          |
| `AddTodoForm`         | Formulário para adição de novas tarefas, com validação de campos.                                     |
| `TodoList`            | Renderiza a lista de `TodoCard` com as tarefas pendentes.                                             |
| `TodoCard`            | Card individual que exibe os detalhes de uma tarefa (título, descrição, data) e o botão de completar. |
| `FinishedTasks`       | Exibe a contagem de tarefas já concluídas.                                                            |
| `ChuckNorrisPhrase`   | Busca e exibe frases da API do Chuck Norris em intervalos regulares.                                  |
| `DailyTodosChart`     | Gráfico de barras que mostra o progresso diário de tarefas concluídas.                                |
| `CompletionPercent`   | Medidor circular que exibe a porcentagem total de tarefas concluídas.                                 |
| `StreakMeter`         | Medidor que mostra a sequência atual de dias completando tarefas em relação a uma meta.               |

## 🔮 Melhorias Futuras

- [ ] Implementar um backend para persistência de dados em um banco de dados.
- [ ] Adicionar sistema de autenticação de usuários.
- [ ] Permitir a edição de tarefas existentes.
- [ ] Adicionar funcionalidade de arrastar e soltar (drag-and-drop) para reordenar tarefas.
- [ ] Criar testes unitários e de integração para os componentes.

## ✍️ Autor

Desenvolvido por **Arllesson Gomes** com base nas solicitações do usuário.

