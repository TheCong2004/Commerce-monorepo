import React from "react";
import { useProducts, useCart } from "@commerce/shared-hooks";
import { ProductCard } from "@commerce/ui-kit";

const HomePage = ({ onAddToCart }: { onAddToCart: (p: any) => void }) => {
  const { data, isLoading } = useProducts();

  if (isLoading) return (
    <div className="p-10 flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl text-white mb-8 shadow-xl">
        <h2 className="text-2xl font-black mb-1">Printerval POD</h2>
        <p className="opacity-80 text-sm">Sáng tạo phong cách riêng của bạn</p>
      </div>
      
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
        Sản phẩm mới nhất
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {data?.items?.map((product: any) => (
          <ProductCard 
            key={product.id} 
            product={{
              id: product.id,
              title: product.title,
              description: product.description,
              priceCents: product.variants?.[0]?.price_cents || 0,
              imageUrl: product.variants?.[0]?.image_url
            }} 
            platform="zalo"
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
