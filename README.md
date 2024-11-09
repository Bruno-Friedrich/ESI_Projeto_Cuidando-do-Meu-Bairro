# **Cuidando do Meu Bairro**  
## Projeto de Engenharia de Sistemas de Informação

[![Maintainability](https://api.codeclimate.com/v1/badges/6a19814e972f76c2beb0/maintainability)](https://codeclimate.com/github/Bruno-Friedrich/ESI_Projeto_Cuidando-do-Meu-Bairro/maintainability)
[![Node.js CI](https://github.com/Bruno-Friedrich/ESI_Projeto_Cuidando-do-Meu-Bairro/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/Bruno-Friedrich/ESI_Projeto_Cuidando-do-Meu-Bairro/actions/workflows/node.js.yml)
[![Ruby CI](https://github.com/Bruno-Friedrich/ESI_Projeto_Cuidando-do-Meu-Bairro/actions/workflows/ruby.yml/badge.svg?branch=master)](https://github.com/Bruno-Friedrich/ESI_Projeto_Cuidando-do-Meu-Bairro/actions/workflows/ruby.yml)

**Badge de Manutenibilidade:** Esta badge de *Maintainability* (Manutenibilidade) é fornecida pelo [CodeClimate](https://codeclimate.com/) e reflete a qualidade geral do código do projeto em termos de facilidade de manutenção e legibilidade. A pontuação é baseada em uma análise de fatores como complexidade, duplicação de código, e aderência a padrões de boas práticas. Uma pontuação mais alta significa que o código é mais fácil de entender, atualizar e manter ao longo do tempo.

Este projeto envolve trabalho com código legado do site [cuidando.vc](https://cuidando.vc), e a badge é uma métrica importante para monitorar a qualidade e a manutenibilidade desse código enquanto ele é aprimorado.

## Testes
### Testes Cucumber - Teste de Aceitação
Casos testes feitos utilizando WSL Ubuntu

Necessário ter **Ruby 3.2.3**, **Gem Bundle 2.5.22** e **Chrome 130.0** instalados e atualizados<br/> <br/> 
Para instalar os pacotes, **cucumber 9.2.0**, **capybara 3.40**, **selenium 4.10**, entre outros, acessar a pasta do projeto e escrever no terminal: <br/> <br/> 
  `sudo bundle install`

Para rodar utilizar os nomes das tags escrita na primeira linha dos arquivos .feature<br/> <br/> 
  `cucumber --tags @NOME_DA_TAG`<br/> <br/> 
    Exemplo:<br/> 
      `cucumber --tags @acessa_site`<br/> 
      `cucumber --tags @acessa_pagina_analises`<br/> 
      `cucumber --tags @busca_ano`<br/> 
      
Ou somente escrever `cucumber` para rodar todos os testes

## Executando o website
### Instalando as tecnologias necessárias
Para executarmos o projeto, é necessário o node na sua versão 14.21.3. Para isso, torna-se necessário utilizar algum gerenciador de node. Para Linux, pode-se utilizar o nvm e para o Windows você pode utilizar o fnm. A partir desse momento prosseguiremos com a demonstração utilizando o nvm!

Mais informações de download do nvm podem ser encontradas no seu [Github](https://github.com/nvm-sh/nvm).

Após a instalação, você pode verificar a instalação do nvm ao verificar sua versão e isso pode ser feito por meio de:
```
nvm -v
```
Com o nvm instalado podemos prosseguir para o próximo passo!
### Baixando e configurando o node
Como iremos utilizar a versão 14 do node, vamos utilizar o comando abaixo para baixar a versão 14 do node que é compatível com o projeto.
```
nvm install 14
```
A seguir, basta habilitar a versão utilizando o comando:
```
nvm use 14
```
Caso queira verificar as versões, bem como a correta instalação das tecnologias, utilize os seguintes comandos:
```
node -v
npm -v
```
Agora, dentro do repositório do projeto, utilize o comando descrito abaixo para instalar as dependências necessárias para a execução correta:
```
npm install
```

### Executando o projeto
Por fim, para execução do projeto, apenas utilize o comando abaixo para que ele funcione localmente em sua máquina :)
```
npm run serve
```



## 🤝 Colaboradores

As pessoa que contribuíram para o projeto

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Bruno-Friedrich">
        <img src="https://avatars.githubusercontent.com/u/81971651?s=400&u=548b7cc3deb1bd124ba02dbc2acc865b97138ce3&v=4" width="100px;" alt="Foto do Bruno Friedrich no Github"/><br>
        <sub>
          <b>Bruno Friedrich</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/saraiva03">
        <img src="https://avatars.githubusercontent.com/u/129121274?v=4" width="100px;" alt="Foto da Gabriella Saraiva no Github"/><br>
        <sub>
          <b>Gabriella Saraiva</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/malthus42">
        <img src="https://avatars.githubusercontent.com/u/110798606?v=4" width="100px;" alt="Foto do Matheus Lopes no Github"/><br>
        <sub>
          <b>Matheus Lopes</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pabloassuncao">
        <img src="https://avatars.githubusercontent.com/u/72453638?v=4" width="100px;" alt="Foto do Pablo Assunção no Github"/><br>
        <sub>
          <b>Pablo Assunção</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/irpedro">
        <img src="https://avatars.githubusercontent.com/u/99945573?v=4" width="100px;" alt="Foto do Pedro Gabriel no Github"/><br>
        <sub>
          <b>Pedro Gabriel</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/YannisPontuschka">
        <img src="https://avatars.githubusercontent.com/u/56230345?v=4" width="100px;" alt="Foto do Yannis Pontuschka no Github"/><br>
        <sub>
          <b>Yannis Pontuschka</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


