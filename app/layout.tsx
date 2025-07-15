import '#/styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';

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
        <title>চাঁদা ক্যালকুলেটর | ইসলামিক দান ক্যালকুলেটর | Chanda Calculator</title>
        <meta name="title" content="চাঁদা ক্যালকুলেটর | ইসলামিক দান ক্যালকুলেটর | Chanda Calculator" />
        <meta name="description" content="আপনার মাসিক আয় অনুযায়ী ইসলামিক দান (চাঁদা) এর পরিমাণ নির্ণয় করুন। Calculate your Islamic donation (chanda) amount based on monthly income." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abusayed.com.bd/projects/chanda-calculator" />
        <meta property="og:title" content="চাঁদা ক্যালকুলেটর | ইসলামিক দান ক্যালকুলেটর | Chanda Calculator" />
        <meta property="og:description" content="আপনার মাসিক আয় অনুযায়ী ইসলামিক দান (চাঁদা) এর পরিমাণ নির্ণয় করুন। Calculate your Islamic donation (chanda) amount based on monthly income." />
        <meta property="og:image" content="https://abusayed.com.bd/images/chanda-calculator-preview.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://abusayed.com.bd/projects/chanda-calculator" />
        <meta property="twitter:title" content="চাঁদা ক্যালকুলেটর | ইসলামিক দান ক্যালকুলেটর | Chanda Calculator" />
        <meta property="twitter:description" content="আপনার মাসিক আয় অনুযায়ী ইসলামিক দান (চাঁদা) এর পরিমাণ নির্ণয় করুন। Calculate your Islamic donation (chanda) amount based on monthly income." />
        <meta property="twitter:image" content="https://abusayed.com.bd/images/chanda-calculator-preview.png" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://abusayed.com.bd/projects/chanda-calculator" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className={`bg-gray-950 font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}