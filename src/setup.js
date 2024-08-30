import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import config from "config";
config.util.setModuleDefaults('l', config.util.loadFileConfigs(join(__dirname, '/../config/')));

import { OpenAIHandler } from "./gpts/OpenAIHandler.js";
import { MistralHandler } from "./gpts/MistralHandler.js";

let configuredProvider, configuration

export const isStreamingEnabled = () => {
    return config.get('l.Default.IsStreamingEnabled');
};

const getDefaultGptProvider = () => {
    return config.get('l.Default.GptProvider.Provider');
};

const getDefaultGptModelByProvider = (provider) => {
    return config.get(`l.GPTs.${provider || 'OpenAI'}.DefaultModel`);
}

export const getConfiguredProvider = () => {
    return configuredProvider || getDefaultGptProvider();
}

export const getConfiguredModelByProvider = (provider) => {
    return configuration ? configuration?.[provider]?.model : getDefaultGptModelByProvider(provider);
}

export const getGptHandler = () => {
    switch (getConfiguredProvider()) {
        case 'OpenAI':
            return new OpenAIHandler();
        case 'Mistral':
            return new MistralHandler();
        default:
            return new OpenAIHandler();
    }
};