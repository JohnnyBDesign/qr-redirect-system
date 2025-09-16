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

    // 302 redirect to the destination URL
    return NextResponse.redirect(redirectUrl, { status: 302 });
  } catch (error) {
    console.error('Error processing redirect:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}