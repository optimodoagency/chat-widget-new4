// Optibot Chat Widget – Modern & Elegant Version
(function() {
  // --- 🎨 Styles ---
  const styles = `
    .optibot-chat * {
      box-sizing: border-box;
    }

    .optibot-chat {
      --color-primary: #854fff;
      --color-secondary: #6b3fd4;
      --color-bg: #ffffff;
      --color-text: #333333;
      font-family: 'Inter', 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
      box-shadow: 0 8px 24px rgba(133, 79, 255, 0.35);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 9999;
      font-size: 28px;
    }
    
    .optibot-chat .chat-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 32px rgba(133, 79, 255, 0.45);
    }

    .optibot-chat .chat-toggle:active {
      transform: scale(1.05);
    }

    .optibot-chat .chat-container {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 400px;
      height: 600px;
      background: var(--color-bg);
      border-radius: 20px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.18);
      border: 1px solid rgba(133,79,255,0.12);
      overflow: hidden;
      display: none;
      flex-direction: column;
      animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10000;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .optibot-chat .chat-header {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: white;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .optibot-chat .chat-header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .optibot-chat .chat-header img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.3);
      object-fit: cover;
    }

    .optibot-chat .chat-header-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .optibot-chat .chat-header .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 1.2;
    }

    .optibot-chat .chat-header .subtitle {
      font-size: 12px;
      opacity: 0.9;
      font-weight: 400;
    }

    .optibot-chat .close-btn {
      background: rgba(255,255,255,0.15);
      border: none;
      color: white;
      font-size: 24px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      line-height: 1;
    }

    .optibot-chat .close-btn:hover {
      background: rgba(255,255,255,0.25);
      transform: rotate(90deg);
    }

    .optibot-chat .chat-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .optibot-chat .chat-body::-webkit-scrollbar {
      width: 6px;
    }

    .optibot-chat .chat-body::-webkit-scrollbar-track {
      background: transparent;
    }

    .optibot-chat .chat-body::-webkit-scrollbar-thumb {
      background: rgba(133, 79, 255, 0.2);
      border-radius: 10px;
    }

    .optibot-chat .chat-body::-webkit-scrollbar-thumb:hover {
      background: rgba(133, 79, 255, 0.3);
    }

    .optibot-chat .message {
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.5;
      max-width: 85%;
      word-wrap: break-word;
      animation: messageSlide 0.3s ease;
    }

    @keyframes messageSlide {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .optibot-chat .message.user {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: #fff;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
      box-shadow: 0 2px 8px rgba(133, 79, 255, 0.25);
    }

    .optibot-chat .message.bot {
      background: #ffffff;
      color: var(--color-text);
      align-self: flex-start;
      border: 1px solid rgba(133,79,255,0.12);
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }

    .optibot-chat .typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 16px;
      background: #ffffff;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      max-width: 70px;
      align-self: flex-start;
      border: 1px solid rgba(133,79,255,0.12);
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }

    .optibot-chat .typing-indicator span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-primary);
      animation: typing 1.4s infinite;
      opacity: 0.4;
    }

    .optibot-chat .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .optibot-chat .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }

    .optibot-chat .chat-input {
      padding: 16px;
      border-top: 1px solid rgba(133,79,255,0.12);
      display: flex;
      gap: 10px;
      background: var(--color-bg);
      align-items: flex-end;
    }

    .optibot-chat textarea {
      flex: 1;
      border-radius: 12px;
      border: 1px solid rgba(133,79,255,0.2);
      padding: 12px 14px;
      font-size: 14px;
      resize: none;
      outline: none;
      font-family: inherit;
      color: var(--color-text);
      transition: border-color 0.2s;
      max-height: 120px;
      min-height: 44px;
      line-height: 1.5;
    }

    .optibot-chat textarea:focus {
      border-color: var(--color-primary);
    }

    .optibot-chat textarea::placeholder {
      color: var(--color-text);
      opacity: 0.5;
    }

    .optibot-chat button.send-btn {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      border: none;
      color: white;
      border-radius: 12px;
      padding: 12px 24px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 8px rgba(133, 79, 255, 0.25);
      height: 44px;
    }

    .optibot-chat button.send-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(133, 79, 255, 0.35);
    }

    .optibot-chat button.send-btn:active {
      transform: translateY(0);
    }

    .optibot-chat button.send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 480px) {
      .optibot-chat .chat-container {
        width: calc(100vw - 32px);
        height: calc(100vh - 140px);
        right: 16px;
        bottom: 90px;
      }
      
      .optibot-chat .chat-toggle {
        right: 16px;
        bottom: 16px;
      }
    }
  `;

  // Styles einfügen
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Config laden
  const config = window.ChatWidgetConfig || {
    webhook: { url: "", route: "" },
    branding: { 
      logo: "", 
      name: "Optibot 🤖",
      welcomeText: "Hallo 👋, wie kann ich dir helfen?",
      responseTimeText: "Wir antworten in der Regel sofort."
    },
    style: {
      primaryColor: "#854fff",
      secondaryColor: "#6b3fd4",
      backgroundColor: "#ffffff",
      fontColor: "#333333"
    }
  };

  // Styles mit Konfigurations-Farben aktualisieren
  if (config.style) {
    const root = document.documentElement;
    if (config.style.primaryColor) root.style.setProperty('--optibot-primary', config.style.primaryColor);
    if (config.style.secondaryColor) root.style.setProperty('--optibot-secondary', config.style.secondaryColor);
    if (config.style.backgroundColor) root.style.setProperty('--optibot-bg', config.style.backgroundColor);
    if (config.style.fontColor) root.style.setProperty('--optibot-text', config.style.fontColor);
  }

  // Container erstellen
  const container = document.createElement("div");
  container.className = "optibot-chat";

  // Chat-UI aufbauen
  container.innerHTML = `
    <button class="chat-toggle" title="Chat öffnen" aria-label="Chat öffnen">
      💬
    </button>
    <div class="chat-container" role="dialog" aria-label="Chat-Widget">
      <div class="chat-header">
        <div class="chat-header-content">
          <img src="${config.branding.logo}" alt="${config.branding.name}" />
          <div class="chat-header-text">
            <span class="title">${config.branding.name}</span>
            <span class="subtitle">${config.branding.responseTimeText || ''}</span>
          </div>
        </div>
        <button class="close-btn" aria-label="Chat schließen">×</button>
      </div>
      <div class="chat-body">
        <div class="message bot">${config.branding.welcomeText || "Hallo 👋, wie kann ich dir helfen?"}</div>
      </div>
      <div class="chat-input">
        <textarea 
          placeholder="Schreibe deine Nachricht..." 
          rows="1"
          aria-label="Nachricht eingeben"
        ></textarea>
        <button class="send-btn">Senden</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Elemente referenzieren
  const toggle = container.querySelector(".chat-toggle");
  const chatBox = container.querySelector(".chat-container");
  const closeBtn = container.querySelector(".close-btn");
  const textarea = container.querySelector("textarea");
  const sendBtn = container.querySelector(".send-btn");
  const chatBody = container.querySelector(".chat-body");

  // Session ID generieren
  let sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

  // Auto-Resize für Textarea
  textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  // Nachricht hinzufügen
  function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Typing-Indikator anzeigen
  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
    return indicator;
  }

  // Nachricht senden
  async function sendMessage(message) {
    if (!message.trim()) return;
    
    appendMessage(message, "user");
    textarea.value = "";
    textarea.style.height = 'auto';
    sendBtn.disabled = true;

    const typingIndicator = showTypingIndicator();

    const payload = {
      action: "sendMessage",
      sessionId: sessionId,
      route: config.webhook.route,
      chatInput: message,
      metadata: { 
        userId: "",
        timestamp: new Date().toISOString()
      }
    };

    try {
      const res = await fetch(config.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      const reply = Array.isArray(data) ? data[0]?.output : data.output;
      
      typingIndicator.remove();
      appendMessage(reply || "Ich konnte keine Antwort generieren.", "bot");
    } catch (err) {
      typingIndicator.remove();
      appendMessage("⚠️ Es gab ein Problem mit der Verbindung. Bitte versuche es erneut.", "bot");
      console.error("Chat Widget Error:", err);
    } finally {
      sendBtn.disabled = false;
      textarea.focus();
    }
  }

  // Event Listeners
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
    textarea.focus();
  });

  closeBtn.addEventListener("click", () => {
    chatBox.style.display = "none";
    toggle.style.display = "flex";
  });

  // ESC-Taste zum Schließen
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatBox.style.display === "flex") {
      chatBox.style.display = "none";
      toggle.style.display = "flex";
    }
  });

  console.log("✅ Optibot Chat Widget geladen");
})();
