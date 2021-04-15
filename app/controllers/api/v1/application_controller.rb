module Api
  module V1
    class ApplicationController < ActionController::API
      include ActionController::MimeResponds

      include Pundit
      rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

      respond_to :json
      before_action :process_token

      def pundit_user
        User.find_by(id: @current_user_id)
      end

      def user_not_authorized
        if !is_admin?
          render json: { msg: "Access Denied" }, status:  :unauthorized
        end
      end

      def authenticate_user!(options = {})
        head :unauthorized unless signed_in?
      end

      def is_admin?
        if !User.find_by(id: @current_user_id).admin?
          render json: { msg: "Access Denied" }, status:  :unauthorized
        end
      end

      def signed_in?
        @current_user_id.present?
      end

      def process_token
        if request.authorization.present?
          token = request.authorization.split(' ')[1].remove('"')
          begin
            jwt_payload = JWT.decode(token, Rails.application.credentials[:secret_key_base]).first
            @current_user_id = jwt_payload['id']
          rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
            head :unauthorized
          end
        end
      end

    end
  end
end