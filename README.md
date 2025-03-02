# Bazel Monorepo

<p align="center">
  <a href="https://github.com/richhh7g/bazel-monorepo" target="_blank">
    <img src="https://www.gstatic.com/devrel-devsite/prod/v0f39da1ecc369fa6a1c816bfa5d8f549228499e733c9bd8becc473543aa6caa2/bazel/images/lockup.svg" alt="Bazel Monorepo" height="150" width=325"/>
  </a>
</p>

## Descrição

Este repositório serve como um ponto central para construir, testar, compilar (ou transpilar) e preparar o deploy de projetos multi‑linguagem e multi‑plataforma usando Bazel. Ele integra ferramentas e workflows modernos para proporcionar um ambiente robusto e escalável, incluindo:

- **Golang** com suporte a **Gazelle** para organizar e gerar automaticamente os arquivos `BUILD.bazel`.
- **JavaScript** e **TypeScript**, com gerenciamento de dependências via **pnpm** e **pnpm workspace**.
- Execução de testes com **Jest**, garantindo qualidade e confiabilidade.
- Geração de imagens Docker, facilitando a containerização e o deploy das aplicações.
- Automatização de tarefas com **Taskfile** para otimizar o fluxo de desenvolvimento.

O objetivo deste repositório é simplificar a configuração e manutenção de projetos complexos, centralizando as melhores práticas e integrações em um único ambiente gerenciado pelo Bazel.

## Requisitos

| Ferramenta          | Versão           | Descrição                                                                                                                                         |
| :------------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Bazel**           | `>= 8.0.1`       | Ferramenta de build e automação para projetos multi‑linguagem. ([Bazel](https://bazel.build/))                                                    |
| **Golang**          | `>= 1.23.5`      | Linguagem Go, versão compatível com os requisitos do projeto. ([Golang](https://golang.org/dl/))                                                  |
| **Node.js**         | `>= 22.13.1`     | Ambiente de execução para JavaScript, usado em conjunto com PNPM. ([NodeJs](https://nodejs.org/))                                                 |
| **Taskfile**        | `>= 3`           | Ferramenta de automação de tarefas para simplificar os workflows. ([Taskfile](https://taskfile.dev/))                                             |
| **PNPM**            | `>= 9.15.6`      | Gerenciador de pacotes JavaScript que otimiza a instalação e o gerenciamento de dependências. ([PNPM](https://pnpm.io/))                          |
| **Docker CLI**      | `>= 27.2.1`      | Ferramenta de linha de comando para gerenciamento de containers Docker. ([Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/)) |
| **Docker Compose**  | `>= v2.29.2`     | Ferramenta para definir e gerenciar multi‑containers Docker, facilitando a orquestração de serviços. ([Docker Compose](https://docs.docker.com/compose/)) |
