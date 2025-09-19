import * as React from 'react';

export default function PaymentSuccessEmailTemplate({ customerEmail, customerName, transactionId, productName, amount, currency }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#333' }}>
      <h2 style={{ color: '#16a34a' }}>Payment Successful! 🎉</h2>
      <p>
        Hello {customerName},
      </p>
      <p>
        Thank you for your payment! We have successfully received your payment for the <strong>{productName}</strong>.
      </p>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '16px', 
        borderRadius: '8px', 
        margin: '20px 0',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ color: '#333', marginTop: '0' }}>Payment Details:</h3>
        <p><strong>Transaction ID:</strong> {transactionId}</p>
        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Amount:</strong> {currency} {amount}</p>
        <p><strong>Email:</strong> {customerEmail}</p>
      </div>

      <h3 style={{ color: '#333' }}>What happens next?</h3>
      <ul style={{ lineHeight: '1.6' }}>
        <li>Your vehicle history report is now being prepared</li>
        <li>You will receive your detailed report within the next <strong>12 hours</strong></li>
        <li>The report will be sent to this email address: <strong>{customerEmail}</strong></li>
        <li>If you don't receive it within 12 hours, please check your spam folder</li>
      </ul>

      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '16px', 
        borderRadius: '8px', 
        margin: '20px 0',
        border: '1px solid #16a34a'
      }}>
        <p style={{ margin: '0', fontWeight: 'bold', color: '#16a34a' }}>
          ✅ Your payment has been processed successfully and your report is being prepared!
        </p>
      </div>

      <p>
        If you have any questions or need assistance, please don't hesitate to contact us at 
        <a href="mailto:support@wheelstory.store" style={{ color: '#16a34a' }}> support@wheelstory.store</a>
      </p>

      <p>Thank you for choosing WheelStory!</p>
      
      <p>Best regards,<br/>The WheelStory Team</p>
    </div>
  );
}
