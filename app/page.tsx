'use client';

import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';

interface ChandaResult {
  amount: number;
  message: string;
}

export default function ChandaCalculator() {
  const [occupation, setOccupation] = useState<string>('ছাত্র');
  const [income, setIncome] = useState<string>('');
  const [result, setResult] = useState<ChandaResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentYear, setCurrentYear] = useState<number>();
  const resultRef = useRef<HTMLDivElement>(null);
  const hiddenResultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const occupations = ['ছাত্র', 'চাকরিজীবী', 'ব্যবসায়ী', 'বেকার', 'প্রবাসী', 'ফ্রিল্যান্সার'];

  const calculateChanda = (occ: string, inc: string): ChandaResult => {
    let amount = 0;
    let message = '';
    const incomeNum = Number(inc);

    switch (occ) {
      case 'ছাত্র':
        amount = Math.max(50, incomeNum * 0.05);
        message = 'আপনার পকেট মানি বাঁচিয়ে দলের জন্য এই ক্ষুদ্র অবদান গণতন্ত্র পুনরুদ্ধারের সংগ্রামকে আরও বেগবান করবে।';
        break;
      case 'চাকরিজীবী':
        amount = incomeNum * 0.15 + 500;
        message = 'মাস শেষে বেতনের একটি অংশ দলের তহবিলে জমা দিয়ে আপনিও হতে পারেন এই ঐতিহাসিক আন্দোলনের একজন গর্বিত অংশীদার।';
        break;
      case 'ব্যবসায়ী':
        amount = incomeNum * 0.25 + 2000;
        message = 'ব্যবসার লাভ থেকে দলের জন্য আপনার এই বিনিয়োগ বৃথা যাবে না। ক্ষমতার পরিবর্তনে আপনার ব্যবসাই সবচেয়ে বেশি লাভবান হবে।';
        break;
      case 'বেকার':
        amount = 10;
        message = 'আমরা আপনার পরিস্থিতি বুঝি। আপাতত এইটুকুই দিন। কথা দিচ্ছি, আমাদের আমলে আপনার কর্মসংস্থানের ব্যবস্থা করা হবে... প্রথম মিছিলটিতেই!';
        break;
      case 'প্রবাসী':
        amount = incomeNum * 0.30 + 10000;
        message = 'দূর দেশে থেকেও দেশের কথা ভাবার জন্য আপনাকে ধন্যবাদ। আপনার পাঠানো রেমিট্যান্স দলের সংগ্রামকে নতুন শক্তি যোগাবে।';
        break;
      case 'ফ্রিল্যান্সার':
        amount = incomeNum * 0.20 + 1500;
        message = 'আপনার অর্জিত ডলার দেশের গণতন্ত্রের চেয়ে কম মূল্যবান নয়। আপনার এই ডিজিটাল অবদানকে দল সর্বদা স্মরণ রাখবে।';
        break;
      default:
        amount = incomeNum * 0.10;
        message = 'যেকোনো পেশা থেকেই দলের জন্য অবদান রাখা একজন সচেতন নাগরিকের দায়িত্ব।';
    }

    if (occ !== 'বেকার' && incomeNum > 0 && amount < 100) {
      amount = 100;
    }

    return {
      amount: Math.round(amount),
      message
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!income || isNaN(Number(income)) || Number(income) < 0) {
      setError('দয়া করে আপনার মাসিক আয়ের সঠিক পরিমাণ লিখুন।');
      setResult(null);
      return;
    }
    setError('');
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const calculation = calculateChanda(occupation, income);
      setResult(calculation);
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
      <h1 className="text-3xl font-bold mb-4">চাঁদা ক্যালকুলেটর</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
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
      <div className="mt-8 text-center text-xs text-gray-400">
        <p>Prepared by <a href="https://abusayed.com.bd/projects/chanda-calculator" className="text-blue-300 underline">Chanda Calculator</a></p>
        <p><sup>*</sup>This project is maintained by <a href="https://linkedin.com/in/imabusayed" className="text-blue-300 underline">Abu Sayed</a></p>
      </div>
    </div>
  );
}
