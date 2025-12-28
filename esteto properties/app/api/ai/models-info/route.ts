import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Models Info API Route
 * Get information about available AI models
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  try {
    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/api/ai/models-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Models info error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get models info',
      },
      { status: 500 }
    );
  }
}

