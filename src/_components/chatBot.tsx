'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
    id: string
    content: string
    sender: 'user' | 'ai'
}

export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (input.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                content: input.trim(),
                sender: 'user',
            }
            setMessages([...messages, newMessage])
            setInput('')
            // Here you would typically send the message to your AI backend
            // and then add the AI's response to the messages
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
            <CardHeader>
                <CardTitle>AI Assistant Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex items-start space-x-2 mb-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''
                                }`}
                        >
                            <Avatar>
                                <AvatarImage src={message.sender === 'ai' ? "/ai-avatar.png" : "/user-avatar.png"} />
                                <AvatarFallback>{message.sender === 'ai' ? 'AI' : 'You'}</AvatarFallback>
                            </Avatar>
                            <div
                                className={`rounded-lg p-2 max-w-[70%] ${message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                                    }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                    className="flex w-full items-center space-x-2"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow"
                    />
                    <Button type="submit" size="lg">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}

