@procura_programa
Feature: Pesquisa por programa no site Cuidando.vc
  Como um usuário
  Eu quero buscar por um programa do governo no site
  Para verificar se o acesso aos programas funcionam corretamente

  Scenario: Selecionar dois icones
    Given que eu acesso o site "https://cuidando.vc/"
    When eu seleciono o icone com valor 2 no mapa do ano 2022
    And eu seleciono um icone final
    Then eu devo ver "Programa"
