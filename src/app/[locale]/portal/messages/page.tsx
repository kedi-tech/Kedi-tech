"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/i18n/config";
import { useDictionary } from "@/components/providers/dictionary-provider";

interface Message {
    id: string;
    sender: string;
    avatar: string;
    content: string;
    timestamp: string;
    unread: boolean;
}

interface Conversation {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
    messages: Message[];
    unreadCount: number;
}

const initialConversations: Conversation[] = [
    {
        id: "ibrahim",
        name: "Ibrahim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        online: true,
        unreadCount: 0,
        messages: [
            {
                id: "1",
                sender: "Ibrahim",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
                content: "Hello! How can I help you with your project today?",
                timestamp: "10:30 AM",
                unread: false,
            },
        ],
    },
    {
        id: "sekou",
        name: "Sekou",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
        online: true,
        unreadCount: 0,
        messages: [
            {
                id: "1",
                sender: "Sekou",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
                content: "Hi there! Ready to discuss your project requirements?",
                timestamp: "9:15 AM",
                unread: false,
            },
        ],
    },
    {
        id: "general",
        name: "General Chat",
        avatar: "",
        online: true,
        unreadCount: 0,
        messages: [
            {
                id: "1",
                sender: "Support Team",
                avatar: "https://github.com/shadcn.png",
                content: "Welcome to the general chat! Feel free to ask any questions.",
                timestamp: "8:00 AM",
                unread: false,
            },
        ],
    },
];

export default function PortalMessagesPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const dict = useDictionary();
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [activeConversationId, setActiveConversationId] = useState<string>("ibrahim");
    const [newMessage, setNewMessage] = useState("");

    const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg: Message = {
            id: Date.now().toString(),
            sender: locale === "fr" ? "Vous" : "You",
            avatar: "https://github.com/shadcn.png",
            content: newMessage,
            timestamp: dict?.portal?.messages?.justNow || (locale === "fr" ? "À l'instant" : "Just now"),
            unread: false,
        };

        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === activeConversationId
                    ? { ...conv, messages: [...conv.messages, msg] }
                    : conv
            )
        );
        setNewMessage("");
    };
    const t = dict.portal.messages;

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Conversations Sidebar */}
                <Card className="w-80 flex-shrink-0 flex flex-col overflow-hidden">
                    <CardHeader className="border-b">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            {locale === "fr" ? "Conversations" : "Conversations"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-0">
                        <div className="space-y-1">
                            {conversations.map((conversation) => {
                                const isActive = conversation.id === activeConversationId;
                                return (
                                    <button
                                        key={conversation.id}
                                        onClick={() => setActiveConversationId(conversation.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-4 hover:bg-muted transition-colors text-left",
                                            isActive && "bg-primary/10 border-l-4 border-primary"
                                        )}
                                    >
                                        <div className="relative">
                                            {conversation.avatar ? (
                                                <Avatar>
                                                    <AvatarImage src={conversation.avatar} />
                                                    <AvatarFallback>
                                                        {conversation.name[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Users className="h-5 w-5 text-primary" />
                                                </div>
                                            )}
                                            {conversation.online && (
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className={cn(
                                                    "font-medium truncate",
                                                    isActive && "text-primary"
                                                )}>
                                                    {conversation.name}
                                                </p>
                                                {conversation.unreadCount > 0 && (
                                                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                                                        {conversation.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                            {conversation.messages.length > 0 && (
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {conversation.messages[conversation.messages.length - 1].content}
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Active Chat */}
                <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardHeader className="border-b py-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                {activeConversation.avatar ? (
                                    <Avatar>
                                        <AvatarImage src={activeConversation.avatar} />
                                        <AvatarFallback>
                                            {activeConversation.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                )}
                                {activeConversation.online && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                                )}
                            </div>
                            <div>
                                <CardTitle className="text-base">{activeConversation.name}</CardTitle>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-xs text-muted-foreground">{t.online}</span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {activeConversation.messages.map((msg) => {
                            const isYou = msg.sender === "You" || msg.sender === "Vous";
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${isYou ? "flex-row-reverse" : ""}`}
                                >
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={msg.avatar} />
                                        <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                                    </Avatar>
                                    <div
                                        className={`max-w-[80%] rounded-lg p-3 text-sm ${isYou
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                            }`}
                                    >
                                        <p>{msg.content}</p>
                                        <span className={`text-xs mt-1 block opacity-70 ${isYou ? "text-primary-foreground" : "text-muted-foreground"}`}>
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                            <Input
                                placeholder={t.typePlaceholder}
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
