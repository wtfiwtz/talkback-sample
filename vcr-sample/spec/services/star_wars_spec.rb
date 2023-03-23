require 'rails_helper'

RSpec.describe StarWars, vcr: true do
    it 'should get C-3PO character details' do
        c3po = StarWars.get_starwars_character
        ap c3po
        expect(c3po['name']).to eq('C-3PO')
        expect(c3po['height'].to_i).to eq(167)
        expect(c3po['mass'].to_i).to eq(75)
    end
end