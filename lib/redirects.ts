import fs from 'fs';
import path from 'path';

export interface RedirectMapping {
  [key: string]: string;
}

export async function getRedirects(): Promise<RedirectMapping> {
  const filePath = path.join(process.cwd(), 'public', 'redirects.json');
  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getRedirectUrl(id: string): Promise<string | null> {
  const redirects = await getRedirects();
  return redirects[id] || null;
}