module Api
  module V1
    class SessionsController < ::Devise::SessionsController
      skip_before_action :verify_authenticity_token

      def create
        user = User.find_by_email(sign_in_params[:email])

        if user && user.valid_password?(sign_in_params[:password])
          token = user.generate_jwt
          render json: { token: token.to_json, user: user }
        else
          render json: { errors: { 'email or password' => ['is invalid']}}, status: :unprocessable_entity
        end
      end

      private

      protected def sign_in_params
        params.require(:user).permit(:email, :password)
      end

    end
  end
end
