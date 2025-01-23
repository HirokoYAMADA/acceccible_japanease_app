'use client';

import React from 'react'
import { Send } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from 'ai/react';

export default function ChatBot() {
    const { messages, input, setInput, handleSubmit } = useChat({
        api: '/api/chat/stream-text-generation'
    });

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>AI チャットアシスタント</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[50vh] pr-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                            <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={message.role === 'user' ? "/placeholder.svg?height=32&width=32" : "/placeholder.svg?height=32&width=32"} alt={message.role === 'user' ? "ユーザー" : "AI"} />
                                    <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                                </Avatar>
                                <div className={`mx-2 p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="メッセージを入力..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow"
                    />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">送信</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}