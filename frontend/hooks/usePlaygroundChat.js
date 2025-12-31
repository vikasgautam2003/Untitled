"use client";

import { useState } from "react";

export function usePlaygroundChat() {
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState(""); // 🔑 new

  const addUser = (text) => {
    setMessages(prev => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text }
    ]);

    // Append to context
    setContext(prev =>
      prev
        ? `${prev}\nThen, ${text}`
        : text
    );
  };

  const addButler = (text) => {
    setMessages(prev => [
      ...prev,
      { id: crypto.randomUUID(), role: "butler", text }
    ]);
  };

  const resetChat = () => {
    setMessages([]);
    setContext("");
  };

  return {
    messages,
    context,
    addUser,
    addButler,
    resetChat
  };
}
