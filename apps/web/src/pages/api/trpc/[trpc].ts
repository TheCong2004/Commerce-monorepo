import type { NextApiRequest, NextApiResponse } from 'next';

const merchantApiUrl = process.env.NEXT_PUBLIC_MERCHANT_API_URL?.replace(/\/$/, '');

async function getMerchantProducts() {
  if (!merchantApiUrl) return [];
  const response = await fetch(`${merchantApiUrl}/v1/products?status=active&limit=100`);
  if (!response.ok) return [];
  const data = (await response.json()) as any;
  return data.items || [];
}

function toTrpcPayload(data: unknown) {
  return {
    result: {
      data: {
        json: data,
      },
    },
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { trpc } = req.query;
  const trpcPath = Array.isArray(trpc) ? trpc[0] : trpc || '';
  const queries = trpcPath.split(',');
  const products = await getMerchantProducts();

  const getDataForQuery = (queryName: string) => {
    switch (queryName) {
      case 'medusa.getProductSales':
      case 'medusa.getProducts':
      case 'medusa.getProductRecent':
        return products;
      case 'medusa.getRegions':
        return [{ id: 'reg_01', name: 'US', currency_code: 'usd' }];
      case 'blog.getCollections':
        return [];
      case 'medusa.getProduct':
        return products[0] || null;
      default:
        return [];
    }
  };

  if (req.method === 'GET' && req.url?.includes('batch=1')) {
    return res.status(200).json(queries.map((queryName) => toTrpcPayload(getDataForQuery(queryName.trim()))));
  }

  return res.status(200).json(toTrpcPayload(getDataForQuery(queries[0]?.trim())));
}
