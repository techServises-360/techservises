import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create new project (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        fullDescription: body.fullDescription,
        category: body.category,
        color: body.color,
        image: body.image || null,
        websiteUrl: body.websiteUrl || null,
        tiktokUrl: body.tiktokUrl || null,
        tags: body.tags || [],
        features: body.features || [],
        technologies: body.technologies || [],
        published: body.published ?? true,
        order: body.order ?? 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT update project (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
