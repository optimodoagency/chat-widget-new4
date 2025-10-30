// Optibot Chat Widget – Modern & Elegant Version
(function() {
  // --- 🧩 Grund-Styles ---
  const styles = `
    .optibot-chat {
      --color-primary: var(--optibot-primary, #854fff);
      --color-secondary: var(--optibot-secondary, #6b3fd4);
      --color-bg: var(--optibot-bg, #ffffff);
      --color-text: var(--optibot-text, #333333);
      font-family: 'Inter', 'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .optibot-chat .chat-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(133, 79, 255, 0.3);
      transition: all 0.3s ease;
      z-index: 9999;
    }
    .optibot-chat .chat-toggle:hover {
      transform: scale(1.07);
    }

    .optibot-chat .chat-container {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 380px;
      height: 560px;
      background: var(--color-bg);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      border: 1px solid rgba(133,79,255,0.1);
      overflow: hidden;
      display: none;
      flex-direction: column;
      animation: fadeIn 0.4s ease;
      z-index: 10000;
    }

    @keyframes fadeIn {
      from {opacity: 0; transform: translateY(20px);}
      to {opacity: 1; transform: translateY(0);}
    }

    .optibot-chat .chat-header {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: white;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .optibot-chat .chat-header img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .optibot-chat .chat-header .title {
      font-weight: 600;
      font-size: 16px;
    }
    .optibot-chat .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 22px;
      opacity: 0.8;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .optibot-chat .close-btn:hover {
      opacity: 1;
    }

    .optibot-chat .chat-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: var(--color-bg);
    }

    .optibot-chat .message {
      padding: 10px 14px;
      border-radius: 12px;
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.4;
      max-width: 80%;
      word-break: break-word;
    }

    .optibot-chat .message.user {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: #fff;
      align-self: flex-end;
    }

    .optibot-chat .message.bot {
      background: #f5f5ff;
      color: var(--color-text);
      align-self: flex-start;
      border: 1px solid rgba(133,79,255,0.1);
    }

    .optibot-chat .chat-input {
      padding: 12px;
      border-top: 1px solid rgba(133,79,255,0.1);
      display: flex;
      gap: 8px;
      background: var(--color-bg);
    }

    .optibot-chat textarea {
      flex: 1;
      border-radius: 8px;
      border: 1px solid rgba(133,79,255,0.2);
      padding: 10px;
      font-size: 14px;
      resize: none;
      outline: none;
      font-family: inherit;
      color: var(--color-text);
    }

    .optibot-chat textarea::placeholder {
      color: var(--color-text);
      opacity: 0.6;
    }

    .optibot-chat button.send-btn {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      border: none;
      color: white;
      border-radius: 8px;
      padding: 0 20px;
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .optibot-chat button.send-btn:hover {
      transform: scale(1.05);
    }
  `;

  // Styles laden
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Config laden
  const config = window.ChatWidgetConfig || {
    webhook: { url: "", route: "" },
    branding: { logo: "", name: "Optibot 🤖" },
    style: {}
  };

  // Container erstellen
  const container = document.createElement("div");
  container.className = "optibot-chat";

  // Chat-UI
  container.innerHTML = `
    <button class="chat-toggle" title="Chat öffnen">
      💬
    </button>
    <div class="chat-container">
      <div class="chat-header">
        <div style="display:flex;align-items:center;">
          <img src="${config.branding.logo}" alt="Logo" />
          <span class="title">${config.branding.name}</span>
        </div>
        <button class="close-btn">×</button>
      </div>
      <div class="chat-body">
        <div class="message bot">${config.branding.welcomeText || "Hallo 👋, wie kann ich dir helfen?"}</div>
      </div>
      <div class="chat-input">
        <textarea placeholder="Schreibe deine Nachricht..."></textarea>
        <button class="send-btn">Senden</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Elemente
  const toggle = container.querySelector(".chat-toggle");
  const chatBox = container.querySelector(".chat-container");
  const closeBtn = container.querySelector(".close-btn");
  const textarea = container.querySelector("textarea");
  const sendBtn = container.querySelector(".send-btn");
  const chatBody = container.querySelector(".chat-body");

  let sessionId = crypto.randomUUID();

  function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function sendMessage(message) {
    appendMessage(message, "user");
    textarea.value = "";

    const payload = {
      action: "sendMessage",
      sessionId,
      route: config.webhook.route,
      chatInput: message,
      metadata: { userId: "" }
    };

    try {
      const res = await fetch(config.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const reply = Array.isArray(data) ? data[0].output : data.output;
      appendMessage(reply, "bot");
    } catch (err) {
      appendMessage("⚠️ Es gab ein Problem mit der Verbindung.", "bot");
      console.error(err);
    }
  }

  sendBtn.addEventListener("click", () => {
    const message = textarea.value.trim();
    if (message) sendMessage(message);
  });

  textarea.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const message = textarea.value.trim();
      if (message) sendMessage(message);
    }
  });

  toggle.addEventListener("click", () => {
    chatBox.style.display = "flex";
    toggle.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    chatBox.style.display = "none";
    toggle.style.display = "flex";
  });
})();
