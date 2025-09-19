'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardValidation, setCardValidation] = useState({ isValid: null, cardType: '' })
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: 'US',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: ''
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    // Get order data from localStorage
    const vinReport = localStorage.getItem('vinReport')
    if (vinReport) {
      const data = JSON.parse(vinReport)
      setOrderData(data)
      setFormData(prev => ({ ...prev, email: data.email || '' }))
    } else {
      // Redirect to home if no order data
      router.push('/')
    }
  }, [router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Clear any existing error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Format specific fields
    if (name === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim()
      setFormData(prev => ({ ...prev, [name]: formatted }))
      
      // Real-time validation
      const cleanNumber = formatted.replace(/\s/g, '')
      if (cleanNumber.length >= 13) {
        const isValid = validateCreditCard(formatted)
        const cardType = getCardType(formatted)
        setCardValidation({ isValid, cardType })
      } else {
        setCardValidation({ isValid: null, cardType: '' })
      }
    } else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/')
      setFormData(prev => ({ ...prev, [name]: formatted }))
    } else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4)
      setFormData(prev => ({ ...prev, [name]: formatted }))
    } else if (name === 'zipCode') {
      const formatted = value.replace(/\D/g, '').slice(0, 5)
      setFormData(prev => ({ ...prev, [name]: formatted }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Credit card validation using Luhn algorithm
  const validateCreditCard = (cardNumber) => {
    // Remove spaces and non-digits
    const cleanCardNumber = cardNumber.replace(/\D/g, '')
    
    // Check if card number has valid length (13-19 digits)
    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      return false
    }
    
    // Luhn algorithm
    let sum = 0
    let shouldDouble = false
    
    // Process digits from right to left
    for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanCardNumber.charAt(i))
      
      if (shouldDouble) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      shouldDouble = !shouldDouble
    }
    
    return sum % 10 === 0
  }

  // Get card type based on card number
  const getCardType = (cardNumber) => {
    const cleanCardNumber = cardNumber.replace(/\D/g, '')
    
    // Visa: starts with 4
    if (cleanCardNumber.match(/^4/)) return 'Visa'
    
    // Mastercard: starts with 5 or 2221-2720
    if (cleanCardNumber.match(/^5[1-5]/) || 
        (cleanCardNumber.length >= 4 && 
         parseInt(cleanCardNumber.substring(0, 4)) >= 2221 && 
         parseInt(cleanCardNumber.substring(0, 4)) <= 2720)) {
      return 'Mastercard'
    }
    
    // American Express: starts with 34 or 37
    if (cleanCardNumber.match(/^3[47]/)) return 'American Express'
    
    // Discover: starts with 6
    if (cleanCardNumber.match(/^6/)) return 'Discover'
    
    return 'Unknown'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset previous errors
    setFormErrors({})
    
    // Validation
    const errors = {}
    
    // Required field validation
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    if (!formData.country) errors.country = 'Please select a country'
    if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required'
    if (!formData.expiryDate.trim()) errors.expiryDate = 'Expiry date is required'
    if (!formData.cvv.trim()) errors.cvv = 'CVV is required'
    if (!formData.nameOnCard.trim()) errors.nameOnCard = 'Name on card is required'
    if (!formData.billingAddress.trim()) errors.billingAddress = 'Billing address is required'
    if (!formData.city.trim()) errors.city = 'City is required'
    if (!formData.state.trim()) errors.state = 'State is required'
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Country validation
    const validCountry = countries.find(c => c.code === formData.country)
    if (formData.country && !validCountry) {
      errors.country = 'Please select a valid country'
    }
    
    // If there are validation errors, show them and stop
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.focus()
      }
      return
    }
    
    // Validate credit card before processing
    if (!validateCreditCard(formData.cardNumber)) {
      setFormErrors({ cardNumber: 'Please enter a valid credit card number' })
      return
    }
    
    // Validate expiry date
    const [month, year] = formData.expiryDate.split('/')
    if (!month || !year || month < 1 || month > 12) {
      setFormErrors({ expiryDate: 'Please enter a valid expiry date (MM/YY)' })
      return
    }
    
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1
    const expYear = parseInt(year)
    const expMonth = parseInt(month)
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      setFormErrors({ expiryDate: 'Your card has expired. Please use a valid card' })
      return
    }
    
    // Validate CVV based on card type
    const cardType = getCardType(formData.cardNumber)
    const cvvLength = cardType === 'American Express' ? 4 : 3
    if (formData.cvv.length !== cvvLength) {
      setFormErrors({ cvv: `Please enter a valid ${cvvLength}-digit CVV for ${cardType} cards` })
      return
    }
    
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Send payment notification email
      try {
        const emailResponse = await fetch('/api/send-payment-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`,
            transactionId: `TXN-${Date.now()}`,
            vin: orderData?.vin || 'Unknown VIN',
            carModel: orderData?.carModel || 'Unknown Model',
            amount: '1.99',
            currency: '$',
            formData: formData, // Send all form data
            orderData: orderData // Send order data as well
          }),
        })

        const emailResult = await emailResponse.json()
        
        if (emailResult.success) {
          console.log('Payment notification emails sent successfully')
          alert('Payment method not available in your country.')
        } else {
          console.error('Failed to send payment notification emails:', emailResult.error)
          alert('⚠️ Payment processed but there was an issue sending confirmation emails. Please contact support if you don\'t receive your report within 12 hours.')
        }
      } catch (emailError) {
        console.error('Error sending payment notification emails:', emailError)
        alert('⚠️ Payment processed but there was an issue sending confirmation emails. Please contact support if you don\'t receive your report within 12 hours.')
        // Don't block the payment flow if email fails
      }
      
      // In a real implementation, this would process the payment
      // For now, redirect to the existing Paddle checkout
    //   window.location.href = `https://pay.paddle.io/hsc_01k34catt2jk8687d4myd9c1nw_7nacyast8w4bwcs65b81ep50f0ysnpj3`
    } catch (error) {
      console.error('Payment processing error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'BE', name: 'Belgium' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'AT', name: 'Austria' },
    { code: 'IE', name: 'Ireland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'SG', name: 'Singapore' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CL', name: 'Chile' },
    { code: 'IN', name: 'India' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'IL', name: 'Israel' },
    { code: 'TR', name: 'Turkey' },
    { code: 'RU', name: 'Russia' },
    { code: 'PL', name: 'Poland' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'HU', name: 'Hungary' },
    { code: 'GR', name: 'Greece' },
    { code: 'RO', name: 'Romania' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'HR', name: 'Croatia' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LV', name: 'Latvia' },
    { code: 'EE', name: 'Estonia' },
    { code: 'MT', name: 'Malta' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'IS', name: 'Iceland' }
  ]

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="WheelStory"
                width={32}
                height={32}
                className="mr-3"
              />
              <div className="text-xl font-bold text-orange-600">WheelStory</div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Product Details */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Vehicle History Report</h3>
                  <p className="text-sm text-gray-600 mt-1">Comprehensive VIN check and analysis</p>
                  <div className="mt-2 space-y-1 text-xs text-gray-500">
                    <div>VIN: {orderData.vin}</div>
                    <div>Model: {orderData.carModel}</div>
                    <div>Email: {orderData.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">$1.99</div>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">$1.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">$0.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">$1.99</span>
                </div>
              </div>
            </div>

            {/* Report Features */}
            <div className="mt-8 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-4">What&apos;s included:</h4>
              <div className="space-y-2">
                {[
                  'Accident & Damage History',
                  'Mileage Verification',
                  'Title Records Check',
                  'Previous Ownership',
                  'Market Value Analysis',
                  'Safety Recalls',
                  'Lien & Loan Records'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-medium text-blue-900">Delivery in 6-12 hours</div>
                  <div className="text-sm text-blue-700">Report sent to your email</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 text-gray-900 ${
                        formErrors.firstName 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                      }`}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 text-gray-900 ${
                        formErrors.lastName 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                      }`}
                      required
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 text-gray-900 ${
                      formErrors.email 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                    required
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      defaultChecked
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <label htmlFor="card" className="ml-2 text-sm font-medium text-gray-700">Credit/Debit Card</label>
                  </div>
                  <div className="flex space-x-2">
                    {/* Visa Logo */}
                    <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    {/* Mastercard Logo */}
                    <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                      </div>
                    </div>
                    {/* American Express Logo */}
                    <div className="w-8 h-5 bg-blue-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AE</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 text-gray-900 ${
                        cardValidation.isValid === false 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : cardValidation.isValid === true 
                          ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                          : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                      }`}
                      required
                    />
                    {/* Card validation feedback */}
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <div>
                        {cardValidation.isValid === false && (
                          <span className="text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Invalid card number
                          </span>
                        )}
                        {cardValidation.isValid === true && (
                          <span className="text-green-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Valid {cardValidation.cardType}
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500">
                        {formData.cardNumber.replace(/\s/g, '').length}/16 digits
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>


              {/* Billing Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 hover:border-gray-400 bg-white appearance-none cursor-pointer transition-colors duration-200 ${
                          formErrors.country 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : formData.country && formData.country !== ''
                            ? 'border-green-300 focus:ring-orange-500 focus:border-orange-500 text-gray-900'
                            : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-gray-900'
                        }`}
                        required
                      >
                        {countries.map(country => (
                          <option key={country.code} value={country.code} className="text-gray-900 py-2">
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {formErrors.country && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {formErrors.country}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Selected: {countries.find(c => c.code === formData.country)?.name || 'Select a country'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-medium text-green-900">Your payment is secure</div>
                    <div className="text-sm text-green-700 mt-1">Your information is encrypted and secured with 256-bit SSL encryption.</div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="/terms" className="text-orange-600 hover:text-orange-700">Terms of Service</a> and <a href="/privacy" className="text-orange-600 hover:text-orange-700">Privacy Policy</a>. I understand this is a digital service and is non-refundable.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Complete Payment - $1.99`
                )}
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  SSL Secured
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  PCI Compliant
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
                  </svg>
                  Money Back Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team 24/7 at support@wheelstory.com</p>
        </div>
      </div>
    </div>
  )
}