import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: 'あなたは日本語を母語とするが、不自由を感じる人に対し入力された文章をわかりやすくして返すBotです。わかりやすくした文章のみを返却し、余計な文言は含めないようにしてください',
        messages,
        // tools: {
        //     getWeather: {
        //         description: 'Get the weather for a location',
        //         parameters: z.object({
        //             city: z.string().describe('The city to get the weather for'),
        //             unit: z
        //                 .enum(['C', 'F'])
        //                 .describe('The unit to display the temperature in'),
        //         }),
        //         execute: async ({ city, unit }) => {
        //             const weather = {
        //                 value: 24,
        //                 description: 'Sunny',
        //             };

        //             return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;
        //         },
        //     },
        //     easyJapanese: {
        //         description: 'Translate the input Japanese sentence into Yasashinihongo',
        //         parameters: z.object({
        //             city: z.string().describe('The city to get the weather for'),
        //             unit: z
        //                 .enum(['C', 'F'])
        //                 .describe('The unit to display the temperature in'),
        //         }),
        //         execute: async ({ city, unit }) => {
        //             const weather = {
        //                 value: 24,
        //                 description: 'Sunny',
        //             };

        //             return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;
        //         },
        //     },
        // },
    });

    return result.toDataStreamResponse();
}