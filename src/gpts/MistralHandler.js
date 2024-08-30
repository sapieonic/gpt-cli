import { Mistral } from "@mistralai/mistralai";
import IGptBaseClass from './IGptBaseClass.js';
import { getConfiguredModelByProvider } from '../setup.js';

/**
 * @implements {IGptBaseClass}
 */
export class MistralHandler {
    provider = 'Mistral';
    constructor() {
        this.client = new Mistral({
            apiKey: process.env.MISTRAL_API_KEY,
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
        const chatCompletion = await this.client.chat.complete({
            messages,
            model: getConfiguredModelByProvider(this.provider),
        });

        return chatCompletion.choices[0]?.message?.content || '';
    }

    async askAndStream(messages) {
        let response = '';
        const stream = await this.client.chat.stream({
            model: getConfiguredModelByProvider(this.provider),
            messages,
        });
        for await (const chunk of stream) {
            process.stdout.write(chunk.data.choices[0]?.delta?.content || '');
            response += chunk.data.choices[0]?.delta?.content || '';
        }

        return response;
    }
}
