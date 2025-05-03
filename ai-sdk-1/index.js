"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ai_sdk_provider_1 = require("@openrouter/ai-sdk-provider");
const ai_1 = require("ai");
require("dotenv/config");
const openrouter = (0, ai_sdk_provider_1.createOpenRouter)({
    apiKey: process.env.OPENROUTER_API_KEY,
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, ai_1.experimental_createMCPClient)({
        transport: {
            type: "sse",
            url: "http://localhost:8931/sse",
        },
    });
    const tools = yield client.tools();
    const response = yield (0, ai_1.generateText)({
        model: openrouter.chat("google/gemma-3-27b-it:free"),
        tools,
        prompt: "Open hk.yahoo.com and get the latest news",
    });
    console.log(JSON.stringify(response, null, 2));
});
main();
