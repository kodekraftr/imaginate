import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    try {
        const context = getRequestContext()
        // @ts-expect-error AI from context not available
        const { AI } = context.env
        let { prompt, model } = await request.json<{ prompt: string, model: string }>()

        if (!model) model = "@cf/black-forest-labs/flux-1-schnell"
        if (!prompt) prompt = "a monkey in spacesuit holding a board with message you did well"

        const response = await AI.run(model, { prompt })

        return new Response(`data:image/jpeg;base64,${response.image}`, {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return new Response(error.message, { status: 500 });
        } else {
            console.log("An unknown error occurred");
            return new Response("An unknown error occurred", { status: 500 });
        }
    }
}