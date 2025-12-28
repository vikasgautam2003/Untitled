import "./globals.css";
import { AuthProvider } from "../providers/auth.provider.js";

export const metadata = {
  title: "DevAscend",
  description: "AI-powered tech interview prep"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
