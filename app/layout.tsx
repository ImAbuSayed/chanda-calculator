import '#/styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="[color-scheme:dark]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Primary Meta Tags */}
        <title>বিএনপি চাঁদা ক্যালকুলেটর | Satirical Chanda Calculator</title>
        <meta name="title" content="বিএনপি চাঁদা ক্যালকুলেটর | Satirical Chanda Calculator" />
        <meta name="description" content="একটি ব্যাঙ্গাত্মক অ্যাপ্লিকেশন। গণতন্ত্র পুনরুদ্ধারের নামে বিএনপি-র বাধ্যতামূলক মাসিক চাঁদা কত আসে, তা হিসাব করুন। শুধুমাত্র বিনোদনের জন্য।" />
        <meta name="keywords" content="Chanda Calculator, BNP, Chandabaji, Bangladesh politics, funny app, satirical app, চাঁদা ক্যালকুলেটর, বিএনপি, চাদাবাজি, বাংলাদেশ, রম্য" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Abu Sayed" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chanda-calculator.vercel.app/" />
        <meta property="og:title" content="বিএনপি চাঁদা ক্যালকুলেটর | Chandabaji Calculator" />
        <meta property="og:description" content="গণতন্ত্র পুনরুদ্ধারের নামে আপনার বাধ্যতামূলক মাসিক চাঁদা কত? এখনই হিসাব করুন এই রম্য অ্যাপলিকেশনে।" />
        <meta property="og:image" content="https://media.canva.com/v2/image-resize/format:PNG/height:402/quality:100/uri:ifs%3A%2F%2FM%2F70d7c2cd-c9c4-4d31-87b6-073735c41982/watermark:F/width:789?csig=AAAAAAAAAAAAAAAAAAAAAJu2GLy0e1ZzAVc6hMs6-Jxw-imSXeUCtrPD5GOebfFa&exp=1752619674&osig=AAAAAAAAAAAAAAAAAAAAAHb7OlcraJHxIk6VxnS_WJsb4NWsSUWi-obWja6ueiY6&signer=media-rpc&x-canva-quality=screen" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://chanda-calculator.vercel.app/" />
        <meta property="twitter:title" content="বিএনপি চাঁদা ক্যালকুলেটর | Chandabaji Calculator" />
        <meta property="twitter:description" content="গণতন্ত্র পুনরুদ্ধারের নামে আপনার বাধ্যতামূলক মাসিক চাঁদা কত? এখনই হিসাব করুন এই রম্য অ্যাপলিকেশনে।" />
        <meta property="twitter:image" content="https://media.canva.com/v2/image-resize/format:PNG/height:402/quality:100/uri:ifs%3A%2F%2FM%2F70d7c2cd-c9c4-4d31-87b6-073735c41982/watermark:F/width:789?csig=AAAAAAAAAAAAAAAAAAAAAJu2GLy0e1ZzAVc6hMs6-Jxw-imSXeUCtrPD5GOebfFa&exp=1752619674&osig=AAAAAAAAAAAAAAAAAAAAAHb7OlcraJHxIk6VxnS_WJsb4NWsSUWi-obWja6ueiY6&signer=media-rpc&x-canva-quality=screen" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://chanda-calculator.vercel.app/" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Sticky Ad Header */}
        <div className="top-0 z-50 w-full py-2">
          <div className="container mx-auto flex justify-center">
          <script async data-cfasync="false" src="//pl27176276.profitableratecpm.com/215a97eb683142b26abb90a7ebda6692/invoke.js"></script>
          <div id="container-215a97eb683142b26abb90a7ebda6692"></div>
          </div>
        </div>
        
        {children}
      </body>
    </html>
  );
}