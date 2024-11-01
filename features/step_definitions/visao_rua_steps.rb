Then('uma nova aba deve abrir com a URL {string} do botao {string}') do |expected_url, botao|

  new_window = window_opened_by { find(botao).click }  # O clique deve abrir a nova aba

  within_window new_window do
    # Verifique a URL da nova aba
    expect(page.current_url).to eq(expected_url)
  end
end