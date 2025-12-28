import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Price Guidance API Route
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyType, area, size } = body;

    // Validate required fields
    if (!propertyType || !area || !size) {
      return NextResponse.json(
        {
          success: false,
          error: 'propertyType, area, and size are required',
        },
        { status: 400 }
      );
    }

    // Get auth token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/api/ai/price-guidance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        propertyType,
        area,
        size,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Price guidance error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get price guidance',
      },
      { status: 500 }
    );
  }
}

