'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function GenerateQRCode() {
  const params = useParams();
  const id = params.id as string;
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    // Generate the full URL for the QR code
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.protocol}//${window.location.host}` 
      : '';
    setQrUrl(`${baseUrl}/tag/${id}`);
  }, [id]);

  const handleDownloadPNG = async () => {
    window.location.href = `/generate/${id}/download?format=png`;
  };

  const handleDownloadSVG = () => {
    window.location.href = `/generate/${id}/download?format=svg`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
          <p className="mt-2 text-gray-600">Tag ID: {id}</p>
          <p className="mt-1 text-sm text-gray-500 break-all">
            Redirects to: {qrUrl}
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <QRCode
              id="qr-svg"
              value={qrUrl}
              size={256}
              level="H"
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDownloadSVG}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Download SVG
            </button>
            
            <div className="hidden">
              <canvas id="qr-code" />
            </div>
            
            <button
              onClick={handleDownloadPNG}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              Download PNG (High Resolution)
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold text-gray-700 mb-2">Instructions:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• This QR code points to: <code className="bg-gray-200 px-1 rounded break-all">{qrUrl}</code></li>
              <li>• When scanned, it will redirect to the URL configured in redirects.json</li>
              <li>• The QR code remains permanent even if the destination changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}