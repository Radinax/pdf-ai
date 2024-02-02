import { useState } from "react";
import { toast } from "sonner";
import { askQuestion } from "./api";
import Chat, { Message } from "./components/chat";
import PDF from "./components/pdf";
import { PDF_URL } from "./constants";

function makeMessage(partial: Partial<Message>): Message {
  return {
    id: crypto.randomUUID(),
    isGenerated: false,
    citations: [],
    text: "",
    ...partial,
  };
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrompt = async (prompt: string) => {
    setMessages((prev) => [...prev, makeMessage({ text: prompt })]);
    setIsLoading(true);
    const result = await askQuestion(prompt);
    setIsLoading(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    const { value: message } = result;
    setMessages((prev) => [
      ...prev,
      makeMessage({
        text: message.text,
        citations: message.citations,
        isGenerated: true,
      }),
    ]);
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      <PDF url={PDF_URL} />
      <Chat messages={messages} onPrompt={handlePrompt} isLoading={isLoading} />
    </div>
  );
}
