@busca_ano
Feature: Busca no site Cuidando.vc
  Como um usuário
  Eu quero buscar por uma cidade no site
  Para verificar se a funcionalidade de buscas por ano e cidade funcionam corretamente

  Scenario: Digitar texto, selecionar um ano e clicar em buscar
    Given que eu acesso o site "https://cuidando.vc/"
    When eu preencho o campo "search-address-input" com "São Paulo"
    And eu seleciono "2023" na lista
    And eu clico o botão "button.btn:nth-child(1)"
    Then eu devo ver a url "https://cuidando.vc/2023"
