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
  const occupations = ['ছাত্র', 'চাকরিজীবী', 'ব্যবসায়ী', 'বেকার', 'প্রবাসী', 'ফ্রিল্যান্সার', 'রাজনীতিবিদ', 'অভিনেতা/অভিনেত্রী', 'কৃষক', 'গৃহিণী'];

  const generateReceiptId = (name: string): string => {
    const prefixes = ['CHANDA-KING-', 'DONATION-HERO-', 'BNP-BUSTER-', 'PEOPLES-CHAMP-'];
    const suffixes = ['-THE-GREAT', '-OF-DEMOCRACY', '-AGAINST-CORRUPTION', '-FOR-JUSTICE'];
    
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
      case 'ছাত্র':
        amount = Math.max(50, incomeNum * 0.05);
        message = 'আপনার পকেট মানি বাঁচিয়ে দলের জন্য এই ক্ষুদ্র অবদান গণতন্ত্র পুনরুদ্ধারের সংগ্রামকে আরও বেগবান করবে। মনে রাখবেন, বিএনপি ক্ষমতায় এলে টিফিনের টাকাও বাঁচাতে পারবেন না!';
        break;
      case 'চাকরিজীবী':
        amount = incomeNum * 0.15 + 500;
        message = 'মাস শেষে বেতনের একটি অংশ দলের তহবিলে জমা দিন। বিএনপি ক্ষমতায় গেলে তো বেতনই বন্ধ হয়ে যাবে, তাই এখনই সঞ্চয় করুন!';
        break;
      case 'ব্যবসায়ী':
        amount = incomeNum * 0.25 + 2000;
        message = 'ব্যবসার লাভ থেকে দলের জন্য বিনিয়োগ করুন। বিএনপি ক্ষমতায় এলে আপনার ব্যবসায় হরতাল-অবরোধে লাটে উঠবে!';
        break;
      case 'বেকার':
        amount = 10;
        message = 'আমরা আপনার পরিস্থিতি বুঝি। আপাতত এইটুকুই দিন। কথা দিচ্ছি, আমাদের আমলে আপনার কর্মসংস্থানের ব্যবস্থা করা হবে... প্রথম মিছিলটিতেই! আর বিএনপি ক্ষমতায় এলে তো চাকরির বাজারে হাহাকার আরও বেড়ে যাবে!';
        break;
      case 'প্রবাসী':
        amount = incomeNum * 0.30 + 10000;
        message = 'দূর দেশে থেকেও দেশের কথা ভাবার জন্য আপনাকে ধন্যবাদ। আপনার পাঠানো রেমিট্যান্স দলের সংগ্রামকে নতুন শক্তি যোগাবে। বিএনপি ক্ষমতায় গেলে রেমিট্যান্স পাঠানোর পথেও বাধা তৈরি করবে, তাই এখনই সাহায্য করুন!';
        break;
      case 'ফ্রিল্যান্সার':
        amount = incomeNum * 0.20 + 1500;
        message = 'আপনার অর্জিত ডলার দেশের গণতন্ত্রের চেয়ে কম মূল্যবান নয়। আপনার এই ডিজিটাল অবদানকে দল সর্বদা স্মরণ রাখবে। বিএনপি ক্ষমতায় এলে ইন্টারনেট বন্ধ করে দেবে, তখন আর ডলার আয় করা যাবে না!';
        break;
      case 'রাজনীতিবিদ':
        amount = incomeNum * 0.40 + 50000;
        message = 'রাজনীতিবিদ হিসেবে আপনার অবদান অবশ্যই বেশি হওয়া উচিত। মনে রাখবেন, বিএনপি ক্ষমতায় গেলে আপনার রাজনৈতিক ক্যারিয়ারই শেষ!';
        break;
      case 'অভিনেতা/অভিনেত্রী':
        amount = incomeNum * 0.35 + 30000;
        message = 'অভিনয় করে যা আয় করেন, তার কিছু অংশ দলের জন্য দিন। বিএনপি ক্ষমতায় গেলে সিনেমা হল বন্ধ হয়ে যাবে, তখন আর আয় রইবে না!';
        break;
      case 'কৃষক':
        amount = incomeNum * 0.10 + 1000;
        message = 'কৃষক ভাই, আপনার আয় কম তাই আমরা কম চাঁদা নিচ্ছি। তবে মনে রাখবেন, বিএনপি ক্ষমতায় গেলে কৃষি ভর্তুকি বন্ধ হয়ে যাবে!';
        break;
      case 'গৃহিণী':
        amount = 500;
        message = 'গৃহিণী হিসেবে আপনার কাছে আমাদের আবেদন, আপনি মাসে অন্তত ৫০০ টাকা চাঁদা দিন। বিএনপি ক্ষমতায় গেলে গৃহিণীদেরও রান্নার গ্যাসের দাম বেড়ে যাবে!';
        break;
      default:
        amount = incomeNum * 0.10;
        message = 'যেকোনো পেশা থেকেই দলের জন্য অবদান রাখা একজন সচেতন নাগরিকের দায়িত্ব।';
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
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
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
      <div className="mt-8 text-center text-xs text-gray-400">
        <p>Prepared by <a href="https://abusayed.com.bd/projects/chanda-calculator" className="text-blue-300 underline">Chanda Calculator</a></p>
        <p><sup>*</sup>This project is maintained by <a href="https://linkedin.com/in/imabusayed" className="text-blue-300 underline">Abu Sayed</a></p>
      </div>
    </div>
  );
}
