@acessa_pagina_analises
Feature: Acessar aba analises
    Eu como usuário
    Desejo acessar a página analises
    Para saber mais sobre o site

  Scenario: Verificar que a nova aba foi aberta com a URL correta
    Given que eu acesso o site "https://cuidando.vc/2022/1"
    When eu clico o botão ".nav > li:nth-child(3) > a:nth-child(1)"
    Then devo ver a url "https://cuidando.vc/analises"

#método when em acessa_pagina_sobre_steps.rb