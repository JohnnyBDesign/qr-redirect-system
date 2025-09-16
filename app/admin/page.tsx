'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Redirects {
  [key: string]: string;
}

export default function AdminPage() {
  const [redirects, setRedirects] = useState<Redirects>({});
  const [newTagId, setNewTagId] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    try {
      const response = await fetch('/redirects.json');
      const data = await response.json();
      setRedirects(data);
    } catch (error) {
      console.error('Error fetching redirects:', error);
    }
  };

  const handleAddRedirect = () => {
    if (newTagId && newUrl) {
      const updatedRedirects = { ...redirects, [newTagId]: newUrl };
      setRedirects(updatedRedirects);
      setNewTagId('');
      setNewUrl('');
      alert(`Added redirect for tag ${newTagId}. Remember to update redirects.json manually!`);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setEditUrl(redirects[id]);
  };

  const handleSaveEdit = (id: string) => {
    const updatedRedirects = { ...redirects, [id]: editUrl };
    setRedirects(updatedRedirects);
    setEditingId(null);
    alert(`Updated redirect for tag ${id}. Remember to update redirects.json manually!`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Delete redirect for tag ${id}?`)) {
      const updatedRedirects = { ...redirects };
      delete updatedRedirects[id];
      setRedirects(updatedRedirects);
      alert(`Deleted redirect for tag ${id}. Remember to update redirects.json manually!`);
    }
  };

  const getNextTagId = () => {
    const ids = Object.keys(redirects).map(id => parseInt(id)).filter(n => !isNaN(n));
    const maxId = Math.max(...ids, 0);
    return String(maxId + 1).padStart(3, '0');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1 style={{ marginBottom: '20px' }}>QR Code Admin Panel</h1>
      
      <Link href="/" style={{ color: '#4CAF50' }}>← Back to Home</Link>

      <div style={{ marginTop: '40px', marginBottom: '40px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Add New QR Code Redirect</h2>
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Tag ID (e.g., 005)"
            value={newTagId}
            onChange={(e) => setNewTagId(e.target.value)}
            style={{ padding: '10px', marginRight: '10px', width: '150px' }}
          />
          <input
            type="text"
            placeholder="URL or /api/pdf/filename.pdf"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            style={{ padding: '10px', marginRight: '10px', width: '400px' }}
          />
          <button
            onClick={handleAddRedirect}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add Redirect
          </button>
          <span style={{ marginLeft: '10px', color: '#666' }}>
            Next available ID: {getNextTagId()}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Current Redirects</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Tag ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Destination URL</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(redirects).map(([id, url]) => (
              <tr key={id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{id}</td>
                <td style={{ padding: '10px' }}>
                  {editingId === id ? (
                    <input
                      type="text"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      style={{ padding: '5px', width: '100%' }}
                    />
                  ) : (
                    url
                  )}
                </td>
                <td style={{ padding: '10px' }}>
                  {editingId === id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(id)}
                        style={{ marginRight: '10px', color: '#4CAF50', cursor: 'pointer' }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{ color: '#666', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/generate/${id}`}
                        style={{ marginRight: '10px', color: '#4F46E5' }}
                      >
                        View QR
                      </Link>
                      <button
                        onClick={() => handleEdit(id)}
                        style={{ marginRight: '10px', color: '#FF9800', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        style={{ color: '#F44336', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#FFF3CD', borderRadius: '8px', border: '1px solid #FCE4A3' }}>
        <h3 style={{ marginBottom: '10px' }}>📋 Manual Update Instructions:</h3>
        <ol style={{ marginLeft: '20px' }}>
          <li>Copy the updated redirect configuration from this page</li>
          <li>Edit the <code>public/redirects.json</code> file in your code editor</li>
          <li>Paste the updated configuration</li>
          <li>For PDF files: Add them to <code>public/pdfs/</code> directory</li>
          <li>Commit and push to GitHub</li>
          <li>Vercel will automatically redeploy</li>
        </ol>
        
        <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Current redirects.json content:</h4>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{JSON.stringify(redirects, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#E8F5E9', borderRadius: '8px', border: '1px solid '#A5D6A7' }}>
        <h3 style={{ marginBottom: '10px' }}>🔄 PDF Update Workflow:</h3>
        <ol style={{ marginLeft: '20px' }}>
          <li>Upload new PDF to <code>public/pdfs/</code> directory</li>
          <li>Keep the same filename to maintain the QR code link</li>
          <li>Or update the redirect URL in redirects.json to point to new filename</li>
          <li>QR codes never need to change - they always point to /tag/[id]</li>
          <li>The redirect destination can be updated anytime</li>
        </ol>
      </div>
    </div>
  );
}