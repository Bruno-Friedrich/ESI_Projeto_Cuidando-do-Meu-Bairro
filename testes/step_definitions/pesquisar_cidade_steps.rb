When('eu preencho o campo {string} com {string}') do |field, value|
  fill_in field, with: value
end