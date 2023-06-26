import { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.async = true;
    script.onload = () => {
      window.botpressWebChat.init({
        botId: "e28feb64-f99f-4eeb-b4c8-0c661cc62fdd",
        clientId: "e28feb64-f99f-4eeb-b4c8-0c661cc62fdd",
        hostUrl: "https://cdn.botpress.cloud/webchat/v0",
        messagingUrl: "https://messaging.botpress.cloud",
        botName: "RockyTalky",
        enableConversationDeletion: true,
        enablePersistHistory: false,
        useSessionStorage: true,
        botConversationDescription: "Say hi, and get to know Rocky",
        showConversationsButton: false,
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-light" lg={9}>
      <div id="bp-web-widget-container" />
    </div>
  );
};

export default ChatBot;
