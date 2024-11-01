require 'capybara'
require 'capybara/cucumber'
require 'selenium-webdriver'

# Configura o driver padrão como Chrome
Capybara.default_driver = :selenium_chrome

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

# Configuração para o modo headless opcional
Capybara.register_driver :selenium_chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  options.add_argument('--disable-gpu')
  options.add_argument('--window-size=1400,900')
  
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.default_max_wait_time = 5  # Tempo máximo de espera para encontrar elementos
