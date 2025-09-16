import { NextRequest, NextResponse } from 'next/server';
import { getRedirectUrl } from '@/lib/redirects';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const redirectUrl = await getRedirectUrl(id);

    if (!redirectUrl) {
      return new NextResponse('Tag not found', { status: 404 });
    }

    // If the URL is relative, make it absolute
    let finalUrl = redirectUrl;
    if (redirectUrl.startsWith('/')) {
      const host = request.headers.get('host') || 'localhost:3000';
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      finalUrl = `${protocol}://${host}${redirectUrl}`;
    }

    // 302 redirect to the destination URL
    return NextResponse.redirect(finalUrl, { status: 302 });
  } catch (error) {
    console.error('Error processing redirect:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}