Given('que eu acesso o site {string}') do |url|
  visit url
end

Then('eu devo ver {string}') do |text|
  expect(page).to have_content(text)
end