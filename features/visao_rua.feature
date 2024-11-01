@visao_rua
Feature: Verifica a rua do programa do governo no site Cuidando.vc
  Como um usuário
  Eu quero visualizar a rua do programa do governo no site
  Para verificar se a funcionalidade visualização da rua funciona corretamente

  Scenario: Aperto o botão de visualizar rua
    #Given que eu acesso o site "http://localhost:8080/despesa/2022/2022.25.10.13.392.3001.33903900.90.39.0.2436"
    Given que eu acesso o site "https://cuidando.vc/despesa/2022/2022.25.10.13.392.3001.33903900.90.39.0.2436"
    Then uma nova aba deve abrir com a URL "https://www.instantstreetview.com/@-23.602,-46.744,0h,0p,1z" do botao "a.bg-secondary-light"
