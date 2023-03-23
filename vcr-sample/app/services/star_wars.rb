require 'net/http'

class StarWars
    def self.get_starwars_character
        uri = URI.parse('https://swapi.dev/api/people/2')
        response = Net::HTTP.get_response(uri)
        raise StandardError, "Failed! #{response.code}" unless response.code == '200'
        JSON.parse(response.body)
    end
end
