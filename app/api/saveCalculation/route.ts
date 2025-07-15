import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    await prisma.calculation.create({
      data: {
        name: data.name,
        occupation: data.occupation,
        income: data.income,
        chandaAmount: data.chandaAmount,
        receiptId: data.receiptId
      }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to save calculation' },
      { status: 500 }
    );
  }
}
