import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';

const enhancedModel = wrapLanguageModel({
  model: groq('deepseek-r1-distill-llama-70b'),
  middleware: extractReasoningMiddleware({ tagName: 'think' }),
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq('gemma2-9b-it'),
    messages,
    // enhancedModel(),
  });

  return result.toDataStreamResponse();
}