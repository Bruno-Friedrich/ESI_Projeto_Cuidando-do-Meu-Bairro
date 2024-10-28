# CMeubairro
## **Trabalho de Engenharia de Sistemas de Informação**

Trabalhando com o código legado do site cuidando.vc

## Testes
Casos testes feitos utilizando WSL Ubuntu

Necessário ter Ruby, Gem Bundle e Chrome instalados e atualizados<br/> <br/> 
Para instalar os pacotes, cucumber, capybara, selenium, entre outros, acessar a pasta do projeto e escrever no terminal: <br/> <br/> 
  `sudo bundle install`

Para rodar utilizar as tags na primeira linha dos arquivos .feature<br/> <br/> 
  `cucumber --tags @NOME_DA_TAG`<br/> <br/> 
    Exemplo:<br/> 
      `cucumber --tags @acessa_site`<br/> 
      `cucumber --tags @acessa_pagina_analises`<br/> 
      `cucumber --tags @busca_ano`<br/> 
      
Ou somente escrever `cucumber` para rodar todos os testes
