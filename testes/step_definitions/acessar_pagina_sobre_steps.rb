When('eu clico o botão {string}') do |button|
  find(:css, button).click
end

Then('devo ver a url {string}') do |url|
  expect(page).to have_current_path(url)
end