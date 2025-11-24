import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastMessage } from '../components/MultiToast';

interface ToastContextType {
    messages: ToastMessage[];
    showToast: (
        text1: string,
        type?: 'success' | 'error' | 'info',
        visibilityTime?: number,
    ) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const showToast = useCallback(
        (
            text1: string,
            type: 'success' | 'error' | 'info' = 'info',
            visibilityTime: number = 3000,
        ) => {
            const id = `toast-${Date.now()}-${Math.random()}`;
            const newMessage: ToastMessage = {
                id,
                text1,
                type,
                visibilityTime,
            };

            setMessages(prev => [...prev, newMessage]);
        },
        [],
    );

    const removeToast = useCallback((id: string) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ messages, showToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
