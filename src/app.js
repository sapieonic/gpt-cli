#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import inquirer from 'inquirer';
import { getGptHandler, isStreamingEnabled } from './setup.js';

const { prompt } = inquirer;

const askQuery = async () => {
    const questions = [
        {
            type: 'input',
            name: 'query',
            message: '-->',
        },
    ];
    return prompt(questions);
};

const continueFurther = async () => {
    const questions = [
        {
            type: 'confirm',
            name: 'continue',
            message: '\n\nDo you want to continue?',
        },
    ];
    return prompt(questions);
};

const shouldContinue = async () => {
    const { continue: shouldContinue } = await continueFurther();
    return shouldContinue;
}

const main = async (allMessages) => {
    const gptHandler = getGptHandler();
    const { query } = await askQuery();

    if (!allMessages) {
        allMessages = gptHandler.constructMessages([], query);
    } else {
        allMessages = gptHandler.constructMessages(allMessages, query);
    }


    if (isStreamingEnabled()) {
        const streamedResponse = await gptHandler.askAndStream(allMessages);
        gptHandler.addAssistantResponse(allMessages, streamedResponse);
        if (await shouldContinue()) {
            main(allMessages);
        }
        return;
    }

    const response = await gptHandler.ask(allMessages);
    console.log(response);
    gptHandler.addAssistantResponse(allMessages, response);
    if (await shouldContinue()) {
        main(allMessages);
    }
}

main();