class ConversationsController < ApplicationController
    def index
        conversation = @current_user.conversations
        render json: conversation
    end

    def create
        conversation = Conversation.new(
            sender_id: @current_user.id,
            recipient_id: params[:recipient_id],
            sales_post_id: params[:sales_post_id]
        )
        if conversation.save
          message = Message.new(
            content: params[:content],
            conversation_id: conversation.id,
          )
          if message.save
            render json: { conversation: conversation, message: message }, status: :created
          else
            render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { errors: conversation.errors.full_messages }, status: :unprocessable_entity
        end
      end
end
