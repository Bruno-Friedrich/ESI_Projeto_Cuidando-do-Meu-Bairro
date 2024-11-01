Then('devo ver a url {string}') do |url|
  expect(page).to have_current_path(url)
end