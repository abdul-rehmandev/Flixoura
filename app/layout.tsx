import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  weight: "400",
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
        className={`${inter.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
