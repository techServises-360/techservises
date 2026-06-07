import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst();
    
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin already exists' },
        { status: 400 }
      );
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.admin.create({
      data: {
        username: 'admin',
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: 'Admin created successfully',
      credentials: {
        username: 'admin',
        password: 'admin123',
        note: 'Please change this password immediately!',
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
