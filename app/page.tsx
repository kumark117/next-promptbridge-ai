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
<main style={{ maxWidth: "800px", margin: "50px auto" }}>
  <h1 style={{ marginBottom: "10px" }}>
    Next PromptBridge AI
  </h1>

  <h2 style={{ fontWeight: "normal", marginBottom: "20px" }}>
    Secure AI Proxy Architecture using Next.js + Railway FastAPI + OpenAI
  </h2>

  <p style={{ marginBottom: "30px", lineHeight: 1.6 }}>
    This application demonstrates a production-style AI integration
    where the frontend does not directly call OpenAI. Instead,
    requests are routed through a secure FastAPI backend deployed
    on Railway, protecting API keys and enabling validation,
    logging, and future cost tracking.
  </p>

  <PromptForm onSubmit={handleSubmit} loading={loading} />

  {error && (
    <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
  )}

  {result && <ResponseCard result={result.result} />}
</main>
  );
}