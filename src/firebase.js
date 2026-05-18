import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const googleProvider = new GoogleAuthProvider()

let authInstance = null

export const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean)

const getAuthInstance = () => {
  if (!hasFirebaseConfig) {
    throw new Error('Firebase configuration is missing. Set the VITE_FIREBASE_* environment variables before using Google sign-in.')
  }

  if (!authInstance) {
    const app = initializeApp(firebaseConfig)
    authInstance = getAuth(app)
  }

  return authInstance
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(getAuthInstance(), googleProvider)
    return result.user
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}
