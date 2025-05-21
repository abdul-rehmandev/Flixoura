import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flixoura - All Your Favorite Movies & Series, In One Aura",
  description: "Flixoura is your ultimate destination to explore detailed information about movies, TV shows, web series, and streaming content. Whether you're a casual viewer or a binge-watching fanatic, Flixoura helps you find, track, and dive deeper into your favorite entertainment. Browse through cast & crew details, ratings, reviews, trailers, genres, release dates, and more all in one sleek and fast platform.Stay updated with the latest releases, trending titles, and must-watch recommendations curated just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
