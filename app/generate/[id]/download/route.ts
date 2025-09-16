import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'png';
    
    // Get the host from headers or environment
    const host = request.headers.get('host') || 'myproject.vercel.app';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const qrUrl = `${protocol}://${host}/tag/${id}`;

    if (format === 'svg') {
      const svgString = await QRCode.toString(qrUrl, {
        type: 'svg',
        width: 400,
        margin: 2,
        errorCorrectionLevel: 'H',
      });

      return new NextResponse(svgString, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': `attachment; filename="qr-code-${id}.svg"`,
        },
      });
    } else {
      const buffer = await QRCode.toBuffer(qrUrl, {
        width: 1024,
        margin: 2,
        errorCorrectionLevel: 'H',
      });

      // Convert Buffer to Uint8Array to ensure compatibility
      const uint8Array = new Uint8Array(buffer);

      return new NextResponse(uint8Array, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="qr-code-${id}.png"`,
        },
      });
    }
  } catch (error) {
    console.error('Error generating QR code:', error);
    return new NextResponse('Error generating QR code', { status: 500 });
  }
}