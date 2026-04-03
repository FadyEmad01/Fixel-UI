import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { PostHogProvider } from "./providers";
import "@/style/globals.css";
import { baseUrl } from "@/constants/site";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/site/providers/theme-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s - Fixel UI',
    default: 'Fixel UI - Animated React Components',
  },
  description:
    'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a list of components you can install, modify, and use in your projects.',
  keywords: [
    'Fixel UI',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Motion/react',
    'Framer Motion',
    'Open-source components',
    'Animated UI components',
    'UI library',
  ],
  icons: [
    {
      rel: 'icon',
      type: 'image/svg',
      sizes: '32x32',
      url: '/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/favicon-96x96.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
  authors: [
    {
      name: 'Fady Emad',
      url: 'https://github.com/FadyEmad01',
    },
  ],
  publisher: 'Fixel UI',
  openGraph: {
    title: 'Fixel UI',
    description:
      'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a list of components you can install, modify, and use in your projects.',
    url: baseUrl,
    siteName: 'Fixel UI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fixel UI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fixel UI',
    description:
      'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a list of components you can install, modify, and use in your projects.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fixel UI',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn("font-sans antialiased min-h-dvh flex flex-col", inter.variable, geistSans.variable, geistMono.variable)}>
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
