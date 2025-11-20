import React, { useState, Fragment } from 'react';
import { FaEnvelope, FaTimes, FaRocket, FaHandPointRight, FaWhatsapp, FaSpinner } from 'react-icons/fa'; // Added FaSpinner for loading state

function FlyOutMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'loading', null
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionStatus(null); // Reset status on new attempt
    setLoading(true); // Start loading

    console.log(`Attempting to subscribe email: ${email}`);
    try {
      // *** This is where you call your backend API ***
      // IMPORTANT: Adjust 'http://localhost:3001/api/subscribe' to your actual backend URL
      // In production, this would typically be a relative path or an environment variable.
      const response = await fetch('http://localhost:3001/api/subscribe', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // If the server responded with an error status (e.g., 400, 500)
        const errorData = await response.json();
        throw new Error(errorData.message || 'Subscription failed! Please try again.');
      }

      // If the response is successful
      setSubmissionStatus('success');
      setEmail(''); // Clear email on success
      setTimeout(() => setIsOpen(false), 2000); // Auto-close after success
    } catch (error) {
      console.error("Subscription error:", error);
      setSubmissionStatus('error');
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <Fragment>
      {/* Trigger Button - Remains the same */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#bd34fe] text-white shadow-lg 
                   transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[#bd34fe]/50 focus:outline-none focus:ring-4 focus:ring-[#bd34fe]/40" 
        aria-label="Open contact menu"
      >
        <FaEnvelope className="h-6 w-6" />
      </button>

      {/* Pop-up Modal Container */}
      {/* z-[60] to ensure it's above the trigger button (z-50) */}
      <div 
        className={`fixed inset-0 z-[60] flex items-center justify-center 
                    ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Overlay - Smoother fade */}
        <div 
          onClick={() => setIsOpen(false)} 
          className={`fixed inset-0 bg-black/70 transition-opacity duration-300 
                      ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
          aria-hidden="true" 
        />
        
        {/* Actual Pop-up Panel */}
        <div 
          className={`relative flex w-full max-w-sm max-h-[90vh] flex-col bg-[#16161a] ring-1 ring-white/5 rounded-lg shadow-xl m-4
                      transition-all duration-300 ease-out-expo transform-gpu 
                      ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          // For 'ease-out-expo', you might need to add it to your `tailwind.config.js`
          // e.g., theme: { extend: { transitionTimingFunction: { 'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)' } } }
        >
          {/* Header - More engaging title and close button */}
          <div className="flex items-center justify-between border-b border-white/10 p-4 shadow-md bg-[#1d1d21] rounded-t-lg">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#bd34fe]">
              <FaRocket className="text-2xl" /> Stay Updated!
            </h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/50" 
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          {/* Content Area - Engaging text and form */}
          <div className="flex-grow p-6 relative overflow-y-auto"> {/* Added overflow-y-auto for scrollable content if modal is too tall */}
            {/* Subtle background element (can be an SVG/image for more visual flair) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
                <FaHandPointRight className="text-[12rem] text-[#bd34fe]" style={{ transform: 'rotate(-20deg)' }} />
            </div>

            <p className="mb-6 text-base text-gray-300 relative z-10">
              Unlock exclusive insights, project updates, and development tips directly in your inbox. Don't miss out!
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <div>
                <label htmlFor="email-flyout" className="mb-2 block text-sm font-medium text-gray-200">Email Address</label>
                <input 
                  type="email" 
                  id="email-flyout" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="block w-full rounded-md border border-gray-700 bg-gray-900 py-2.5 px-4 text-white shadow-sm 
                             placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bd34fe] focus:border-transparent transition-all duration-200" 
                  placeholder="your-best-email@example.com" 
                  disabled={loading || submissionStatus === 'success'} // Disable input while loading or on success
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading || submissionStatus === 'success'} // Disable button while loading or on success
                className="rounded-md bg-[#bd34fe] px-4 py-2.5 text-base font-semibold text-white shadow-lg shadow-[#bd34fe]/30 
                           hover:bg-[#a020f0] active:scale-95 transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <FaSpinner className="animate-spin" />}
                {submissionStatus === 'success' ? 'Subscribed!' : 'Subscribe Now'}
              </button>

              {submissionStatus === 'success' && (
                <p className="mt-3 text-sm text-green-400 flex items-center gap-2">
                  <span className="animate-pulse">✨</span> You're all set! Thanks for subscribing.
                </p>
              )}
              {submissionStatus === 'error' && (
                <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
                  <span className="text-xl">⚠️</span> Oops! Something went wrong. Please try again.
                </p>
              )}
            </form>

            {/* WhatsApp Contact Section */}
            <div className="mt-8 pt-4 border-t border-white/10 text-center relative z-10">
                <p className="mb-4 text-gray-300">Prefer to chat directly?</p>
                <a
                  href="https://wa.me/YOUR_PHONE_NUMBER?text=Hello! I'm interested in your updates and projects." // <<< REMEMBER TO REPLACE YOUR_PHONE_NUMBER
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-green-600/30
                             hover:bg-green-700 active:scale-95 transition-all duration-200"
                >
                  <FaWhatsapp className="h-5 w-5" /> Chat on WhatsApp
                </a>
                <p className="mt-2 text-xs text-gray-400">
                </p>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FlyOutMenu;