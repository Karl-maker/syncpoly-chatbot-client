'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import CountdownTimer from '@/components/CountdownTimer'
import SparklesBackground from '@/components/SparklesBackground'
import Link from 'next/link'
import confetti from 'canvas-confetti'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

interface User {
  id: string
  username?: string
  firstName?: string
  lastName?: string
  accessPeriod?: string | null
  timezone?: string
  country?: string
}

export default function Home() {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingAccess, setUpdatingAccess] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Initialize Telegram Web App
    if (typeof window !== 'undefined') {
      // Check if we're in development mode (when running locally, Telegram Web App won't be available)
      // We'll try to load Telegram SDK, but if it fails or user data isn't available, use mock data
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-web-app.js'
      script.async = true
      document.head.appendChild(script)

      script.onload = () => {
        const tg = (window as any).Telegram?.WebApp
        if (tg) {
          tg.ready()
          tg.expand()
          
          const initData = tg.initDataUnsafe
          if (initData?.user) {
            setTelegramUser(initData.user)
            fetchUserData(initData.user.id.toString())
          } else {
            // No Telegram user data - use mock in development
            const mockUser = {
              id: 123456789,
              first_name: 'John',
              last_name: 'Doe',
              username: 'johndoe'
            }
            setTelegramUser(mockUser)
            fetchUserData(mockUser.id.toString())
          }
        } else {
          // Telegram Web App not available - use mock in development
          const mockUser = {
            id: 123456789,
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe'
          }
          setTelegramUser(mockUser)
          fetchUserData(mockUser.id.toString())
        }
      }

      script.onerror = () => {
        // Failed to load Telegram SDK - use mock in development
        const mockUser = {
          id: 123456789,
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe'
        }
        setTelegramUser(mockUser)
        fetchUserData(mockUser.id.toString())
      }
    }
  }, [])

  const fetchUserData = async (telegramId: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/users/telegram/${telegramId}`, {
        cache: 'no-store',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user')
      }

      if (data.success && data.user) {
        setUser(data.user)
        
        // Update timezone and country on first visit
        updateTimezoneCountry(data.user.id)
      } else {
        throw new Error('User not found')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const updateTimezoneCountry = async (userId: string) => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      
      // Get country from IP geolocation using a free service
      let country: string | undefined
      try {
        // Use ipapi.co which is free and doesn't require API key
        const geoResponse = await fetch('https://ipapi.co/json/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        })
        
        if (geoResponse.ok) {
          const geoData = await geoResponse.json()
          if (geoData.country_code && geoData.country_code.length === 2) {
            country = geoData.country_code.toUpperCase()
          }
        }
      } catch (geoError) {
        // If geolocation fails, try fallback method using timezone
        console.warn('IP geolocation failed, trying timezone fallback:', geoError)
        country = getCountryFromTimezone(timezone)
      }

      await fetch(`/api/users/${userId}/timezone-country`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timezone,
          ...(country && { country }),
        }),
        cache: 'no-store',
      })
    } catch (err) {
      // Silently fail - not critical
      console.error('Failed to update timezone/country:', err)
    }
  }

  const getCountryFromTimezone = (tz: string): string | undefined => {
    // Map common timezones to countries (fallback method)
    const timezoneToCountry: Record<string, string> = {
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Los_Angeles': 'US',
      'America/Phoenix': 'US',
      'America/Anchorage': 'US',
      'America/Honolulu': 'US',
      'America/Toronto': 'CA',
      'America/Vancouver': 'CA',
      'America/Mexico_City': 'MX',
      'America/Sao_Paulo': 'BR',
      'America/Buenos_Aires': 'AR',
      'Europe/London': 'GB',
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Rome': 'IT',
      'Europe/Madrid': 'ES',
      'Europe/Amsterdam': 'NL',
      'Europe/Brussels': 'BE',
      'Europe/Vienna': 'AT',
      'Europe/Zurich': 'CH',
      'Europe/Stockholm': 'SE',
      'Europe/Oslo': 'NO',
      'Europe/Copenhagen': 'DK',
      'Europe/Helsinki': 'FI',
      'Europe/Warsaw': 'PL',
      'Europe/Prague': 'CZ',
      'Europe/Budapest': 'HU',
      'Europe/Athens': 'GR',
      'Europe/Istanbul': 'TR',
      'Europe/Moscow': 'RU',
      'Asia/Tokyo': 'JP',
      'Asia/Shanghai': 'CN',
      'Asia/Hong_Kong': 'HK',
      'Asia/Singapore': 'SG',
      'Asia/Seoul': 'KR',
      'Asia/Dubai': 'AE',
      'Asia/Kolkata': 'IN',
      'Asia/Bangkok': 'TH',
      'Asia/Jakarta': 'ID',
      'Asia/Manila': 'PH',
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU',
      'Australia/Brisbane': 'AU',
      'Australia/Perth': 'AU',
      'Pacific/Auckland': 'NZ',
      'Africa/Cairo': 'EG',
      'Africa/Johannesburg': 'ZA',
      'America/Port_of_Spain': 'TT', // Trinidad and Tobago
    }

    // Check exact match first
    if (timezoneToCountry[tz]) {
      return timezoneToCountry[tz]
    }

    // Check if timezone starts with a known region
    if (tz.startsWith('America/')) {
      // Try to extract from timezone name (e.g., America/New_York -> US)
      // This is a heuristic and may not be perfect
      return undefined
    }

    return undefined
  }

  const triggerConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // Launch from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      
      // Launch from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    // Final burst
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 100,
        origin: { x: 0.5, y: 0.5 }
      })
    }, duration - 500)
  }

  const addFreeDailyPass = async () => {
    if (!user) return

    try {
      setUpdatingAccess(true)
      const newAccessPeriod = new Date()
      newAccessPeriod.setHours(newAccessPeriod.getHours() + 24)

      const response = await fetch(`/api/users/${user.id}/access-period`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessPeriod: newAccessPeriod,
        }),
        cache: 'no-store',
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUser(data.user)
        setError(null)
        // Trigger confetti celebration!
        triggerConfetti()
      } else {
        throw new Error(data.message || 'Failed to update access period')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add free daily pass')
    } finally {
      setUpdatingAccess(false)
    }
  }

  const getInitials = (user: User | TelegramUser) => {
    if ('firstName' in user && user.firstName) {
      return user.firstName.charAt(0).toUpperCase()
    }
    if ('first_name' in user && user.first_name) {
      return user.first_name.charAt(0).toUpperCase()
    }
    return '?'
  }

  const isAccessExpired = () => {
    // Access is expired if accessPeriod is null or in the past
    if (!user?.accessPeriod) return true
    const accessDate = new Date(user.accessPeriod)
    return accessDate < new Date()
  }

  const isAccessActive = () => {
    // Access is active if accessPeriod exists and is in the future
    if (!user?.accessPeriod) return false
    const accessDate = new Date(user.accessPeriod)
    return accessDate >= new Date()
  }

  const getAccessPeriodDate = (): Date | null => {
    if (!user?.accessPeriod) return null
    return new Date(user.accessPeriod)
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <SparklesBackground />
        <div className="text-center relative z-10">
          <div className="relative mx-auto w-16 h-16">
            <div className="w-16 h-16 border-4 border-violet-200 dark:border-violet-900 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-violet-600 dark:border-violet-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 relative">
        <SparklesBackground />
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200/50 dark:border-gray-800/50 relative z-10">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops!</h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  // Prioritize user data from API over Telegram user data
  const displayName = user?.firstName || telegramUser?.first_name || 'User'
  const displayUsername = user?.username || telegramUser?.username
  const initials = user?.firstName 
    ? user.firstName.charAt(0).toUpperCase() 
    : telegramUser?.first_name 
      ? telegramUser.first_name.charAt(0).toUpperCase() 
      : '?'
  
  const accessPeriodDate = getAccessPeriodDate()
  const expired = isAccessExpired()
  const active = isAccessActive()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 relative">
      <SparklesBackground />
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50">
          {/* Avatar Section */}
          <div className="relative bg-white/80 dark:bg-gray-900/80 p-8 text-center overflow-hidden border-b border-gray-200/50 dark:border-gray-800/50">
            <div className="relative">
              <div className="w-28 h-28 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-5xl font-bold text-gray-700 dark:text-gray-300 shadow-lg mb-4 ring-2 ring-gray-200 dark:ring-gray-700">
                {initials}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {displayName}
              </h1>
              {displayUsername && (
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">@{displayUsername}</p>
              )}
            </div>
          </div>

          {/* Access Period Section */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Access Period
              </p>
              
              {/* Countdown Timer */}
              <div className={`mb-6 transition-all duration-300 ${expired ? 'opacity-60' : ''}`}>
                {expired ? (
                  // Show 00:00:00 when expired (null or in the past)
                  <div className="flex items-center justify-center gap-2 font-mono">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl md:text-5xl font-bold tabular-nums text-gray-400 dark:text-gray-600">
                        00
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-600 mt-1">HOURS</div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-gray-400 dark:text-gray-600">:</div>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl md:text-5xl font-bold tabular-nums text-gray-400 dark:text-gray-600">
                        00
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-600 mt-1">MINUTES</div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-gray-400 dark:text-gray-600">:</div>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl md:text-5xl font-bold tabular-nums text-gray-400 dark:text-gray-600">
                        00
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-600 mt-1">SECONDS</div>
                    </div>
                  </div>
                ) : (
                  // Show live countdown when access is active (in the future)
                  <CountdownTimer targetDate={accessPeriodDate} isExpired={false} />
                )}
              </div>

              {/* Status Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                expired 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  expired 
                    ? 'bg-red-500 dark:bg-red-400' 
                    : 'bg-green-500 dark:bg-green-400 animate-pulse'
                }`}></div>
                {expired ? 'Access Expired' : 'Active'}
              </div>
            </div>

            {/* Free Daily Pass Button - Only show when expired (null or in the past) */}
            {expired && (
              <button
                onClick={addFreeDailyPass}
                disabled={updatingAccess}
                className="group relative w-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-5 px-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-2 text-lg">
                  {updatingAccess ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🎁</span>
                      Free Daily Pass
                    </>
                  )}
                </span>
              </button>
            )}

            {error && user && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-shake">
                <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Privacy Policy Link */}
            <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
              <Link 
                href="/privacy-policy" 
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-center block"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
