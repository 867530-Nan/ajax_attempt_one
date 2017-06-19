class LocationsController < ApplicationController
    before_action :set_planet
    before_action :set_location, only: [:show, :update, :destroy]

  def index 
    render json: @planet.locations
  end

  def show
    render json: @location
  end

  def create
    @location = @planet.locations.new(character_params)
    if @location.save
      render json: @location
    else
      render_error(@location)
    end
  end

  def update
    if @location.update(location_params)
      render json: @location
    else
      render_error(@location)
    end
  end


  def destroy
    @location.destroy
    render json: {message: 'removed'}, status: :ok
  end

  private

  def set_planet
    @planet = Planet.find(params[:planet_id])
  end

  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:specie, :location)
  end
end
