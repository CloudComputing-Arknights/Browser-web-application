"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const conversationsData = [
  {
    id: 1,
    user: "Mike Chen",
    avatar: "/diverse-user-avatars.png",
    lastMessage: "That sounds great! When can we meet?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        sender: "Mike Chen",
        content: "Hi! I'm interested in your vintage camera. Is it still available?",
        timestamp: "10:30 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Yes, it's still available! Are you looking to trade or buy?",
        timestamp: "10:32 AM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Mike Chen",
        content: "I'd love to trade! I have some vintage books and plants. Would you be interested?",
        timestamp: "10:35 AM",
        isOwn: false,
      },
      {
        id: 4,
        sender: "You",
        content: "That sounds perfect! I love both books and plants. Can you send me some photos?",
        timestamp: "10:37 AM",
        isOwn: true,
      },
      {
        id: 5,
        sender: "Mike Chen",
        content: "That sounds great! When can we meet?",
        timestamp: "10:40 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: 2,
    user: "Emma Wilson",
    avatar: "/diverse-user-avatars.png",
    lastMessage: "I'm interested in your camera!",
    timestamp: "1h ago",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "Emma Wilson",
        content: "I'm interested in your camera!",
        timestamp: "9:15 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Great! Which one are you interested in?",
        timestamp: "9:20 AM",
        isOwn: true,
      },
    ],
  },
  {
    id: 3,
    user: "Alex Rodriguez",
    avatar: "/diverse-user-avatars.png",
    lastMessage: "Thanks for the trade!",
    timestamp: "2d ago",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "Alex Rodriguez",
        content: "Thanks for the trade!",
        timestamp: "Yesterday",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "You're welcome! Enjoy the books!",
        timestamp: "Yesterday",
        isOwn: true,
      },
    ],
  },
]

const simulatedReplies = [
  "That works for me!",
  "Sounds good, let me check my schedule.",
  "I can meet tomorrow afternoon if that works?",
  "Perfect! Looking forward to it.",
  "Great! I'll bring the items we discussed.",
]

export default function MessagesPage() {
  const [messageInput, setMessageInput] = useState("")
  const [selectedConversationId, setSelectedConversationId] = useState(1)
  const [conversations, setConversations] = useState(conversationsData)

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId)!
  const messages = selectedConversation.messages

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }

      // Add user's message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversationId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: messageInput,
              }
            : conv,
        ),
      )

      setMessageInput("")

      // Simulate reply after 1.5 seconds
      setTimeout(() => {
        const randomReply = simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)]
        const replyMessage = {
          id: messages.length + 2,
          sender: selectedConversation.user,
          content: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOwn: false,
        }

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, replyMessage],
                  lastMessage: randomReply,
                }
              : conv,
          ),
        )
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-4 lg:grid-cols-[350px_1fr] h-[calc(100vh-140px)]">
          {/* Conversations List */}
          <Card className="flex flex-col">
            <div className="p-4 border-b">
              <h1 className="text-2xl font-bold mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversationId(conversation.id)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors",
                      conversation.id === selectedConversationId && "bg-muted",
                    )}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.user[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-sm truncate">{conversation.user}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedConversation.user[0]}</AvatarFallback>
                  </Avatar>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{selectedConversation.user}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex gap-3", message.isOwn && "flex-row-reverse")}>
                    {!message.isOwn && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn("flex flex-col gap-1", message.isOwn && "items-end")}>
                      <div
                        className={cn(
                          "max-w-[70%] rounded-2xl px-4 py-2",
                          message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground px-2">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
