import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { experimental_createMCPClient, generateText } from "ai";

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

  const response = await generateText({
    model: openrouter.chat("google/gemma-3-27b-it:free"),
    tools,
    prompt: "Open hk.yahoo.com and get the latest news",
  });

  console.log(JSON.stringify(response, null, 2));
};

main();
