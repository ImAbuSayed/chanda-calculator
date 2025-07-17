'use client';

import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface ChandaResult {
  amount: number;
  message: string;
  receiptId: string;
}

export default function ChandaCalculator() {
  const [occupation, setOccupation] = useState<string>('ছাত্র');
  const [income, setIncome] = useState<string>('');
  const [result, setResult] = useState<ChandaResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentYear, setCurrentYear] = useState<number>();
  const [name, setName] = useState<string>('');
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const hiddenResultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/getCalculations');
      const data = await res.json();
      setHistoricalData(data);
    };
    fetchData();
  }, []);

  // occupation options
  const occupations = [
    'ছাত্র', 'চাকরিজীবী', 'ব্যবসায়ী', 'বেকার', 'প্রবাসী', 'ফ্রিল্যান্সার', 
    'রাজনীতিবিদ', 'অভিনেতা/অভিনেত্রী', 'কৃষক', 'গৃহিণী', 'ডাক্তার', 
    'ইঞ্জিনিয়ার', 'আইনজীবী', 'শিক্ষক/প্রফেসর', 'সাংবাদিক', 'রিকশাচালক', 
    'গার্মেন্টস কর্মী', 'ইউটিউবার/ইনফ্লুয়েন্সার', 'সরকারি কর্মকর্তা', 'ব্যাংকার', 
    'আর্কিটেক্ট', 'গ্রাফিক ডিজাইনার', 'দোকানদার', 'ড্রাইভার', 'সিকিউরিটি গার্ড', 
    'ফটোগ্রাফার', 'লেখক/কবি', 'বিজ্ঞানী', 'ফার্মাসিস্ট', 'পাইলট', 'খেলোয়াড়', 
    'গায়ক/গায়িকা', 'নাপিত', 'ইলেকট্রিশিয়ান', 'ডেভেলপার/প্রোগ্রামার', 
    'বাস কন্ডাক্টর', 'ফুটপাত হকার', 'ছাত্রলীগ নেতা'
  ];

  const generateReceiptId = (name: string): string => {
    const prefixes = [
      'CHANDA-KING-', 'DONATION-HERO-', 'BNP-BUSTER-', 'PEOPLES-CHAMP-', 
      'ANTI-CORRUPTION-', 'TARIQUE-HUNTER-', 'HAWA-BHABAN-RAID-', 'DEMOCRACY-WARRIOR-'
    ];
    const suffixes = [
      '-THE-GREAT', '-OF-DEMOCRACY', '-AGAINST-TARIQUE', '-FOR-JUSTICE', 
      '-BD-SAVIOUR', '-THE-UNSTOPPABLE', '-SON-OF-BENGAL', '-IN-LONDON'
    ];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const namePart = name.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    
    return `${randomPrefix}${namePart}${randomNum}${randomSuffix}`;
  };

  const calculateChanda = (occ: string, inc: string, name: string): ChandaResult => {
    let amount = 0;
    let message = '';
    const incomeNum = Number(inc);

    // occupation options switch case
    switch (occ) {
      // Existing cases...
      case 'ছাত্র':
        amount = Math.max(50, incomeNum * 0.05);
        message = 'আপনার পকেট মানি বাঁচিয়ে দলের জন্য এই ক্ষুদ্র অবদান গণতন্ত্র পুনরুদ্ধারের সংগ্রামকে আরও বেগবান করবে। মনে রাখবেন, বিএনপি ক্ষমতায় এলে টিফিনের টাকাও বাঁচাতে পারবেন না!';
        break;
      case 'চাকরিজীবী':
        amount = incomeNum * 0.15 + 500;
        message = 'মাস শেষে বেতনের একটি অংশ দলের তহবিলে জমা দিন। বিএনপি ক্ষমতায় গেলে তো বেতনই বন্ধ হয়ে যাবে, তাই এখনই দেশের জন্য সঞ্চয় করুন!';
        break;
      case 'ব্যবসায়ী':
        amount = incomeNum * 0.25 + 2000;
        message = 'ব্যবসার লাভ থেকে দলের জন্য বিনিয়োগ করুন। বিএনপি ক্ষমতায় এলে আপনার ব্যবসায় হরতাল-অবরোধে লাটে উঠবে! হাওয়া ভবনে সব দিয়ে আসতে হবে।';
        break;
      case 'বেকার':
        amount = 20;
        message = 'আমরা আপনার পরিস্থিতি বুঝি। আপাতত এইটুকুই দিন। কথা দিচ্ছি, আমাদের আমলে আপনার কর্মসংস্থানের ব্যবস্থা করা হবে... প্রথম মিছিলটিতেই! আর বিএনপি ক্ষমতায় এলে তো চাকরির বাজারে হাহাকার আরও বেড়ে যাবে!';
        break;
      case 'প্রবাসী':
        amount = incomeNum * 0.30 + 10000;
        message = 'দূর দেশে থেকেও দেশের কথা ভাবার জন্য আপনাকে ধন্যবাদ। আপনার পাঠানো রেমিট্যান্স দলের সংগ্রামকে নতুন শক্তি যোগাবে। বিএনপি ক্ষমতায় এলে রেমিট্যান্স পাঠানোর পথেও বাধা তৈরি করবে, তাই এখনই সাহায্য করুন!';
        break;
      case 'ফ্রিল্যান্সার':
        amount = incomeNum * 0.20 + 1500;
        message = 'আপনার অর্জিত ডলার দেশের গণতন্ত্রের চেয়ে কম মূল্যবান নয়। আপনার এই ডিজিটাল অবদানকে দল সর্বদা স্মরণ রাখবে। বিএনপি ক্ষমতায় এলে ইন্টারনেট বন্ধ করে দেবে, তখন আর ডলার আয় করা যাবে না!';
        break;
      case 'রাজনীতিবিদ':
        amount = incomeNum * 0.40 + 50000;
        message = 'রাজনীতিবিদ হিসেবে আপনার অবদান অবশ্যই বেশি হওয়া উচিত। মনে রাখবেন, বিএনপি ক্ষমতায় গেলে আপনার রাজনৈতিক ক্যারিয়ারই শেষ!';
        break;
      case 'অভিনেতা/অভিনেত্রী':
        amount = incomeNum * 0.35 + 30000;
        message = 'অভিনয় করে যা আয় করেন, তার কিছু অংশ দলের জন্য দিন। বিএনপি ক্ষমতায় গেলে সিনেমা হল বন্ধ হয়ে যাবে, তখন আর আয় রইবে না!';
        break;
      case 'কৃষক':
        amount = incomeNum * 0.10 + 1000;
        message = 'কৃষক ভাই, আপনার আয় কম তাই আমরা কম চাঁদা নিচ্ছি। তবে মনে রাখবেন, বিএনপি ক্ষমতায় গেলে সারের দাম বেড়ে যাবে, কৃষি ভর্তুকি বন্ধ হয়ে যাবে!';
        break;
      case 'গৃহিণী':
        amount = 500;
        message = 'গৃহিণী হিসেবে আপনার কাছে আমাদের আবেদন, আপনি মাসে অন্তত ৫০০ টাকা চাঁদা দিন। বিএনপি ক্ষমতায় গেলে রান্নার গ্যাসের দাম এমন বাড়বে যে চুলা ধরানোই কঠিন হয়ে যাবে!';
        break;
      case 'ডাক্তার':
        amount = incomeNum * 0.30 + 25000;
        message = 'রোগী দেখে যা আয় করেন, তার একটা অংশ দলের তহবিলে দিন। বিএনপি ক্ষমতায় এলে হাসপাতালগুলোতেও বোমা হামলা হবে, তখন আর রোগী দেখার সুযোগই পাবেন না!';
        break;
      case 'ইঞ্জিনিয়ার':
        amount = incomeNum * 0.25 + 20000;
        message = 'আপনার বানানো ব্রিজের চেয়েও দলের ভবিষ্যৎ মজবুত করা জরুরি। চাঁদা দিন, নয়তো বিএনপি ক্ষমতায় এলে রডের বদলে বাঁশ দিয়ে ব্রিজ বানাতে হবে!';
        break;
      case 'আইনজীবী':
        amount = incomeNum * 0.28 + 15000;
        message = 'আইনের মারপ্যাঁচ তো অনেক বোঝেন, এবার দলের প্রতি দায়িত্বটাও বুঝুন। সময়মতো চাঁদা না দিলে, বিএনপি ক্ষমতায় আসার পর আপনার নিজেরই আইনজীবী লাগবে!';
        break;
      case 'শিক্ষক/প্রফেসর':
        amount = incomeNum * 0.18 + 3000;
        message = 'জাতি গড়ার কারিগর আপনি, তাই দলের তহবিলেও আপনার অবদান জরুরি। চাঁদা দিন, নইলে বিএনপি আমলে সিলেবাসে "তারেক জিয়ার জীবনী" বাধ্যতামূলক করা হবে!';
        break;
      case 'সাংবাদিক':
        amount = incomeNum * 0.15 + 2500;
        message = 'সত্য প্রকাশের জন্য যেমন কলম ধরেন, দলের জন্য তেমন মানিব্যাগটাও খুলুন। বিএনপি ক্ষমতায় এলে তো সাগর-রুনির মতো অবস্থা হবে, তার আগেই দলের পাশে দাঁড়ান।';
        break;
      case 'রিকশাচালক':
        amount = Math.max(30, incomeNum * 0.05);
        message = 'আপনার কায়িক শ্রমের প্রতি আমাদের সম্মান আছে। দিনের শেষে অল্প কিছু চাঁদা দিন। বিএনপি এলে তো রাস্তায় রিকশাই চলতে দেবে না, সব দখল করে নেবে।';
        break;
      case 'গার্মেন্টস কর্মী':
        amount = Math.max(100, incomeNum * 0.08);
        message = 'আপনার ওভারটাইমের টাকার একটি অংশ দলের জন্য দিন। বিএনপি ক্ষমতায় এলে তো গার্মেন্টসই থাকবে না, সব হাওয়া ভবনে চলে যাবে!';
        break;
      case 'ইউটিউবার/ইনফ্লুয়েন্সার':
        amount = incomeNum * 0.22 + 5000;
        message = 'আপনার ফলোয়ারদের থেকে যা আয় হয়, তার থেকে চাঁদা দিন। বিএনপি এলে তো ইন্টারনেটই থাকবে না, তখন শুধু বাঁশেরকেল্লায় ভিডিও বানাতে হবে!';
        break;
      
      // New cases start here
      case 'সরকারি কর্মকর্তা':
        amount = incomeNum * 0.20 + 8000;
        message = 'দেশের সেবা তো করছেনই, এবার দলের সেবা করুন। আপনার টেবিলের নিচের আয় থেকে কিছু অংশ দিন, নইলে বিএনপি আমলে আপনার ফাইলটাও নিচে চাপা পড়ে যাবে!';
        break;
      case 'ব্যাংকার':
        amount = incomeNum * 0.22 + 12000;
        message = 'মানুষের টাকার হিসাব তো অনেক রাখেন, এবার দলের টাকার হিসাবটাও দেখুন। চাঁদা দিন, নয়তো বিএনপি ক্ষমতায় এলে ব্যাংক লুটেরাদের হাতে আপনার শাখাও নিরাপদ থাকবে না।';
        break;

      case 'আর্কিটেক্ট':
        amount = incomeNum * 0.25 + 18000;
        message = 'সুন্দর সুন্দর ডিজাইন করেন, এবার দলের ভবিষ্যৎ ডিজাইন করুন। চাঁদা না দিলে, বিএনপি আমলে আপনার ডিজাইন করা বিল্ডিং-এ তারেক জিয়ার পোস্টার লাগানো হবে!';
        break;

      case 'গ্রাফিক ডিজাইনার':
        amount = incomeNum * 0.18 + 2000;
        message = 'আপনার বানানো ডিজাইন দলের প্রচারণায় কাজে লাগবে। সময়মতো চাঁদা দিন, নইলে বিএনপি ক্ষমতায় এলে আপনাকে দিয়ে শুধু "খালেদা জিয়ার মুক্তি চাই" পোস্টার ডিজাইন করানো হবে।';
        break;

      case 'দোকানদার':
        amount = incomeNum * 0.15 + 1500;
        message = 'আপনার দোকানের দৈনিক লাভের একটি অংশ দলের জন্য দিন। নইলে বিএনপি আমলে আপনার দোকানের সামনেই বোমাবাজি হবে, তখন আর কাস্টমারই পাবেন না!';
        break;

      case 'ড্রাইভার':
        amount = incomeNum * 0.10 + 800;
        message = 'গাড়ির চাকা ঘুরিয়ে যেমন সংসার চালান, তেমনি দলের চাকা সচল রাখতে চাঁদা দিন। বিএনপি ক্ষমতায় এলে তো রাস্তায় আগুন জ্বলবে, তখন আর গাড়িই চালাতে পারবেন না।';
        break;

      case 'সিকিউরিটি গার্ড':
        amount = incomeNum * 0.08 + 500;
        message = 'আপনি যেমন মানুষের নিরাপত্তা দেন, তেমনি দলের নিরাপত্তাও আপনার দায়িত্ব। চাঁদা দিন, নইলে বিএনপি আমলে আপনার ডিউটির জায়গাতেই হামলা হবে!';
        break;

      case 'ফটোগ্রাফার':
        amount = incomeNum * 0.20 + 4000;
        message = 'সুন্দর ছবি তো অনেক তোলেন, এবার দলের একটা সুন্দর ভবিষ্যৎ গড়তে সাহায্য করুন। চাঁদা না দিলে, বিএনপি আমলে শুধু হরতালের ছবিই তুলতে পারবেন!';
        break;

      case 'লেখক/কবি':
        amount = incomeNum * 0.12 + 1200;
        message = 'আপনার লেখা যেমন মানুষকে অনুপ্রাণিত করে, আপনার চাঁদা তেমনি দলকে শক্তিশালী করবে। নইলে বিএনপি আমলে আপনাকে দিয়ে শুধু তাদের গুণগান লেখানো হবে।';
        break;

      case 'বিজ্ঞানী':
        amount = incomeNum * 0.30 + 30000;
        message = 'দেশের জন্য নতুন কিছু আবিষ্কারের পাশাপাশি দলের জন্য কিছু করুন। নইলে বিএনপি ক্ষমতায় এলে আপনার গবেষণাগারেই আগুন লাগিয়ে দেবে!';
        break;

      case 'ফার্মাসিস্ট':
        amount = incomeNum * 0.20 + 5000;
        message = 'ওষুধ বিক্রি করে যা লাভ করেন, তার থেকে দলের জন্য দিন। নইলে বিএনপি আমলে আপনার ফার্মেসিতে নকল ওষুধ বিক্রি করতে বাধ্য করা হবে।';
        break;

      case 'পাইলট':
        amount = incomeNum * 0.35 + 100000;
        message = 'আকাশে তো অনেক ওড়েন, এবার দলের জন্য মাটিতে নামুন। চাঁদা না দিলে, বিএনপি ক্ষমতায় এলে আপনার প্লেন হাইজ্যাক করে লন্ডনে নিয়ে যাবে!';
        break;

      case 'খেলোয়াড়':
        amount = incomeNum * 0.28 + 20000;
        message = 'মাঠে যেমন দেশের জন্য খেলেন, মাঠের বাইরেও দলের জন্য খেলুন। নইলে বিএনপি আমলে আপনার খেলার মাঠে রাজনৈতিক সমাবেশ হবে!';
        break;

      case 'গায়ক/গায়িকা':
        amount = incomeNum * 0.25 + 15000;
        message = 'আপনার গানের গলা যেমন সুন্দর, দলের প্রতি আপনার মনটাও তেমন সুন্দর হোক। চাঁদা দিন, নইলে বিএনপি আমলে আপনাকে দিয়ে শুধু দলীয় সংগীত গাওয়ানো হবে।';
        break;

      case 'নাপিত':
        amount = incomeNum * 0.10 + 600;
        message = 'মানুষের চুল কেটে যেমন স্টাইল করেন, দলের ফান্ডকেও তেমন স্টাইলিশ করুন। নইলে বিএনপি আমলে আপনার দোকানেও ভাঙচুর হবে!';
        break;

      case 'ইলেকট্রিশিয়ান':
        amount = incomeNum * 0.12 + 900;
        message = 'মানুষের ঘরে যেমন আলো জ্বালান, দলের ভবিষ্যৎও তেমন আলোকিত করুন। নইলে বিএনপি আমলে আপনার বিদ্যুতের খুঁটিতেই আগুন জ্বলবে!';
        break;

      case 'ডেভেলপার/প্রোগ্রামার':
        amount = incomeNum * 0.25 + 10000;
        message = 'কোড লিখে তো অনেক সমস্যার সমাধান করেন, এবার দেশের সবচেয়ে বড় সমস্যার সমাধানে এগিয়ে আসুন। চাঁদা দিন, নইলে বিএনপি আমলে আপনার বানানো ওয়েবসাইট হ্যাক করে বাঁশেরকেল্লা বানানো হবে।';
        break;

      case 'বাস কন্ডাক্টর':
        amount = incomeNum * 0.08 + 400;
        message = 'যাত্রীদের থেকে যেমন ভাড়া আদায় করেন, দলের জন্যও তেমন কিছু করুন। নইলে বিএনপি আমলে আপনার বাসেই আগুন লাগিয়ে দেবে!';
        break;

      case 'ফুটপাত হকার':
        amount = incomeNum * 0.05 + 200;
        message = 'রাস্তায় বসে যা আয় করেন, তার থেকে দলের জন্য সামান্য কিছু দিন। নইলে বিএনপি আমলে আপনার বসার জায়গাও দখল হয়ে যাবে!';
        break;

      case 'ছাত্রলীগ নেতা':
        amount = incomeNum * 0.50 + 200000;
        message = 'আপনি তো আমাদেরই লোক! আপনার থেকে তো বেশিই আশা করা যায়। আপনার টেন্ডারবাজি আর চাঁদাবাজির একটি বড় অংশ দলের তহবিলে দিন। মনে রাখবেন, বিএনপিকে রুখতে আপনার অবদানই সবচেয়ে বেশি প্রয়োজন!';
        break;

      default:
        amount = incomeNum * 0.10;
        message = 'যেকোনো পেশা থেকেই দলের জন্য অবদান রাখা একজন সচেতন নাগরিকের দায়িত্ব।';
    }

    if (occ !== 'বেকার' && incomeNum > 0 && amount < 100) {
      amount = 100;
    }

    const receiptId = generateReceiptId(name);
    return {
      amount: Math.round(amount),
      message,
      receiptId
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      setError('Please enter a valid name (English letters only)');
      setResult(null);
      return;
    }
    if (!income || isNaN(Number(income)) || Number(income) < 0) {
      setError('দয়া করে আপনার মাসিক আয়ের সঠিক পরিমাণ লিখুন।');
      setResult(null);
      return;
    }
    setError('');
    setIsLoading(true);
    setResult(null);

    setTimeout(async () => {
      const calculation = calculateChanda(occupation, income, name);
      setResult(calculation);
      
      // Save to database
      try {
        await fetch('/api/saveCalculation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            occupation,
            income: Number(income),
            chandaAmount: calculation.amount,
            receiptId: calculation.receiptId
          })
        });
      } catch (error) {
        console.error('Failed to save:', error);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleDownloadPDF = () => {
    setIsLoading(true);
    setError('');

    try {
      const pdf = new jsPDF();
      
      // Main content
      pdf.setFontSize(16);
      pdf.text(`Chanda Amount: ${result?.amount} Taka`, 10, 10);
      
      const englishMessage = result?.message 
        ? 'Your donation has been calculated. Thank you for your contribution.'
        : '';
      
      pdf.setFontSize(12);
      pdf.text(englishMessage, 10, 20);
      pdf.text(`Name: ${name}`, 10, 30);
      pdf.text(`Receipt ID: ${result?.receiptId}`, 10, 40);
      
      // Footer attribution
      pdf.setFontSize(10);
      pdf.text('Prepared by Chanda Calculator', 10, 80);
      pdf.text('*This project is maintained by Abu Sayed', 10, 85);
      
      pdf.save('chanda_estimate_receipt.pdf');
    } catch (error) {
      setError('PDF generation failed: ' + (error as Error).message);
      console.error('PDF generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="flex justify-center pt-8 mb-4">
          <img 
            src="/chanda-calculator.png" 
            alt="Chanda Calculator Logo" 
            className="h-24 w-auto"
          />
        </div>
      <h1 className="text-3xl font-bold mb-4">চাঁদা ক্যালকুলেটর</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="name">Name (English only)</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 pl-10 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="occupation">পেশা</label>
          <select
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="w-full p-2 pl-10 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          >
            {occupations.map((occ) => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="income">মাসিক আয়</label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full p-2 pl-10 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 text-gray-100 bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
        >
          {isLoading ? 'গণনা করা হচ্ছে...' : 'চাঁদা গণনা করুন'}
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
      {result && (
        <>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">চাঁদা পরিমাণ: {result.amount} টাকা</h2>
            <p className="text-gray-300">{result.message}</p>
            <p className="text-gray-300 mt-2">Receipt ID: {result.receiptId}</p>
            <button
              onClick={handleDownloadPDF}
              className="w-full p-2 text-gray-100 bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'PDF তৈরি করা হচ্ছে...' : 'রশিদ ডাউনলোড করুন'}
            </button>
          </div>
          <div style={{ display: 'none' }}>
            {/* <Receipt ref={hiddenResultRef} amount={result.amount} message={result.message} /> */}
          </div>
        </>
      )}
      {historicalData.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Recent Contributions</h2>
          <Bar 
            data={{
              labels: historicalData.map(item => item.name),
              datasets: [{
                label: 'Chanda Amount',
                data: historicalData.map(item => item.chandaAmount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
              }]
            }}
          />
        </div>
      )}
      <div className="mt-8 text-center text-xs text-gray-400 space-y-1">
        <p>
          Explore our new game: 
          <a href="https://hawa-bhaban-investment-simulator.vercel.app/" className="text-blue-300 underline ml-1">
            Hawa Bhaban Simulator
          </a>
        </p>
        <p>
          Prepared by 
          <a href="https://abusayed.com.bd/projects/chanda-calculator" className="text-blue-300 underline ml-1">
            Chanda Calculator
          </a>
        </p>
        <p>
          <sup>*</sup>This project is maintained by 
          <a href="https://linkedin.com/in/imabusayed" className="text-blue-300 underline ml-1">
            Abu Sayed
          </a>
        </p>
      </div>
    </div>
  );
}
