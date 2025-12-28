import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Area Comparison API Route
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { area1, area2 } = body;

    // Validate required fields
    if (!area1 || !area2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Both area1 and area2 are required',
        },
        { status: 400 }
      );
    }

    // Get auth token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/api/ai/compare-areas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        area1,
        area2,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Area comparison error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to compare areas',
      },
      { status: 500 }
    );
  }
}

