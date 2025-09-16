# QR Code Redirect System for Chair Company

A dynamic QR code redirect system built with Next.js 14, optimized for Vercel deployment. Print QR codes once and update destinations anytime without reprinting.

## Features

- **Permanent QR Codes**: Each QR code points to `/tag/[id]` which redirects to configurable URLs
- **Easy Updates**: Change redirect destinations by editing a simple JSON file
- **QR Code Generator**: Built-in route to generate QR codes in SVG or PNG format
- **Admin Dashboard**: View all redirects and generate QR codes from one interface
- **Vercel Optimized**: Serverless functions with appropriate timeouts and caching

## Quick Start

1. **Deploy to Vercel**:
   - Click "Deploy to Vercel" button or import this repository
   - No environment variables needed

2. **Configure Redirects**:
   Edit `public/redirects.json`:
   ```json
   {
     "001": "https://mydomain.com/resources/chair001-v2.pdf",
     "002": "https://mydomain.com/resources/chair002-v1.pdf"
   }
   ```

3. **Generate QR Codes**:
   - Visit the home page to see all redirects
   - Click "Generate QR" to create a QR code for any tag
   - Download as SVG (scalable) or PNG (high resolution)

## Routes

- `/` - Admin dashboard showing all redirects
- `/tag/[id]` - Redirect endpoint (what QR codes point to)
- `/generate/[id]` - QR code generator interface
- `/generate/[id]/download?format=png|svg` - Direct QR code download

## How It Works

1. QR codes point to permanent URLs like `https://yourproject.vercel.app/tag/001`
2. When scanned, the `/tag/[id]` route looks up the destination in `redirects.json`
3. Users are redirected (302) to the current destination
4. Update `redirects.json` and redeploy to change destinations instantly

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Customization

- Edit `redirects.json` to manage your QR code mappings
- Modify the home page to match your brand
- Add authentication if needed for the admin interface

## Performance

- Serverless functions with 10-second timeout
- JSON file cached with `stale-while-revalidate`
- Lightweight QR generation using qrcode library
