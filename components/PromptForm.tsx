"use client";

import { useState } from "react";

interface Props {
  onSubmit: (prompt: string) => Promise<void>;
  loading: boolean;
}

export default function PromptForm({ onSubmit, loading }: Props) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    await onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        rows={6}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}