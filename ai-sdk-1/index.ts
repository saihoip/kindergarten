import { createAzure } from "@ai-sdk/azure";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { experimental_createMCPClient, generateText, tool } from "ai";
import { z } from "zod";

import "dotenv/config";

const main = async () => {
  const client = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "http://localhost:8931/sse",
    },
  });

  const tools = await client.tools();

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const azure = createAzure({
    resourceName: "poc-test-embedding",
    apiKey: process.env.AZURE_GTP4O_API_KEY,
    apiVersion: "2024-12-01-preview",
  });

  // const llm = azure("gpt-4o");

  const llm = openrouter("openai/o4-mini");

  const response = await generateText({
    model: llm,
    prompt: "Navigate to www.nasdaq.com and get the latest NVIDIA stock price.",
    tools,
    maxSteps: 100,
  });

  console.log(JSON.stringify(response.text));
};

main();
