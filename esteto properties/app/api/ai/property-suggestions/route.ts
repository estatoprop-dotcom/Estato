import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Property Suggestions API Route
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { budget, propertyType, purpose, preferredArea, bedrooms } = body;

    // Validate required fields
    if (!budget || !propertyType || !purpose) {
      return NextResponse.json(
        {
          success: false,
          error: 'Budget, propertyType, and purpose are required',
        },
        { status: 400 }
      );
    }

    // Get auth token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/api/ai/property-suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        budget,
        propertyType,
        purpose,
        preferredArea,
        bedrooms,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Property suggestions error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get property suggestions',
      },
      { status: 500 }
    );
  }
}

