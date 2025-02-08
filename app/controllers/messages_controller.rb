class MessagesController < ApplicationController
  # before_action :authenticate_user!

  def index
    @messages = Message.includes(:user).order(created_at: :asc)
  end
end
