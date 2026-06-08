import type { NextApiRequest, NextApiResponse } from 'next';

const merchantApiUrl = process.env.NEXT_PUBLIC_MERCHANT_API_URL?.replace(/\/$/, '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.url?.includes('/regions')) {
    return res.status(200).json({ regions: [{ id: 'reg_01', name: 'US', currency: 'USD' }] });
  }

  if (req.url?.includes('/product')) {
    if (!merchantApiUrl) {
      return res.status(503).json({ products: [], count: 0, message: 'Merchant API is not configured' });
    }

    const response = await fetch(`${merchantApiUrl}/v1/products?status=active&limit=100`);
    if (!response.ok) {
      return res.status(response.status).json({ products: [], count: 0 });
    }

    const data = (await response.json()) as any;
    return res.status(200).json({
      products: data.items || [],
      count: data.items?.length || 0,
      offset: 0,
      limit: data.items?.length || 0,
    });
  }

  return res.status(404).json({ message: 'Route not found', url: req.url });
}
