import Link from 'next/link';
import { getRedirects } from '@/lib/redirects';

export default async function Home() {
  const redirects = await getRedirects();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QR Code Redirect System
          </h1>
          <p className="text-lg text-gray-600">
            Manage your chair product QR codes and their destinations
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Current Redirects
          </h2>
          
          <div className="space-y-4">
            {Object.entries(redirects).map(([id, url]) => (
              <div key={id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="font-mono text-lg font-semibold text-blue-600">
                        Tag {id}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm text-gray-600 truncate max-w-md">
                        {url}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      QR URL: {typeof window !== 'undefined' ? window.location.origin : ''}/tag/{id}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Link
                      href={`/generate/${id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
                    >
                      Generate QR
                    </Link>
                    <a
                      href={`/tag/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm"
                    >
                      Test Redirect
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-800 mb-2">How to update redirects:</h3>
            <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
              <li>Edit the <code className="bg-amber-100 px-1 rounded">public/redirects.json</code> file</li>
              <li>Update the destination URL for any tag ID</li>
              <li>Commit and push to your repository</li>
              <li>Vercel will automatically redeploy with new redirects</li>
              <li>No need to regenerate QR codes - they remain permanent!</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Start Guide
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>1. Click &quot;Generate QR&quot; next to any tag to create a QR code</p>
            <p>2. Download the QR code as SVG or PNG</p>
            <p>3. Print and attach to your products</p>
            <p>4. Update destinations anytime by editing redirects.json</p>
          </div>
        </div>
      </div>
    </div>
  );
}
