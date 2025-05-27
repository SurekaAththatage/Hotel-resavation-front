import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to SriLuxe Hotels. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };
  
  const getBotResponse = (userMessage: string): Message => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseText = '';
    
    if (lowerCaseMessage.includes('book') || lowerCaseMessage.includes('reservation')) {
      responseText = 'To make a reservation, you can use our online booking system or call us at +94 11 234 5678. Would you like me to guide you through the online booking process?';
    } else if (lowerCaseMessage.includes('cancel')) {
      responseText = 'Reservations can be cancelled up to 24 hours before check-in without any penalty. Would you like to cancel an existing reservation?';
    } else if (lowerCaseMessage.includes('check-in') || lowerCaseMessage.includes('check in')) {
      responseText = 'Our standard check-in time is 2:00 PM. Early check-in may be available based on room availability.';
    } else if (lowerCaseMessage.includes('check-out') || lowerCaseMessage.includes('check out')) {
      responseText = 'Our standard check-out time is 11:00 AM. Late check-out can be arranged for an additional fee, subject to availability.';
    } else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('address')) {
      responseText = 'We have three locations in Sri Lanka: Colombo (Main Branch), Kandy, and Galle. Which location would you like information about?';
    } else if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('rate')) {
      responseText = 'Our room rates start from LKR 15,000 per night, depending on the room type, location, and season. Would you like to know the rates for a specific date or location?';
    } else if (lowerCaseMessage.includes('wifi') || lowerCaseMessage.includes('internet')) {
      responseText = 'Yes, all our hotels offer complimentary high-speed WiFi throughout the property.';
    } else if (lowerCaseMessage.includes('breakfast') || lowerCaseMessage.includes('food')) {
      responseText = 'Breakfast is included in most of our room packages. We offer a variety of local and international cuisine in our restaurant.';
    } else if (lowerCaseMessage.includes('thank')) {
      responseText = 'You\'re welcome! Is there anything else I can help you with?';
    } else {
      responseText = 'Thank you for your message. How can I assist you with your stay at SriLuxe Hotels? You can ask about reservations, room types, amenities, or our locations.';
    }
    
    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date()
    };
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
          <div className="bg-primary text-white p-4">
            <h3 className="font-semibold">SriLuxe Chat Support</h3>
            <p className="text-sm opacity-90">We typically reply within minutes</p>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white shadow rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;