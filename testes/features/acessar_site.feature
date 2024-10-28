@acessa_site
Feature: Acessar o site cuidando.vc
  Como um usuário
  Eu quero acessar o site cuidando.vc
  Para verificar se o site está acessível

  Scenario: Verificar se o site abre com sucesso
    Given que eu acesso o site "https://cuidando.vc/"
    Then eu devo ver "Cuidando do Meu Bairro"
