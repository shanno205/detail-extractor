'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function App() {
  const [vinInput, setVinInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [carModelInput, setCarModelInput] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Function to scroll to VIN input section
  const scrollToVinInput = () => {
    const vinSection = document.getElementById('vin-input-section')
    if (vinSection) {
      vinSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
      // Focus on the input field after scrolling
      setTimeout(() => {
        const vinInputField = document.getElementById('vin-input-field')
        if (vinInputField) {
          vinInputField.focus()
        }
      }, 500)
    }
  }

  // Function to handle VIN submission
  const handleVinSubmit = async (e) => {
    e.preventDefault()

    if (vinInput.trim().length !== 17) {
      alert('Please enter a valid 17-character VIN number')
      return
    }

    if (!emailInput.trim() || !emailInput.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    if (!carModelInput.trim()) {
      alert('Please enter the car model')
      return
    }

    setIsSubmitting(true)

    try {
      // Store form data in localStorage for the checkout page
      localStorage.setItem('vinReport', JSON.stringify({
        vin: vinInput.trim(),
        email: emailInput.trim(),
        carModel: carModelInput.trim(),
        timestamp: new Date().toISOString()
      }))

      // Redirect to checkout page
      window.location.href = '/checkout'
    } catch (error) {
      console.error('Error storing data:', error)
      alert('Error: Failed to process request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to validate VIN input
  const handleVinChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    setVinInput(value)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="WheelStory - Vehicle History Reports"
                width={40}
                height={40}
                className="mr-3"
              />
              <div className="text-2xl font-bold text-orange-600">WheelStory</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
              <button
                onClick={scrollToVinInput}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Get Report
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
                <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
                <button
                  onClick={scrollToVinInput}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors w-fit"
                >
                  Get Report
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                WheelStory: Uncover the full story of your<br />
                <span className="text-orange-600">future or current car</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl">
                Welcome to WheelStory - the most trusted source for vehicle history reports. Avoid scams, overpaying, or unsafe vehicles. Get a comprehensive car history report with accident records, mileage verification, title checks, and market analysis in just a few hours.
              </p>

              {/* VIN Input Form */}
              <div id="vin-input-section" className="max-w-2xl mx-auto lg:mx-0 bg-white p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleVinSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        id="vin-input-field"
                        type="text"
                        placeholder="Enter VIN number (17 characters)"
                        value={vinInput}
                        onChange={handleVinChange}
                        className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
                        maxLength={17}
                        required
                      />
                      <div className="mt-2 flex justify-between items-center text-sm">
                        <span className={`${vinInput.length === 17 ? 'text-green-600' : 'text-gray-500'}`}>
                          {vinInput.length}/17 characters
                        </span>
                        {vinInput.length > 0 && vinInput.length < 17 && (
                          <span className="text-red-500">VIN must be exactly 17 characters</span>
                        )}
                        {vinInput.length === 17 && (
                          <span className="text-green-600">✓ Valid length</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
                      required
                    />
                    <div className="mt-1 text-sm text-gray-500">
                      Your vehicle history report will be sent to this email
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Enter car model (e.g., Honda Civic, BMW X5, Toyota Camry)"
                      value={carModelInput}
                      onChange={(e) => setCarModelInput(e.target.value)}
                      className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
                      required
                    />
                    <div className="mt-1 text-sm text-gray-500">
                      Help us provide more accurate information about your vehicle
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={vinInput.length !== 17 || !emailInput.trim() || !carModelInput.trim() || isSubmitting}
                    className="w-full bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get report'}
                  </button>
                </form>
                <button className="text-orange-600 hover:text-orange-700 mt-4 text-sm underline">
                  Don&apos;t have a VIN?
                </button>

                <div className="mt-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-3">We check:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Damage history
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Mileage rollbacks
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Title records
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Specs & equipment
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Market value
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Safety and recalls
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Natural disasters
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      and more...
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                    <div className="mb-2 sm:mb-0">
                      <strong className="text-gray-900">Price: $1.99 per report </strong>
                    </div>
                    <div className="mb-2 sm:mb-0">
                      <strong className="text-gray-900">Delivery time:</strong> Within 6–12 hours
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    This is a digital service and is strictly non-refundable.
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src="/card-stack.webp"
                  alt="Vehicle History Report Cards"
                  width={512}
                  height={400}
                  className="w-full max-w-lg h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                {/* Optional overlay with floating elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-semibold">✓ Trusted</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-semibold">$1.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Check Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What WheelStory checks when preparing your vehicle history report
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              WheelStory reports are powered by a global automotive data network, covering over 1 billion data points across thousands of vehicles. Our comprehensive VIN check service ensures you get accurate, reliable information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Damage",
                description: "No one wants to invest in a car with hidden damage or past collisions. Knowing this helps avoid repair costs and safety risks.",
                icon: "🔧"
              },
              {
                title: "Mileage rollbacks",
                description: "Odometer fraud is more common than you think. We verify mileage history to ensure you are getting what you pay for.",
                icon: "📊"
              },
              {
                title: "Specs & equipment",
                description: "Get detailed information about the vehicle specifications, equipment, and features to make an informed decision.",
                icon: "⚙️"
              },
              {
                title: "Title checks",
                description: "Verify ownership history and check for any title issues that could affect the vehicle value or legality.",
                icon: "📋"
              },
              {
                title: "Safety & recalls",
                description: "Stay informed about any safety recalls or issues that could pose a risk to you and your passengers.",
                icon: "🛡️"
              },
              {
                title: "Natural disaster",
                description: "Find out if the vehicle has been damaged by floods, hurricanes, or other natural disasters that could cause long-term issues.",
                icon: "🌪️"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choose Wisely Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose wisely with WheelStory
            </h2>
            <p className="text-xl text-gray-600">
              Make a confident car buying decision with the help of a comprehensive WheelStory vehicle history report.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Avoid expensive mistakes",
                description: "Uncover the full car history before making a purchase. Do not fall for cosmetic fixes hiding deeper issues.",
                icon: "💰"
              },
              {
                title: "Save precious time",
                description: "No need for long investigations or guesswork. Just enter a VIN and get reliable insights in hours.",
                icon: "⏰"
              },
              {
                title: "Negotiate a better deal",
                description: "Use the data from our report to strengthen your position and get a fair deal, or walk away from a bad one.",
                icon: "🤝"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hear from people who trust WheelStory
            </h2>
            <p className="text-xl text-gray-600">
              See how real customers are making better car decisions with WheelStory vehicle history reports:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Very reassuring before buying a used vehicle. WheelStory provided a detailed and accurate report.",
                author: "JC",
                verified: true
              },
              {
                quote: "Slightly pricey, but saved me from a huge mistake. The mileage was tampered, and WheelStory caught it.",
                author: "Sasha",
                verified: true
              },
              {
                quote: "Everything matched perfectly. WheelStory helped me catch an odometer fraud I would never have noticed.",
                author: "Rolando",
                verified: true
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 font-semibold">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    {testimonial.verified && (
                      <div className="text-sm text-green-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified review
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car History Report Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            WheelStory - Complete Car History Reports
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Avoid unexpected costs and problems with our comprehensive vehicle history reports. Enter your VIN now and get a full car report delivered to your email from WheelStory.
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleVinSubmit} className="space-y-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter VIN number (17 characters)"
                  value={vinInput}
                  onChange={handleVinChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
                  maxLength={17}
                  required
                />
                <div className="mt-2 text-sm text-gray-600">
                  {vinInput.length}/17 characters
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
                  required
                />
                <div className="mt-1 text-sm text-gray-600">
                  Your vehicle history report will be sent to this email
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter car model (e.g., Honda Civic, BMW X5, Toyota Camry)"
                  value={carModelInput}
                  onChange={(e) => setCarModelInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
                  required
                />
                <div className="mt-1 text-sm text-gray-600">
                  Help us provide more accurate information about your vehicle
                </div>
              </div>

              <button
                type="submit"
                disabled={vinInput.length !== 17 || !emailInput.trim() || !carModelInput.trim() || isSubmitting}
                className="w-full bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Get report'}
              </button>
            </form>
            <button className="text-orange-600 hover:text-orange-700 text-sm underline mb-6">
              I don&apos;t have a VIN
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">One-time fee: $1.99</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">Report delivered within 6–12 hours</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">Verified sources</div>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              Please note: All purchases are final. This service is non-refundable.
            </div>
          </div>
        </div>
      </section>

      {/* Global Coverage Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              WheelStory: Leading the way in automotive data
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since 2020, WheelStory has expanded to over 35 international markets. We pull data from 900+ trusted sources, including national vehicle registries, insurance records, law enforcement, and government agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">North America</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇺🇸</span>
                  <span className="text-gray-700">United States</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇲🇽</span>
                  <span className="text-gray-700">Mexico</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Europe</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇬🇧</span>
                  <span className="text-gray-700">United Kingdom</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇱🇹</span>
                  <span className="text-gray-700">Lithuania</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇪🇪</span>
                  <span className="text-gray-700">Estonia</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇱🇻</span>
                  <span className="text-gray-700">Latvia</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇵🇱</span>
                  <span className="text-gray-700">Poland</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇷🇴</span>
                  <span className="text-gray-700">Romania</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇭🇺</span>
                  <span className="text-gray-700">Hungary</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">More Europe</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇫🇷</span>
                  <span className="text-gray-700">France</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇺🇦</span>
                  <span className="text-gray-700">Ukraine</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇸🇪</span>
                  <span className="text-gray-700">Sweden</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇧🇪</span>
                  <span className="text-gray-700">Belgium</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇨🇿</span>
                  <span className="text-gray-700">Czech Republic</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇭🇷</span>
                  <span className="text-gray-700">Croatia</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇧🇬</span>
                  <span className="text-gray-700">Bulgaria</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Regions</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇦🇺</span>
                  <span className="text-gray-700">Australia</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇳🇿</span>
                  <span className="text-gray-700">New Zealand</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇿🇦</span>
                  <span className="text-gray-700">South Africa</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🇦🇪</span>
                  <span className="text-gray-700">United Arab Emirates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How WheelStory Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get comprehensive vehicle history reports from WheelStory in just three simple steps. Our advanced system processes data from hundreds of sources to give you the complete picture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Enter VIN Number",
                description: "Simply enter the 17-character Vehicle Identification Number (VIN) of the car you are interested in. You can find this on the dashboard, driver side door, or vehicle documents.",
                icon: "🔤"
              },
              {
                step: "02",
                title: "We Scan Our Database",
                description: "Our system instantly searches through over 1 billion data points across 900+ trusted sources including DMV records, insurance databases, and auction houses.",
                icon: "🔍"
              },
              {
                step: "03",
                title: "Receive Detailed Report",
                description: "Within 6-12 hours, you will receive a comprehensive report via email containing all the critical information about the vehicles history and condition.",
                icon: "📧"
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <div className="flex items-center">
                      <div className="w-full h-0.5 bg-gray-300"></div>
                      <svg className="w-6 h-6 text-gray-300 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              WheelStory Comprehensive Vehicle Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our reports cover every aspect of a vehicle&apos;s history. Here&apos;s what makes WheelStory the most trusted choice for vehicle history reports and VIN checks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Accident & Damage History</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Collision Reports",
                    description: "Detailed information about any reported accidents, including severity and repair estimates."
                  },
                  {
                    title: "Structural Damage",
                    description: "Frame damage, airbag deployments, and other critical safety-related incidents."
                  },
                  {
                    title: "Flood Damage",
                    description: "Water damage from hurricanes, floods, or other natural disasters that could cause long-term issues."
                  },
                  {
                    title: "Fire Damage",
                    description: "Any reported fire incidents that may have affected the vehicle electrical or mechanical systems."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🚗💥</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Sample Damage Report</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Accident Date:</span>
                  <span className="font-semibold">March 15, 2023</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Damage Type:</span>
                  <span className="font-semibold text-red-600">Front Impact</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Airbag Deployed:</span>
                  <span className="font-semibold text-red-600">Yes</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Estimated Cost:</span>
                  <span className="font-semibold">$8,500</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Vehicle Totaled:</span>
                  <span className="font-semibold text-green-600">No</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ownership History Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👥</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Ownership Timeline</h4>
              </div>
              <div className="space-y-4">
                {[
                  { year: "2020-2022", owner: "John Smith", state: "California", type: "Personal Use" },
                  { year: "2022-2024", owner: "ABC Rental Corp", state: "Nevada", type: "Fleet/Rental" },
                  { year: "2024-Present", owner: "Current Owner", state: "Texas", type: "Personal Use" }
                ].map((owner, index) => (
                  <div key={index} className="flex items-center py-3 border-b last:border-b-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4 text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{owner.owner}</div>
                      <div className="text-sm text-gray-600">{owner.year} • {owner.state} • {owner.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ownership & Title History</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Previous Owners",
                    description: "Complete ownership chain from the first owner to the current one, including lease and fleet history."
                  },
                  {
                    title: "Title Issues",
                    description: "Any liens, salvage titles, flood titles, or other title brands that could affect the vehicle value."
                  },
                  {
                    title: "Registration History",
                    description: "States where the vehicle has been registered and duration of registration in each location."
                  },
                  {
                    title: "Usage Type",
                    description: "Whether the vehicle was used commercially, as a rental, taxi, police vehicle, or for personal use."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Value Analysis */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Know the Real Market Value with WheelStory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our market analysis helps you understand if you&apos;re getting a fair deal. WheelStory compares similar vehicles and factors in the vehicle&apos;s history to give you accurate pricing information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Price Range</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Excellent Condition:</span>
                  <span className="font-semibold text-green-600">$25,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Good Condition:</span>
                  <span className="font-semibold text-orange-600">$22,800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fair Condition:</span>
                  <span className="font-semibold text-orange-600">$19,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Poor Condition:</span>
                  <span className="font-semibold text-red-600">$15,500</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Depreciation Analysis</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Original MSRP:</span>
                  <span className="font-semibold">$32,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Value:</span>
                  <span className="font-semibold text-orange-600">$22,800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Depreciation:</span>
                  <span className="font-semibold text-red-600">-28.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Rate:</span>
                  <span className="font-semibold text-orange-600">-9.6%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Price Recommendation</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">$21,500 - $24,000</div>
                    <div className="text-sm text-green-700">Recommended Price Range</div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Based on vehicle history, market conditions, and comparable sales
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Recognition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              WheelStory Industry Recognition &amp; Awards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              WheelStory has been recognized by leading automotive organizations and has received numerous awards for our comprehensive reporting and customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                award: "Best Vehicle History Provider",
                year: "2024",
                organization: "Automotive Excellence Awards",
                icon: "🏆"
              },
              {
                award: "Customer Choice Award",
                year: "2023",
                organization: "Consumer Reports",
                icon: "⭐"
              },
              {
                award: "Innovation in Data Analytics",
                year: "2023",
                organization: "Tech Innovation Summit",
                icon: "💡"
              },
              {
                award: "Trusted Service Provider",
                year: "2022",
                organization: "Better Business Bureau",
                icon: "🛡️"
              }
            ].map((award, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">{award.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{award.award}</h3>
                <div className="text-orange-600 font-medium mb-1">{award.year}</div>
                <div className="text-sm text-gray-600">{award.organization}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions about WheelStory
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We&apos;ve got answers. Here are the most common questions about our vehicle history reports and VIN check services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How accurate are WheelStory reports?",
                answer: "Our reports are highly accurate as we source data from over 900 trusted databases including DMV records, insurance companies, auction houses, and government agencies. However, we recommend using our reports as one factor in your decision-making process."
              },
              {
                question: "What if I don't have the VIN number?",
                answer: "If you don't have the VIN, you can usually find it on the dashboard visible through the windshield, on the driver side door frame, or in the vehicle documentation. WheelStory also offers assistance in locating VIN numbers for specific vehicles."
              },
              {
                question: "How long does it take to receive my WheelStory report?",
                answer: "Most reports are delivered within 1-2 hours via email. However, we allow up to 6-12 hours for delivery to account for any technical delays or complex data compilation requirements."
              },
              {
                question: "Can I get a refund if I'm not satisfied with my WheelStory report?",
                answer: "WheelStory is a digital service and all sales are final. We do not offer refunds as the report is delivered immediately upon purchase. Please ensure you enter the correct VIN before purchasing."
              },
              {
                question: "Do WheelStory reports cover vehicles from all countries?",
                answer: "We currently cover vehicles from over 35 countries across North America, Europe, Oceania, Africa, and the Middle East. Our coverage is continuously expanding to include more international markets."
              },
              {
                question: "What makes WheelStory different from competitors?",
                answer: "WheelStory offers the most comprehensive database with over 1 billion data points, faster delivery times, 24/7 customer support, and competitive pricing. We also provide market value analysis and detailed damage assessments."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Security & Privacy Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We take data security and customer privacy seriously. Your information is protected with enterprise-grade security measures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "SSL Encryption",
                description: "All data transmission is secured with 256-bit SSL encryption to protect your personal information.",
                icon: "🔒"
              },
              {
                title: "No Data Storage",
                description: "We do not store your VIN searches or personal information after report delivery.",
                icon: "🗑️"
              },
              {
                title: "GDPR Compliant",
                description: "Fully compliant with European data protection regulations and privacy laws.",
                icon: "📋"
              },
              {
                title: "Secure Payments",
                description: "Payment processing through trusted, PCI-compliant payment processors.",
                icon: "💳"
              }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Report Preview */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See What You Get in Every WheelStory Report
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every WheelStory report is comprehensive and easy to understand. Here&apos;s a preview of what information you&apos;ll receive from our vehicle history service.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Vehicle Information Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Make & Model:</span>
                  <span className="font-semibold">Honda Accord EX</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-semibold">2021</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Engine:</span>
                  <span className="font-semibold">1.5L Turbo 4-Cyl</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Transmission:</span>
                  <span className="font-semibold">CVT Automatic</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Drivetrain:</span>
                  <span className="font-semibold">Front Wheel Drive</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Fuel Type:</span>
                  <span className="font-semibold">Gasoline</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Body Style:</span>
                  <span className="font-semibold">4-Door Sedan</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">History Summary</h3>
              <div className="space-y-4">
                {[
                  { category: "Accident History", status: "Clean", color: "green" },
                  { category: "Flood Damage", status: "None Reported", color: "green" },
                  { category: "Odometer Issues", status: "None Detected", color: "green" },
                  { category: "Previous Owners", status: "2 Previous Owners", color: "blue" },
                  { category: "Service Records", status: "Well Maintained", color: "green" },
                  { category: "Recalls", status: "1 Open Recall", color: "yellow" },
                  { category: "Title Issues", status: "Clean Title", color: "green" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <span className="text-gray-600">{item.category}:</span>
                    <span className={`font-semibold ${item.color === 'green' ? 'text-green-600' :
                        item.color === 'yellow' ? 'text-yellow-600' :
                          item.color === 'red' ? 'text-red-600' : 'text-orange-600'
                      }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={scrollToVinInput}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg"
            >
              Get Your Complete WheelStory Report Now
            </button>
            <p className="mt-4 text-gray-600">Sample report - Actual WheelStory reports contain much more detailed information</p>
          </div>
        </div>
      </section>

      {/* Blog/Resources Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Car Buying Tips & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with our latest articles and guides on vehicle purchasing, maintenance, and industry insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Red Flags When Buying a Used Car",
                excerpt: "Learn the warning signs that could save you thousands of dollars and keep you safe on the road.",
                date: "August 15, 2025",
                readTime: "5 min read",
                category: "Buying Guide"
              },
              {
                title: "Understanding Vehicle History Reports",
                excerpt: "A comprehensive guide to reading and interpreting vehicle history reports for better decision making.",
                date: "August 12, 2025",
                readTime: "7 min read",
                category: "Education"
              },
              {
                title: "Electric Vehicle Market Trends 2025",
                excerpt: "Explore the latest trends in electric vehicle adoption and what it means for the used car market.",
                date: "August 10, 2025",
                readTime: "6 min read",
                category: "Industry News"
              }
            ].map((article, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">{article.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <button className="mt-4 text-orange-600 hover:text-orange-700 font-medium">Read More →</button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg hover:bg-orange-600 hover:text-white transition-colors font-semibold">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need help?
            </h2>
            <h3 className="text-2xl text-orange-600 mb-4">We are here for you 24/7</h3>
            <p className="text-xl text-gray-600">
              Our support team is always available to help with your queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "97%",
                label: "satisfaction rate",
                icon: "😊"
              },
              {
                number: "24/7",
                label: "customer support",
                icon: "🎧"
              },
              {
                number: "12-24h",
                label: "Avg. response time",
                icon: "⏱️"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">{item.number}</div>
                <div className="text-gray-600 font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-orange-50 p-8 rounded-lg">
            <p className="text-gray-700 text-center max-w-4xl mx-auto">
              WheelStory is a non-refundable digital service. Reports are usually delivered within 1 hour via email. However, we mention a 6–12 hour delivery window to account for any rare delays or technical issues. Please ensure your VIN is entered correctly before purchase, as incorrect entries will still result in full report delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <Image
                src="/logo.png"
                alt="WheelStory"
                width={32}
                height={32}
                className="mr-3"
              />
              <div className="text-2xl font-bold text-orange-400">WheelStory</div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-orange-400 transition-colors">Terms & Conditions</a>
              <a href="/refund" className="hover:text-orange-400 transition-colors">Refund Policy</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2015 WheelStory. All rights reserved. | Vehicle History Reports & VIN Checks
          </div>
        </div>
      </footer>

      {/* Cart Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
        </button>
      </div>

      {/* SEO Content for Search Engines */}
      <div className="sr-only">
        <h1>WheelStory - Vehicle History Reports and VIN Checks</h1>
        <p>WheelStory offers comprehensive vehicle history reports, VIN number checks, car history reports, auto history verification, used car reports, vehicle records analysis, accident history checks, mileage verification services, title record checks, automotive history reports, vehicle inspection reports, car buying assistance, and detailed vehicle analysis. Trust WheelStory for all your vehicle history needs.</p>
        <p>Keywords: WheelStory, histori vin store, vehicle history report, VIN check, car history, auto history report, used car report, vehicle records, accident history, mileage verification, title check, car buying, automotive history, vehicle inspection, histori vin, WheelStory store, vin reports, car reports, auto reports</p>
      </div>
    </div>
  )
}
