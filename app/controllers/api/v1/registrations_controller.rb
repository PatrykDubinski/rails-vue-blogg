module Api
  module V1
    class RegistrationsController < Devise::RegistrationsController
      skip_before_action :verify_authenticity_token

      def create
        user = User.new(sign_up_params)

        if user.save
          render json: { message: 'Registered succesfully'}
        else
          render json: {error: "Email already taken, or password don't match" }, status: :unprocessable_entity
        end
      end

      private

      protected def sign_up_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end

    end
  end
end
