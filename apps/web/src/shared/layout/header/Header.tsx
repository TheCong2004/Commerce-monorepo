"use client"
import { useEffect, useState } from 'react';

export const Header = () => {
  const [cartId, setCartId] = useState("");
  const [wishlist, setWishlist] = useState(0);
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartId = localStorage.getItem("cart_id") || "";
      setCartId(savedCartId);

      const wishlistString = localStorage.getItem("wishlist");
      const wishlistArray = wishlistString ? JSON.parse(wishlistString) : [];
      setWishlist(wishlistArray.length);

      const token = sessionStorage.getItem("authToken") ?? localStorage.getItem("authToken") ?? undefined;
      setAccessToken(token);
    }
  }, []);

  return (
    <header style={{ padding: '20px', background: '#fce4ec', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '20px' }}>Header đang ở chế độ Debug</h1>
    </header>
  );
};