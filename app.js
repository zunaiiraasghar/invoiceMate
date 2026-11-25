(() => {
  const toggle = document.getElementById("chatToggle");
  const panel = document.getElementById("chatPanel");
  const close = document.getElementById("chatClose");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  if (!toggle || !panel || !form || !input || !messages) return;

  const openChat = () => { panel.hidden = false; input.focus(); };
  const closeChat = () => { panel.hidden = true; };
  toggle.addEventListener("click", () => panel.hidden ? openChat() : closeChat());
  if (close) close.addEventListener("click", closeChat);

  function addBubble(text, who) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + who;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    addBubble(message, "user");
    input.value = "";
    const waiting = addBubble("Thinking…", "bot");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message})
      });
      const data = await response.json();
      waiting.textContent = data.reply || "Sorry, I couldn't answer that.";
      const hint = document.querySelector(".chat-hint");
      if (hint) {
        hint.textContent = data.mode === "ai"
          ? "Powered by InvoiceMate AI"
          : data.mode === "offline"
            ? "Offline helper · add an API key for AI answers"
            : data.mode === "fallback"
              ? "AI temporarily unavailable · fallback answer"
              : "InvoiceMate Assistant";
      }
    } catch (error) {
      waiting.textContent = "I couldn't connect just now. Please check that the InvoiceMate server is running.";
    }
    messages.scrollTop = messages.scrollHeight;
  });
})();
