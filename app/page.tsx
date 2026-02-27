"use client";

import { useState } from "react";
import PromptForm from "@/components/PromptForm";
import ResponseCard from "@/components/ResponseCard";
import { sendPrompt } from "@/lib/api";
import type { GenerateResponse } from "@/types";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);

  const handleSubmit = async (prompt: string) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const data = await sendPrompt(prompt);
      setResult(data);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: "700px", margin: "50px auto" }}>
      <h1>PromptBridge AI</h1>

      <PromptForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}

      {result && <ResponseCard result={result.result} />}
    </main>
  );
}