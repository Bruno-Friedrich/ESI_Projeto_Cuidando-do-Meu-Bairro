When('eu seleciono {string} na lista') do |year|
  # Clicar no botão que abre a lista de anos
  find('div.year-selector').click

  # Usar within para restringir o escopo ao dropdown que contém a lista de anos
  within('.scroll-year-select') do
    # Selecionar o ano desejado na lista
    find('li[data-key="' + year + '"]').click
  end
end

Then('eu devo ver a url {string}') do |expected_url|
  expect(page.current_url).to eq(expected_url)
end