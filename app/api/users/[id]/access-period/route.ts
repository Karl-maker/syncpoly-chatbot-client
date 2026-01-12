import { NextRequest, NextResponse } from 'next/server'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

const API_URL = process.env.API_URL || 'http://localhost:4040'
const isDevelopment = process.env.NODE_ENV === 'development'

// Mock response for development
const getMockResponse = (userId: string, body: any) => {
  const now = new Date()
  return {
    success: true,
    user: {
      id: userId,
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      tokensUsed: 1500,
      lastSnapShotOfTokensUsed: now.toISOString(),
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      country: 'US',
      language: 'en',
      consentVersion: '1.0',
      accessPeriod: body.accessPeriod || null,
    },
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    const body = await request.json()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Request Error', message: 'User ID is required' },
        { status: 400 }
      )
    }

    // Always try to fetch from real API first
    try {
      const response = await fetch(`${API_URL}/api/v1/users/${userId}/access-period`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      })

      const data = await response.json()

      if (!response.ok) {
        // If API returns an error and we're in development, fall back to mock
        if (isDevelopment) {
          await new Promise((resolve) => setTimeout(resolve, 300))
          return NextResponse.json(getMockResponse(userId, body), {
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          })
        }
        return NextResponse.json(data, {
          status: response.status,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        })
      }

      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
    } catch (fetchError: any) {
      // If fetch fails (network error, API not available) and we're in development, use mock
      if (isDevelopment) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return NextResponse.json(getMockResponse(userId, body))
      }
      throw fetchError
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: error.message },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
  }
}

