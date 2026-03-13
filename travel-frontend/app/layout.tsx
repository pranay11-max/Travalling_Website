import "./globals.css";
import Navbar from "@/components/navbar"; // Path check kar


import Footer from "@/components/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer /> {/* २. इथे फुटर ॲड करा */}
      </body>
    </html>
  );
}


