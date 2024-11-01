@acessa_pagina_blog
Feature: Acessar aba blog
    Eu como usuário
    Desejo acessar a página blog
    Para ver o blog do site

  Scenario: Verificar que a nova aba foi aberta com a URL correta
    #Given que eu acesso o site "http://localhost:8080/"
    Given que eu acesso o site "https://cuidando.vc/2022/1"
    Then uma nova aba deve abrir com a URL "https://colab.each.usp.br/blog/tag/cuidando-do-meu-bairro/" do botao ".nav > li:nth-child(4) > a:nth-child(1)"
#método Then em visao_rua_steps.rb