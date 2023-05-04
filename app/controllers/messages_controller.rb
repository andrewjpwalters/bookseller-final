class MessagesController < ApplicationController
    def index
        conversation = Conversation.find(params[:conversation_id])
        messages = conversation.messages
        render json: messages
    end

    def create
        conversation = Conversation.find(params[:conversation_id])
        message = conversation.messages.build(message_params)
        message.user_id = @current_user.id
      
        if message.save
            render json: message, status: :ok
        else
            render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def message_params
        params.permit(:content, :user)
    end

end
