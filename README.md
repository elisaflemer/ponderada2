# Ponderada II

Esta é uma aplicação web de lista de tarefas (To-Do List) que foi containerizada e construída usando tecnologias como Docker e Docker Compose. A aplicação permite que os usuários realizem autenticação, registrem itens em um banco de dados e gerenciem suas tarefas pessoais. Abaixo estão os detalhes sobre a aplicação, sua arquitetura e como executá-la.

## Objetivo
O objetivo deste projeto era desenvolver uma aplicação de lista de tarefas (To-Do List) que incluísse autenticação de usuário e armazenamento de itens em um banco de dados. A aplicação foi containerizada usando Docker e Docker Compose para facilitar a implantação e a execução em diferentes ambientes.

## Arquitetura

<img src='arquitetura.png'>

A arquitetura da aplicação envolve três contêineres customizados, que são construídos, executados e conectados usando o Docker Compose:

banco-db: Este contêiner utiliza a base de dados PostgreSQL. Ele configura as variáveis de ambiente necessárias e expõe a porta 5432 para a comunicação com o banco de dados.

backend: Este contêiner é baseado na imagem Node Alpine. Ele serve como o backend da aplicação, desenvolvido em Node.js. Ele expõe a porta 5000 para a comunicação com o frontend e o acesso às APIs da aplicação.

frontend: Este contêiner é baseado na imagem Next.js Alpine. Ele é o frontend da aplicação, desenvolvido em Next.js (baseado em React). O contêiner expõe a porta 3000 para que os usuários possam acessar a interface da aplicação.

A escolha dessa arquitetura foi feita por diversas razões: o PostgreSQL foi escolhido para o banco de dados devido à facilidade de lidar com bancos relacionais containerizados; Node.js foi usado para o backend devido à familiaridade do desenvolvedor e a escolha de implementar autenticação no formato Modelo-Visão-Controlador (MVC) com o framework Express; e Next.js foi escolhido para o frontend devido ao uso do React e à facilidade de criação de rotas e utilização do Tailwind CSS.

## Funcionalidades da aplicação
A aplicação To-Do List oferece as seguintes funcionalidades:

- Criação de usuário
- Login e Logout
- Criação de tarefas
- Marcar tarefas como concluídas ou não concluídas
- Exclusão de tarefas
- Atualização de tarefas

Todas essas operações são realizadas através de rotas protegidas que exigem autenticação. A autenticação é implementada usando JSON Web Tokens (JWT), com um tempo de expiração de 5 minutos.

## Banco de dados
<img src='db.png'>

O banco de dados é composto por duas tabelas relacionadas:

users: Armazena informações dos usuários, incluindo um email, senha e timestamps de criação e atualização. Possui uma chave primária.

tasks: Armazena informações sobre as tarefas, incluindo título, estado de conclusão e referência ao usuário através do campo user_id. Também possui timestamps de criação e atualização.

## Executando a aplicação
Para executar a aplicação, siga os seguintes passos:

- Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
- Navegue até a pasta raiz do projeto no terminal.
- Execute o comando `docker-compose up``.
- Aguarde até que as imagens sejam construídas e os contêineres sejam criados.
- Abra um navegador e acesse http://localhost:3000 para começar a usar a aplicação.