class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    end

    def show
      user = User.find_by(id: params[:id])
    
      if user
        render json: user, status: :ok
      else
        render json: {error: "User not found"}, status: :not_found
      end
    end

    def update
        user = User.find_by(id: params[:id])
        return render json: {errors: "Not Authorized"}, status: :unauthorized unless user && user.id == @current_user&.id
          
        if user.update(user_params)
          render json: user, status: :accepted
        else
          render json: {errors: "User not found"}, status: :not_found
        end
    end
  
    def me
      render json: @current_user
    end
  
    private
  
    def user_params
      params.permit(:username, :password, :password_confirmation, :bio, :image)
    end
end
