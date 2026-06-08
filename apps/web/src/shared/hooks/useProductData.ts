import { api } from "@/utils/api";

export type ProductDataType = 'sales' | 'top-pick' | 'all';

interface ProductDataOptions {
  regionID?: string;
  collection_id?: string;
  price_list_id?: string;
}

export function useProductData(type: ProductDataType, options?: ProductDataOptions) {
  // Query for sales products (Price List)
  const salesQuery = api.medusa.getProductSales.useQuery(
    { price_list_id: options?.price_list_id || "pl_default" },
    { enabled: type === 'sales' }
  );

  // Query for standard products
  const productsQuery = api.medusa.getProducts.useQuery(
    { regionID: options?.regionID, collection_id: options?.collection_id },
    { enabled: type === 'all' || type === 'top-pick' }
  );

  // Determine active query
  const activeQuery = type === 'sales' ? salesQuery : productsQuery;
  const { data, isLoading, error } = activeQuery;

  const products = data || [];

  return {
    products,
    isLoading: type === 'sales' ? salesQuery.isLoading : productsQuery.isLoading,
    error,
    isFallback: false,
  };
}
