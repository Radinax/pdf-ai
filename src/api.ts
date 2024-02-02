import { z } from "zod";

interface Ok<T> {
  ok: true;
  value: T;
}
interface Err<E> {
  ok: false;
  error: E;
}
type Result<T, E> = Ok<T> | Err<E>;

const schema = z.object({
  message: z.object({
    text: z.string(),
    citations: z.array(z.string()),
    confidence_score: z.string(),
  }),
});

type Schema = z.infer<typeof schema>;

async function send(data: object) {
  const response = await fetch(
    "https://prosper-conversations-beta.onrender.com/assistant/ask_question",
    {
      method: "POST",
      headers: [
        ["content-type", "application/json"],
        ["accept", "application/json"],
        ["X-Api-Key", "text-challenge"],
        ["X-Organization", "test"],
      ],
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  return response.json() as unknown;
}

export async function askQuestion(
  question: string
): Promise<Result<Schema["message"], string>> {
  try {
    const response = await send({ question });
    const result = schema.parse(response);
    return { ok: true, value: result.message };
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) {
      message = err.message;
    }
    return { ok: false, error: message };
  }
}
