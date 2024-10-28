@login
Feature: Faz login no site
  Como um usuário
  Eu quero fazer login na minha conta no site
  Para verificar se a funcionalidade de login funciona corretamente

  Scenario: Aperto o botão de entrar
    Given que eu acesso o site "https://cuidando.vc/"
    When eu clico o botão "a.px-4:nth-child(1)"
    When eu preencho o campo "login-form-username" com "Papagaio"
    When eu preencho o campo "login-form-password" com "parafuzeta"
    When eu clico o botão "button.btn:nth-child(5)"
    #Then eu devo ver "Papagaio"

#método preencher when em pesquisar_ano_steps.rb
#método botão when em acessa_pagina_sobre_steps.rb
#método Then em pesquisar_ano_steps.rb