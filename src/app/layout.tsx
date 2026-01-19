import type React from 'react';
import './globals.css';
import StoryblokProvider from '@/components/storyblok-provider';
import {Onest} from 'next/font/google';

const onest = Onest({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoryblokProvider>
            <html lang="en" suppressHydrationWarning>
                <head></head>

                <body className={`${onest.className} font-sans`}>
                    {children}
                </body>
            </html>
        </StoryblokProvider>
    );
}
