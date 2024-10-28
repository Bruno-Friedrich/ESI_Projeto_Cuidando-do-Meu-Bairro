@acessa_pagina_aprenda
Feature: Acessar aba aprender+
    Eu como usuário
    Desejo acessar a página aprender+
    Para saber aprender no site

  Scenario: Verificar que a nova aba foi aberta com a URL correta
    Given que eu acesso o site "https://cuidando.vc/2022/1"
    When eu clico o botão ".nav > li:nth-child(2) > a:nth-child(1)"
    Then devo ver a url "https://cuidando.vc/glossario"

#método when em acessa_pagina_sobre_steps.rb