import { NextRequest, NextResponse } from 'next/server'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

const API_URL = process.env.API_URL || 'http://localhost:4040'
const isDevelopment = process.env.NODE_ENV === 'development'

// Mock user data for development
const getMockUser = (telegramId: string) => {
  const now = new Date()
  const expiredDate = new Date(now.getTime() - 24 * 60 * 60 * 1000) // 24 hours ago (expired)
  const activeDate = new Date(now.getTime() + 48 * 60 * 60 * 1000) // 48 hours from now (active)

  return {
    success: true,
    user: {
      id: 'mock-user-uuid-12345',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      tokensUsed: 1500,
      lastSnapShotOfTokensUsed: now.toISOString(),
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      country: 'US',
      language: 'en',
      consentVersion: '1.0',
      // Use expired date to show the "Free Daily Pass" button by default
      accessPeriod: expiredDate.toISOString(),
    },
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { telegram_id: string } }
) {
  try {
    const telegramId = params.telegram_id

    if (!telegramId) {
      return NextResponse.json(
        { success: false, error: 'Request Error', message: 'Telegram ID is required' },
        { status: 400 }
      )
    }

    // Always try to fetch from real API first
    try {
      const response = await fetch(`${API_URL}/api/v1/users/telegram/${telegramId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      const data = await response.json()

      if (!response.ok) {
        // If API returns an error and we're in development, fall back to mock
        if (isDevelopment && response.status === 404) {
          await new Promise((resolve) => setTimeout(resolve, 300))
          return NextResponse.json(getMockUser(telegramId), {
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
        return NextResponse.json(getMockUser(telegramId), {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        })
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

