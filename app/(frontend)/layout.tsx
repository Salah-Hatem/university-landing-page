import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";

const futuraTitle = localFont({
  src: "../../public/fonts/Futura_Bold.otf",
  variable: "--font-futura-title",
  display: "swap",
  fallback: ["Futura", "Trebuchet MS", "Arial", "sans-serif"],
});

const futuraBody = localFont({
  src: "../../public/fonts/Futura_Book.ttf",
  variable: "--font-futura-body",
  display: "swap",
  fallback: ["Futura Bk BT", "Futura", "Trebuchet MS", "Arial", "sans-serif"],
});

const futuraCta = localFont({
  src: "../../public/fonts/Futura-Md-BT-Medium.woff2",
  variable: "--font-futura-cta",
  display: "swap",
  fallback: ["Futura Md BT", "Futura", "Trebuchet MS", "Arial", "sans-serif"],
});

const futuraMdCn = localFont({
  src: "../../public/fonts/futura-medium-condensed-bt.ttf",
  variable: "--font-futura-mdcn",
  display: "swap",
  fallback: ["Futura MdCn BT", "Futura", "Trebuchet MS", "Arial", "sans-serif"],
})

const futuraXBlkCnIt = localFont({
  src: [{path: "../../public/fonts/futura-xblk-cn-it.ttf", weight: "900", style: "italic"}],
  variable: "--font-futura-xblk-cn-it",
  display: "swap",
  fallback: ["Futura XBlkCn It", "Futura", "Trebuchet MS", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "The Knowledge Hub Universities",
  description:
      "A CMS-powered university landing page for The Knowledge Hub Universities.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${futuraTitle.variable} ${futuraBody.variable} ${futuraCta.variable} ${futuraMdCn.variable} ${futuraXBlkCnIt.variable} `}
      >
      <body className="">{children}</body>
      </html>
  );
}
