@acessa_pagina_sobre
Feature: Acessar aba sobre
    Eu como usuário
    Desejo acessar a página sobre
    Para saber mais sobre o site

  Scenario: Verificar que a nova aba foi aberta com a URL correta
    Given que eu acesso o site "https://cuidando.vc/2022/1"
    When eu clico o botão ".nav > li:nth-child(1) > a:nth-child(1)"
    Then devo ver a url "https://cuidando.vc/sobre"
    
#método when em acessa_pagina_sobre_steps.rb