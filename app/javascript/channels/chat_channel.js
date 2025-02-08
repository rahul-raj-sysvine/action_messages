import consumer from "channels/consumer";

consumer.subscriptions.create("ChatChannel", {
  connected() {
    console.log("Connected to the chat channel!");
  },

  disconnected() {
    console.log("Disconnected from the chat channel.");
  },

  received(data) {
    const messages = document.getElementById("messages");
    messages.insertAdjacentHTML("beforeend", data.message);
  },

  speak(message, user) {
    return this.perform("speak", { message: message, user: user });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("chat-input");
  const button = document.getElementById("send-button");
  const inputUser = document.getElementById("user-chat-input"); // User input field

  button.addEventListener("click", function () {
    const message = input.value;
    const user = inputUser ? inputUser.value : "Anonymous"; // Fallback if no user input

    if (message) {
      consumer.subscriptions.subscriptions[0].speak(message, user);
      input.value = "";
    }
  });
});
