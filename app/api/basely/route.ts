import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    project: 'Basely',
    description: 'AI-powered DeFi Telegram buddy',
    version: '0.1.0',
    endpoints: {
      health: '/api/basely',
      telegram: '/api/telegram (coming soon)',
      ai: '/api/ai (coming soon)',
      web3: '/api/web3 (coming soon)',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({
      status: 'ok',
      message: 'Request received',
      echo: body,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Invalid request body',
      },
      { status: 400 }
    );
  }
}
