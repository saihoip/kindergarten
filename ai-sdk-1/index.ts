import { createAzure } from "@ai-sdk/azure";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { experimental_createMCPClient, generateText, tool } from "ai";
import { z } from "zod";

import "dotenv/config";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const main = async () => {
  const client = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "http://localhost:8931/sse",
    },
  });

  const tools = await client.tools();

  const azure = createAzure({
    resourceName: "poc-test-embedding",
    apiKey: process.env.AZURE_GTP4O_API_KEY,
    apiVersion: "2024-12-01-preview",
  });

  const llm = azure("gpt-4o");

  const response = await generateText({
    model: llm,
    prompt: "Open hk.yahoo.com and get the top one financial news",
    tools,
  });
  const { steps, text, toolResults } = response;

  console.log(text);
};

main();
