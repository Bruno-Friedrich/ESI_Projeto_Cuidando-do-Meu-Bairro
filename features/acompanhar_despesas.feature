@acompanha_despesa
Feature: Acompanha despesa de um programa do governo no site Cuidando.vc
  Como um usuário
  Eu quero acompanhar a despesa de programa do governo no site
  Para verificar se a funcionalidade de acompanhamento de despesas funciona corretamente

  Scenario: Aperto o botão de acompanhar despesa
    #Given que eu acesso o site "http://localhost:8080/despesa/2022/2022.25.10.13.392.3001.33903900.90.39.0.2436"
    Given que eu acesso o site "https://cuidando.vc/despesa/2022/2022.25.10.13.392.3001.33903900.90.39.0.2436"
    When eu clico o botão "button.btn:nth-child(3)"
    Then eu devo ver "Acesse nossa plataforma"