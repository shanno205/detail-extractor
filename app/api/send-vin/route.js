import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('=== EMAIL API CALLED ===');
    
    const { vin, email, carModel } = await request.json();
    // console.log('Received data:', { vin, email, carModel });

    // Validate input
    if (!vin || !email || !carModel) {
      console.log('❌ Missing VIN, email, or car model');
      return NextResponse.json(
        { success: false, message: 'VIN, email, and car model are required' },
        { status: 400 }
      );
    }

    if (vin.length !== 17) {
      console.log('❌ Invalid VIN length:', vin.length);
      return NextResponse.json(
        { success: false, message: 'VIN must be exactly 17 characters' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // console.log('=== EMAIL CONFIGURATION TEST ===');
    // console.log('EMAIL_USER:', process.env.EMAIL_USER);
    // console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length || 0);
    // console.log('EMAIL_PASS preview:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.substring(0, 4) + '****' : 'MISSING');

    // Check for email credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('❌ Missing email credentials');
      return NextResponse.json({
        success: false,
        error: 'Missing email credentials',
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS
      }, { status: 500 });
    }

    // Create transporter
    console.log('Creating email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
      },
    });

    // Test the connection first
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Current timestamp
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Send notification email to admin
    const adminInfo = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ['car.check.store@gmail.com'],
      subject: `New VIN Report Request - ${vin} (${carModel})`,
      text: `
New VIN Report Request Received

VIN Number: ${vin}
Car Model: ${carModel}
Customer Email: ${email}
Request Time: ${formattedDate}

Please process this request and send the vehicle history report to the customer.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #ea580c; margin: 0;">New VIN Report Request</h2>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-top: 0;">Request Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">VIN Number:</td>
                <td style="padding: 8px 0; color: #6b7280; font-family: monospace; letter-spacing: 1px;">${vin}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Car Model:</td>
                <td style="padding: 8px 0; color: #6b7280;">${carModel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Customer Email:</td>
                <td style="padding: 8px 0; color: #6b7280;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Request Time:</td>
                <td style="padding: 8px 0; color: #6b7280;">${formattedDate}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please process this VIN report request and send the complete vehicle history report to the customer's email address.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This is an automated notification from WheelStory
            </p>
          </div>
        </div>
      `,
    });

    console.log('✅ Admin notification sent successfully:', adminInfo.messageId);

    return NextResponse.json({ 
      success: true,
      message: 'VIN report request submitted successfully. You will receive your report within 6-12 hours.',
      adminMessageId: adminInfo.messageId,
      timestamp: timestamp
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    let errorDetails = {
      message: error.message,
      code: error.code,
      command: error.command
    };

    // Common error explanations
    let explanation = '';
    if (error.code === 'EAUTH') {
      explanation = 'Authentication failed. Check if you are using an App Password instead of your regular Gmail password.';
    } else if (error.code === 'ESOCKET') {
      explanation = 'Network connection failed. This might be a temporary issue.';
    } else if (error.message?.includes('Invalid login')) {
      explanation = 'Invalid credentials. Make sure EMAIL_USER is your full Gmail address and EMAIL_PASS is a valid App Password.';
    }

    return NextResponse.json({ 
      success: false,
      error: errorDetails,
      explanation,
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      emailUserLength: process.env.EMAIL_USER?.length || 0,
      emailPassLength: process.env.EMAIL_PASS?.length || 0
    }, { status: 500 });
  }
}
