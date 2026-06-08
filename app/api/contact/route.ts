import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service, serviceLabel, message } = body;

    // Validate required fields
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Google Apps Script is configured
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const scriptSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

    if (!scriptUrl || !scriptSecret) {
      console.error('Google Apps Script not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: scriptSecret,
        name,
        email,
        service,
        serviceLabel,
        message: message || '',
      }),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Google Apps Script returned non-JSON response (likely HTML)');
      console.error('This usually means the script URL is incorrect or not deployed properly');
      return NextResponse.json(
        { error: 'Email service configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }

    const result = await response.json();

    if (!result.ok) {
      console.error('Google Apps Script error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending your message' },
      { status: 500 }
    );
  }
}
