import { Permanent_Marker } from "next/font/google";
import "./globals.css";

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-permanent-marker",
  weight: "400",
});

export const metadata = {
  title: "ATX ARMY",
  description: "ATX ARMY is an indian E-SPORTS community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${permanentMarker.className} font-permanent-marker antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
