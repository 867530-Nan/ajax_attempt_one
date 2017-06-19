namespace :pop do
  desc "Populate Planets"
  task planets: :environment do
  	50.times do
  		planet = Planet.create(
  			name: Faker::StarWars.planet,
  			description: Faker::Hipster.sentence
  			)
	  		5.times { 
	  			Location.create(
	  			specie: Faker::StarWars.specie,
	  			location: Faker::Space.star,
	  			planet_id: planet.id
	  			)}
	  	end
  end
end
