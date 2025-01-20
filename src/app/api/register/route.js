// src/app/api/register/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';
import { sendVerificationEmail } from '@/utils/sendVerificationEmail';

export async function POST(request) {
  try {
    // Parse the request body safely
    const data = await request.json();

    // Validate input
    if (!data || !data.email) {
      return NextResponse.json({ 
        message: 'Email is required' 
      }, { status: 400 });
    }

    const { email, name } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ 
        message: 'User with this email already exists' 
      }, { status: 409 });
    }

    // Generate verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        code
      }
    });

    // Send verification email
    await sendVerificationEmail(email, code, name);

    return NextResponse.json({ 
      message: 'Registration successful. Check your email for verification code.',
      userId: user.id 
    }, { status: 201 });

  } catch (error) {
    // Log the full error for server-side debugging
    console.error('Registration error:', error);

    // Return a generic error response
    return NextResponse.json({ 
      message: 'Internal server error',
      error: error.toString()
    }, { status: 500 });
  }
}