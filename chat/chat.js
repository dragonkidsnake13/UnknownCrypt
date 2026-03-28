const socket = new WebSocket("ws://" + location.host);

socket.onmessage = (event) => {
  const box = document.getElementById("chat-box");
  const msg = document.createElement("p");
  msg.textContent = event.data;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
};

function sendMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  if (!text) return;

  socket.send(text);

  const box = document.getElementById("chat-box");
  const selfMsg = document.createElement("p");
  selfMsg.textContent = "You: " + text;
  box.appendChild(selfMsg);
  box.scrollTop = box.scrollHeight;

  input.value = "";
}
