'use client';

import { useUserContext } from '@/context/User';
import { useChat } from '@ai-sdk/react';
import { ChefHatIcon, Send } from 'lucide-react';
import ReactMarkdown from "react-markdown";
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useChat();
  const { currUser } = useUserContext()


  return (
    <div className="flex flex-col overflow-x-auto">
      <div className='flex justify-center items-center space-x-2'>
        <ChefHatIcon size={40} />
        <span className='text-2xl'> RecipeAI </span>
      </div>
      <div className="flex-1 overflow-x-auto p-4 space-y-4 mt-5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-md max-w-[80%] ${m.role === 'user' ? 'bg-blue-800 text-white self-end ml-auto' : 'bg-gray-700 text-white'}`}
          >
            <span className="border rounded-md px-2 border-green-700 bg-slate-800">{m.role === 'user' ? `${currUser?.firstname} ` : 'RecipeAI '} <br /> </span>
            <ReactMarkdown>
              {m.content}
            </ReactMarkdown>
          </div>
        ))}
        {isLoading && <div className="text-gray-500">RecipeAI is thinking...</div>}
      </div>
      {error && (
        <div className="p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md shadow mt-2">
          {error.message}
          <button
            className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-md"
            onClick={() => reload()}
          >
            Retry
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center mt-10  gap-2 p-4 bg-white dark:bg-zinc-900 border-t border-zinc-300 dark:border-zinc-700">
        <input
          className="flex-1  p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900"
          value={input}
          placeholder="e.g. erstelle bitte ein Bratwurst Rezept"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 text-white disabled:cursor-not-allowed rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
          disabled={isLoading || !input.trim()}
        >
          <Send />
        </button>
      </form>
    </div>
  );
}