'use client'

import { useCompletion } from 'ai/react';
import { Button } from '@/components/ui/button';

export default function Page() {

    const { completion, complete } = useCompletion({
        api: '/api/basic/stream-text-generation',
    })
    const prompt = '空はなぜ青いの？'
    return (
        <div>
            <Button type='button'
                onClick={async () => await complete(prompt)}>
                Generate({prompt})
            </Button>
            <div>
                {completion}
            </div>
        </div>
    )
}