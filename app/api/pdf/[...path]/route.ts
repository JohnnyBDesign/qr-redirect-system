import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = params.path.join('/');
    const fullPath = path.join(process.cwd(), 'public', 'pdfs', filePath);
    
    // Security: Ensure the path doesn't go outside the pdfs directory
    const normalizedPath = path.normalize(fullPath);
    const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
    
    if (!normalizedPath.startsWith(pdfDir)) {
      return new NextResponse('Not found', { status: 404 });
    }
    
    // Check if file ends with .pdf
    if (!filePath.toLowerCase().endsWith('.pdf')) {
      return new NextResponse('Not found', { status: 404 });
    }
    
    const file = await readFile(normalizedPath);
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${path.basename(filePath)}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return new NextResponse('Not found', { status: 404 });
  }
}