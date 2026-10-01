// 'use client'

// import {
//   useEffect,
//   useState,
//   useRef,
//   useCallback,
// } from 'react'

// import { useRouter } from 'next/navigation'
// import { Roboto } from 'next/font/google'
// import {
//   Loader,
//   Clock,
// } from 'lucide-react'

// const roboto = Roboto({
//   weight: [
//     '100',
//     '300',
//     '400',
//     '500',
//     '700',
//     '900',
//   ],
//   style: ['normal', 'italic'],
//   subsets: ['latin'],
//   display: 'swap',
// })

// interface ProtectedRouteProps {
//   children: React.ReactNode
//   allowedUser: 'hr' | 'admin'
// }

// const INACTIVITY_TIMEOUT_MS = 300000
// const WARNING_BEFORE_MS = 30000

// export default function ProtectedRoute({
//   children,
//   allowedUser,
// }: ProtectedRouteProps) {
//   const router = useRouter()

//   const [loading, setLoading] = useState(true)
//   const [authorized, setAuthorized] =
//     useState(false)

//   const [showWarning, setShowWarning] =
//     useState(false)

//   const [secondsLeft, setSecondsLeft] =
//     useState(30)

//   const logoutTimerRef =
//     useRef<ReturnType<typeof setTimeout> | null>(
//       null
//     )

//   const warnTimerRef =
//     useRef<ReturnType<typeof setTimeout> | null>(
//       null
//     )

//   const countdownRef =
//     useRef<ReturnType<typeof setInterval> | null>(
//       null
//     )

//   // ============================================
//   // AUTH CHECK
//   // ============================================

//   useEffect(() => {
//     let cancelled = false

//     const storageKey =
//       allowedUser === 'admin'
//         ? 'admin_user'
//         : 'hrms_user'

//     const loginPath =
//       allowedUser === 'admin'
//         ? '/admin/login'
//         : '/hr/login'

//     const checkAuth = () => {
//       try {
//         const savedUser =
//           localStorage.getItem(storageKey)

//         if (!savedUser) {
//           if (!cancelled) {
//             setAuthorized(false)
//             setLoading(false)
//           }

//           router.replace(loginPath)
//           return
//         }

//         let userData

//         try {
//           userData = JSON.parse(savedUser)
//         } catch {
//           localStorage.removeItem(storageKey)

//           if (!cancelled) {
//             setAuthorized(false)
//             setLoading(false)
//           }

//           router.replace(loginPath)
//           return
//         }

//         if (
//           !userData ||
//           userData.role !== allowedUser
//         ) {
//           localStorage.removeItem(storageKey)

//           if (!cancelled) {
//             setAuthorized(false)
//             setLoading(false)
//           }

//           router.replace(loginPath)
//           return
//         }

//         if (!cancelled) {
//           setAuthorized(true)
//           setLoading(false)
//         }
//       } catch (error) {
//         console.error(
//           'ProtectedRoute error:',
//           error
//         )

//         localStorage.removeItem(storageKey)

//         if (!cancelled) {
//           setAuthorized(false)
//           setLoading(false)
//         }

//         router.replace(loginPath)
//       }
//     }

//     checkAuth()

//     return () => {
//       cancelled = true
//     }
//   }, [router, allowedUser])

//   // ============================================
//   // LOGOUT
//   // ============================================

//   const performLogout = useCallback(() => {
//     const storageKey =
//       allowedUser === 'admin'
//         ? 'admin_user'
//         : 'hrms_user'

//     const loginPath =
//       allowedUser === 'admin'
//         ? '/admin/login'
//         : '/hr/login'

//     clearAllTimers()

//     localStorage.removeItem(storageKey)

//     setAuthorized(false)

//     router.replace(loginPath)
//   }, [router, allowedUser])

//   // ============================================
//   // CLEAR TIMERS
//   // ============================================

//   const clearAllTimers = useCallback(() => {
//     if (logoutTimerRef.current) {
//       clearTimeout(logoutTimerRef.current)
//     }

//     if (warnTimerRef.current) {
//       clearTimeout(warnTimerRef.current)
//     }

//     if (countdownRef.current) {
//       clearInterval(countdownRef.current)
//     }

//     logoutTimerRef.current = null
//     warnTimerRef.current = null
//     countdownRef.current = null
//   }, [])

//   // ============================================
//   // INACTIVITY TIMER
//   // ============================================

//   const resetInactivityTimer =
//     useCallback(() => {
//       if (!authorized) return

//       clearAllTimers()

//       setShowWarning(false)
//       setSecondsLeft(30)

//       warnTimerRef.current = setTimeout(
//         () => {
//           setShowWarning(true)
//           setSecondsLeft(30)

//           countdownRef.current =
//             setInterval(() => {
//               setSecondsLeft((seconds) => {
//                 if (seconds <= 1) {
//                   if (
//                     countdownRef.current
//                   ) {
//                     clearInterval(
//                       countdownRef.current
//                     )
//                   }

//                   return 0
//                 }

//                 return seconds - 1
//               })
//             }, 1000)
//         },
//         INACTIVITY_TIMEOUT_MS -
//           WARNING_BEFORE_MS
//       )

//       logoutTimerRef.current = setTimeout(
//         performLogout,
//         INACTIVITY_TIMEOUT_MS
//       )
//     }, [
//       authorized,
//       clearAllTimers,
//       performLogout,
//     ])

//   // ============================================
//   // ACTIVITY
//   // ============================================

//   useEffect(() => {
//     if (!authorized) return

//     const events:
//       (keyof WindowEventMap)[] = [
//         'mousemove',
//         'mousedown',
//         'keydown',
//         'scroll',
//         'touchstart',
//         'click',
//         'wheel',
//       ]

//     resetInactivityTimer()

//     events.forEach((event) => {
//       window.addEventListener(
//         event,
//         resetInactivityTimer,
//         { passive: true }
//       )
//     })

//     const visibilityHandler = () => {
//       if (
//         document.visibilityState ===
//         'visible'
//       ) {
//         resetInactivityTimer()
//       }
//     }

//     document.addEventListener(
//       'visibilitychange',
//       visibilityHandler
//     )

//     return () => {
//       clearAllTimers()

//       events.forEach((event) => {
//         window.removeEventListener(
//           event,
//           resetInactivityTimer
//         )
//       })

//       document.removeEventListener(
//         'visibilitychange',
//         visibilityHandler
//       )
//     }
//   }, [
//     authorized,
//     resetInactivityTimer,
//     clearAllTimers,
//   ])

//   // ============================================
//   // LOADING
//   // ============================================

//   if (loading) {
//     return (
//       <div
//         className={`flex items-center justify-center min-h-screen bg-gray-50 ${roboto.className}`}
//       >
//         <Loader className="w-12 h-12 animate-spin text-[#0071BD]" />
//       </div>
//     )
//   }

//   if (!authorized) {
//     return null
//   }

//   return (
//     <>
//       {children}

//       {showWarning && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">

//           <div
//             className={`bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 text-center ${roboto.className}`}
//           >

//             <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
//               <Clock className="w-7 h-7 text-amber-600" />
//             </div>

//             <h3 className="text-lg font-bold text-gray-800 tracking-wider mb-2">
//               Session Expiring
//             </h3>

//             <p className="text-sm text-gray-600 tracking-wide">
//               You&apos;ve been inactive.
//               You&apos;ll be logged out in
//             </p>

//             <p className="text-3xl font-bold text-red-600 tracking-wider my-3">
//               {secondsLeft}s
//             </p>

//             <button
//               onClick={
//                 resetInactivityTimer
//               }
//               className="w-full py-2.5 bg-[#0071BD] text-white hover:bg-[#005a96] transition rounded text-sm font-medium"
//             >
//               Stay Logged In
//             </button>

//             <button
//               onClick={performLogout}
//               className="w-full mt-2 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition rounded text-sm"
//             >
//               Logout Now
//             </button>

//           </div>

//         </div>
//       )}
//     </>
//   )
// }


'use client'

import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'

import { useRouter } from 'next/navigation'
import { Roboto } from 'next/font/google'
import {
  Loader,
  Clock,
} from 'lucide-react'

const roboto = Roboto({
  weight: [
    '100',
    '300',
    '400',
    '500',
    '700',
    '900',
  ],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUser: 'hr' | 'admin'
}

const INACTIVITY_TIMEOUT_MS = 300000
const WARNING_BEFORE_MS = 30000

export default function ProtectedRoute({
  children,
  allowedUser,
}: ProtectedRouteProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] =
    useState(false)

  const [showWarning, setShowWarning] =
    useState(false)

  const [secondsLeft, setSecondsLeft] =
    useState(30)

  const logoutTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    )

  const warnTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    )

  const countdownRef =
    useRef<ReturnType<typeof setInterval> | null>(
      null
    )

  // ============================================
  // CLEAR TIMERS (defined BEFORE performLogout)
  // ============================================

  const clearAllTimers = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current)
    }

    if (warnTimerRef.current) {
      clearTimeout(warnTimerRef.current)
    }

    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }

    logoutTimerRef.current = null
    warnTimerRef.current = null
    countdownRef.current = null
  }, [])

  // ============================================
  // LOGOUT
  // ============================================

  const performLogout = useCallback(() => {
    const storageKey =
      allowedUser === 'admin'
        ? 'admin_user'
        : 'hrms_user'

    const loginPath =
      allowedUser === 'admin'
        ? '/admin/login'
        : '/hr/login'

    clearAllTimers()

    localStorage.removeItem(storageKey)

    setAuthorized(false)

    router.replace(loginPath)
  }, [router, allowedUser, clearAllTimers])

  // ============================================
  // AUTH CHECK
  // ============================================

  useEffect(() => {
    let cancelled = false

    const storageKey =
      allowedUser === 'admin'
        ? 'admin_user'
        : 'hrms_user'

    const loginPath =
      allowedUser === 'admin'
        ? '/admin/login'
        : '/hr/login'

    const checkAuth = () => {
      try {
        const savedUser =
          localStorage.getItem(storageKey)

        if (!savedUser) {
          if (!cancelled) {
            setAuthorized(false)
            setLoading(false)
          }

          router.replace(loginPath)
          return
        }

        let userData

        try {
          userData = JSON.parse(savedUser)
        } catch {
          localStorage.removeItem(storageKey)

          if (!cancelled) {
            setAuthorized(false)
            setLoading(false)
          }

          router.replace(loginPath)
          return
        }

        if (
          !userData ||
          userData.role !== allowedUser
        ) {
          localStorage.removeItem(storageKey)

          if (!cancelled) {
            setAuthorized(false)
            setLoading(false)
          }

          router.replace(loginPath)
          return
        }

        if (!cancelled) {
          setAuthorized(true)
          setLoading(false)
        }
      } catch (error) {
        console.error(
          'ProtectedRoute error:',
          error
        )

        localStorage.removeItem(storageKey)

        if (!cancelled) {
          setAuthorized(false)
          setLoading(false)
        }

        router.replace(loginPath)
      }
    }

    checkAuth()

    return () => {
      cancelled = true
    }
  }, [router, allowedUser])

  // ============================================
  // INACTIVITY TIMER
  // ============================================

  const resetInactivityTimer =
    useCallback(() => {
      if (!authorized) return

      clearAllTimers()

      setShowWarning(false)
      setSecondsLeft(30)

      warnTimerRef.current = setTimeout(
        () => {
          setShowWarning(true)
          setSecondsLeft(30)

          countdownRef.current =
            setInterval(() => {
              setSecondsLeft((seconds) => {
                if (seconds <= 1) {
                  if (
                    countdownRef.current
                  ) {
                    clearInterval(
                      countdownRef.current
                    )
                  }

                  return 0
                }

                return seconds - 1
              })
            }, 1000)
        },
        INACTIVITY_TIMEOUT_MS -
          WARNING_BEFORE_MS
      )

      logoutTimerRef.current = setTimeout(
        performLogout,
        INACTIVITY_TIMEOUT_MS
      )
    }, [
      authorized,
      clearAllTimers,
      performLogout,
    ])

  // ============================================
  // ACTIVITY
  // ============================================

  useEffect(() => {
    if (!authorized) return

    const events:
      (keyof WindowEventMap)[] = [
        'mousemove',
        'mousedown',
        'keydown',
        'scroll',
        'touchstart',
        'click',
        'wheel',
      ]

    resetInactivityTimer()

    events.forEach((event) => {
      window.addEventListener(
        event,
        resetInactivityTimer,
        { passive: true }
      )
    })

    const visibilityHandler = () => {
      if (
        document.visibilityState ===
        'visible'
      ) {
        resetInactivityTimer()
      }
    }

    document.addEventListener(
      'visibilitychange',
      visibilityHandler
    )

    return () => {
      clearAllTimers()

      events.forEach((event) => {
        window.removeEventListener(
          event,
          resetInactivityTimer
        )
      })

      document.removeEventListener(
        'visibilitychange',
        visibilityHandler
      )
    }
  }, [
    authorized,
    resetInactivityTimer,
    clearAllTimers,
  ])

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen bg-gray-50 ${roboto.className}`}
      >
        <Loader className="w-12 h-12 animate-spin text-[#0071BD]" />
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return (
    <>
      {children}

      {showWarning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">

          <div
            className={`bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 text-center ${roboto.className}`}
          >

            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="w-7 h-7 text-amber-600" />
            </div>

            <h3 className="text-lg font-bold text-gray-800 tracking-wider mb-2">
              Session Expiring
            </h3>

            <p className="text-sm text-gray-600 tracking-wide">
              You&apos;ve been inactive.
              You&apos;ll be logged out in
            </p>

            <p className="text-3xl font-bold text-red-600 tracking-wider my-3">
              {secondsLeft}s
            </p>

            <button
              onClick={
                resetInactivityTimer
              }
              className="w-full py-2.5 bg-[#0071BD] text-white hover:bg-[#005a96] transition rounded text-sm font-medium"
            >
              Stay Logged In
            </button>

            <button
              onClick={performLogout}
              className="w-full mt-2 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition rounded text-sm"
            >
              Logout Now
            </button>

          </div>

        </div>
      )}
    </>
  )
}