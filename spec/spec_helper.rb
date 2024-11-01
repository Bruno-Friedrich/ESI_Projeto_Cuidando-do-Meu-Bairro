RSpec.configure do |config|
    config.expect_with :rspec do |c|
      c.syntax = :expect
    end
  
    config.mock_with :rspec do |mocks|
      mocks.verify_partial_doubles = true
    end
  
    config.disable_monkey_patching!
    config.order = :random
    Kernel.srand config.seed
  end
  
# spec/rails_helper.rb
require 'capybara/rspec'
Capybara.default_driver = :selenium_chrome # Ou :selenium_chrome_headless para modo sem cabeça
  