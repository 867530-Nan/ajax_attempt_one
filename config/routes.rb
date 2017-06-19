Rails.application.routes.draw do

	root 'planets#index'

	resources :planets do
		resources :locations 
	end

	get 'planet_form', to: 'planets#form'

end
