import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quizee Quiz",
  description: "Create quiz and play quiz with our app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]   from-blue-200 via-blue-50 to-blue-100 min-h-screen  z-[-10] sticky top-0`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
