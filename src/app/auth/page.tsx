"use client"
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from 'next/navigation'
import { FaGoogle, FaGithub } from 'react-icons/fa'

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient()
  const router = useRouter()

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setError(""); 
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password 
        });
        if (error) throw error;
        setError("Check your email for confirmation link!");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuthSignIn(provider: 'google' | 'github') {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      if (error) throw error
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-blue/5"></div>
      
      <div className="max-w-md w-full space-y-8 relative">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold">
            <span className="gradient-purple-blue bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Create Account"}
            </span>
          </h2>
          <p className="mt-2 text-gray-400">
            {isLogin ? "Sign in to your account" : "Sign up for a new account"}
          </p>
        </div>
        
        <div className="bg-dark-800 p-8 rounded-xl shadow-2xl border border-dark-700 space-y-6">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="w-full flex justify-center items-center px-4 py-3 border border-dark-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-dark-700 hover:bg-dark-600 transition-all duration-200 hover:scale-105"
            >
              <FaGoogle className="mr-3 text-accent-red" />
              Continue with Google
            </button>
            
            <button
              onClick={() => handleOAuthSignIn('github')}
              className="w-full flex justify-center items-center px-4 py-3 border border-dark-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-dark-700 hover:bg-dark-600 transition-all duration-200 hover:scale-105"
            >
              <FaGithub className="mr-3 text-white" />
              Continue with GitHub
            </button>
          </div>

          <div className="relative">
            <div className="relative inset-0 flex items-center">
              <div className="py-2 w-full border-t border-dark-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-800 text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-purple-blue text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Loading..." : (isLogin ? "Sign In" : "Sign Up")}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-accent-blue hover:text-blue-400 transition-colors duration-200"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          {error && (
            <div className="text-accent-red text-sm text-center bg-accent-red/10 p-3 rounded-lg border border-accent-red/20">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
