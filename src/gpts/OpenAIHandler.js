import OpenAI from 'openai';
import IGptBaseClass from './IGptBaseClass.js';
import { getConfiguredModelByProvider } from '../setup.js';

/**
 * @implements {IGptBaseClass}
 */
export class OpenAIHandler {
    provider = 'OpenAI';
    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    constructMessages(messages, query) {
        if (messages && Array.isArray(messages)) {
            messages.push({ role: 'user', content: query });
            return messages;
        }

        return [{ role: 'user', content: query }];
    }

    addAssistantResponse(messages, assistantResponse) {
        return [...messages, { role: 'assistant', content: assistantResponse }];
    }

    async ask(messages) {
        const chatCompletion = await this.client.chat.completions.create({
            messages,
            model: getConfiguredModelByProvider(this.provider),
        });

        return chatCompletion.choices[0]?.message?.content || '';
    }

    async askAndStream(messages) {
        let response = '';
        const stream = await this.client.chat.completions.create({
            model: getConfiguredModelByProvider(this.provider),
            messages,
            stream: true,
        });
        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || '');
            response += chunk.choices[0]?.delta?.content || '';
        }

        return response;
    }
}
