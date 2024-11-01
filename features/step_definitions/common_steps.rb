#clica em um botão
When('eu clico o botão {string}') do |button|
    find(:css, button).click
  end

#abre e verifica nova página
Then('uma nova aba deve abrir com a URL {string} do botao {string}') do |expected_url, botao|

  new_window = window_opened_by { find(botao).click }  # O clique deve abrir a nova aba

  within_window new_window do
    # Verifique a URL da nova aba
    expect(page.current_url).to eq(expected_url)
  end
end

#pesquisa ano
When('eu seleciono {string} na lista') do |year|
    # Clicar no botão que abre a lista de anos
    find('div.year-selector').click
  
    # Usar within para restringir o escopo ao dropdown que contém a lista de anos
    within('.scroll-year-select') do
      # Selecionar o ano desejado na lista
      find('li[data-key="' + year + '"]').click
    end
  end
  
#verifica se algum texto está na página
Then('eu devo ver a url {string}') do |expected_url|
    expect(page.current_url).to eq(expected_url)
  end