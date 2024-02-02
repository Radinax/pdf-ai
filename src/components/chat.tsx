import { extractCitationUrl } from "@/util";
import cn from "clsx";
import { Loader2, Send, Sprout, User, Wand2 } from "lucide-react";
import { FormEventHandler, useRef } from "react";

export interface Message {
  id: string;
  isGenerated?: boolean;
  text: string;
  citations: readonly string[];
}

export interface ChatProps {
  isLoading?: boolean;
  messages: readonly Message[];
  onPrompt?(prompt: string): void;
}

export default function Chat(props: ChatProps) {
  const ref = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    if (!ref.current) return;
    const prompt = ref.current.value.trim();
    if (!prompt.length) return;
    props.onPrompt?.(prompt);
    ev.currentTarget.reset();
  };

  return (
    <div className="flex flex-col divide-y">
      <ul className="flex-1 flex flex-col divide-y">
        {props.messages.map((message) => {
          const Icon = message.isGenerated ? Sprout : User;
          message.citations.forEach((t) => console.log(extractCitationUrl(t)));
          return (
            <li
              className={cn(
                "flex p-4 gap-4",
                message.isGenerated && "bg-zinc-50"
              )}
              key={message.id}
            >
              <div
                className={cn(
                  "h-8 w-8 rounded flex items-center justify-center",
                  message.isGenerated
                    ? "bg-black text-white"
                    : "bg-amber-600 text-white"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-zinc-800">{message.text}</p>
                {message.isGenerated && (
                  <div>
                    <span className="px-3 py-2 text-sm border text-zinc-700 rounded">
                      p. 2
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <search className="flex-shrink-0 bg-zinc-50 p-4 flex items-center gap-4">
        <button type="button">
          <Wand2 className="w-5 h-5 text-zinc-600" />
        </button>
        <form
          className={cn("w-full", props.isLoading && "animate-pulse")}
          onSubmit={handleSubmit}
          aria-disabled={props.isLoading}
        >
          <fieldset
            className="flex items-center relative"
            disabled={props.isLoading}
          >
            <input
              className="w-full bg-white rounded px-4 py-2 border pr-12"
              name="prompt"
              placeholder="Enter your question (max 1,000 characters)"
              ref={ref}
              type="text"
            />
            <button
              type="submit"
              className="absolute inset-y-0 flex items-center right-0 px-4 text-zinc-600"
            >
              {props.isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </fieldset>
        </form>
      </search>
    </div>
  );
}
