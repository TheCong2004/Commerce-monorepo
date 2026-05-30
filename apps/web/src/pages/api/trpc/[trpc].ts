// import type { NextApiRequest, NextApiResponse } from 'next';

// import { createNextApiHandler } from '@trpc/server/adapters/next';
// import { createTRPCContext } from '@/server/api/trpc';
// import { appRouter } from '@/server/api/root';
// // export API handler
// export default createNextApiHandler({
//   router: appRouter,
//   createContext: createTRPCContext,
//   onError:
//     process.env.NODE_ENV === 'development'
//       ? ({ path, error }) => {
//           console.error(
//             `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
//           );
//         }
//       : undefined,
// });

// MOCK tRPC handler trả về đúng format batch cho FE với superjson tương thích
import type { NextApiRequest, NextApiResponse } from 'next';
import { MOCK_PRODUCTS_DATABASE } from '@/lib/mockProduct';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Lấy các query từ url
  const { trpc } = req.query;
  const trpcPath = Array.isArray(trpc) ? trpc[0] : trpc || '';
  const queries = trpcPath.split(',');

  const getMockDataForQuery = (queryName: string) => {
    switch (queryName) {
      case 'medusa.getProductSales':
        return MOCK_PRODUCTS_DATABASE;
      case 'medusa.getProducts':
        return MOCK_PRODUCTS_DATABASE;
      case 'medusa.getRegions':
        return [{ id: 'reg_01', name: 'US', currency_code: 'usd' }];
      case 'medusa.getProductRecent':
        return MOCK_PRODUCTS_DATABASE.slice(0, 4);
      case 'blog.getCollections':
        return [
          { 
            id: 1, 
            slug: 'custom-tee-trends', 
            Thumbnail: { url: '/assets/blog-1.jpg' }, 
            Title: 'Top Custom Tee Design Trends in 2026', 
            Author: 'Alex Mercer' 
          },
          { 
            id: 2, 
            slug: 'how-to-style-hoodies', 
            Thumbnail: { url: '/assets/blog-2.jpg' }, 
            Title: 'How to Style Your Oversized Hoodie', 
            Author: 'Elena Fisher' 
          },
          { 
            id: 3, 
            slug: 'gift-ideas-for-creatives', 
            Thumbnail: { url: '/assets/blog-3.jpg' }, 
            Title: 'Thoughtful Gift Ideas for Creative People', 
            Author: 'Marcus Vance' 
          }
        ];
      case 'medusa.getProduct':
        return MOCK_PRODUCTS_DATABASE[0];
      default:
        return [];
    }
  };

  // Nếu là batch request
  if (req.method === 'GET' && req.url?.includes('batch=1')) {
    const results = queries.map((queryName) => {
      const data = getMockDataForQuery(queryName.trim());
      return {
        result: {
          data: {
            json: data
          }
        }
      };
    });
    return res.status(200).json(results);
  }

  // Nếu là request đơn lẻ
  const singleQueryName = queries[0]?.trim();
  const data = getMockDataForQuery(singleQueryName);
  return res.status(200).json({
    result: {
      data: {
        json: data
      }
    }
  });
}
