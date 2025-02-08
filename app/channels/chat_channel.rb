# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    message = Message.create!(content: data['message'], user: User.find(data['user']))

    # ActionCable.server.broadcast "chat_channel", message: render_message(message)

    ActionCable.server.broadcast("chat_channel", {
      message: "<p><strong>#{message.user.email_address}:</strong> #{message.content}</p>"
    })
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
  end
end
