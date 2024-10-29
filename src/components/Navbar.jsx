import React, { useState } from 'react';
import { User, AlertCircle, X } from 'lucide-react';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Tracks whether the user is logging in or signing up
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '' // Added username field for signup
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = isSignup ? '/api/signup' : '/api/login'; // Change URL based on login or signup
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(isSignup ? 'Signup failed' : 'Login failed');
      }

      setIsLoginOpen(false);
    } catch (err) {
      setError(isSignup ? 'Signup failed' : 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">GRS-Player</h1>

        <div className="relative">
          <button
            onClick={() => setIsLoginOpen(!isLoginOpen)}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            <User size={24} />
          </button>

          {isLoginOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl z-50">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{isSignup ? 'Sign Up' : 'Login'}</h2>
                  <button 
                    onClick={() => setIsLoginOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignup && ( // Only show username field if signing up
                    <div>
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/20 p-2 rounded">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Log In')}
                  </button>
                </form>

                {!isSignup && (
                  <div className="mt-4 text-center">
                    <a href="#" className="text-purple-400 hover:text-purple-300 text-sm">
                      Forgot password?
                    </a>
                  </div>
                )}

                <div className="mt-4 text-center text-gray-400 text-sm">
                  {isSignup ? (
                    <>
                      Already have an account?{' '}
                      <button
                        onClick={() => setIsSignup(false)}
                        className="text-purple-400 hover:text-purple-300 ml-1"
                      >
                        Log in
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <button
                        onClick={() => setIsSignup(true)}
                        className="text-purple-400 hover:text-purple-300 ml-1"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
