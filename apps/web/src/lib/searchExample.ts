// Example usage of Fuse.js search for pet products
import { 
  searchPetProducts, 
  getPetProductsByCategory, 
  getPetProductsBySeller 
} from '@/lib/mockProduct';

// ==================== EXAMPLE 1: Full-text search ====================
// Search for products with fuzzy matching
const results1 = searchPetProducts('mèo vàng', 10);
console.log('Search "mèo vàng":', results1);
// Output: [
//   {
//     id: 'pet2',
//     title: 'Mèo Ba Tư màu xám 3 tháng tuổi',
//     price: 1800000,
//     score: 0.15,
//     matches: [...]
//   },
//   ...
// ]

// Search with typo (fuzzy search works!)
const results2 = searchPetProducts('meo vàng', 5); // missing tone mark
console.log('Search "meo vàng" (typo):', results2);

// ==================== EXAMPLE 2: Search by category ====================
// Get all cats (Thú cưng > Mèo con)
const meoCon = getPetProductsByCategory('Thú cưng', 'Mèo con');
console.log('All cats:', meoCon);

// Get all pets (broad)
const thuCung = getPetProductsByCategory('Thú cưng');
console.log('All pet animals:', thuCung);

// Get all accessories/food/services
const phuKien = getPetProductsByCategory('Phụ kiện, Thức ăn, Dịch vụ');
console.log('All accessories & services:', phuKien);

// ==================== EXAMPLE 3: Search by seller ====================
// Get all products from "Paw & Love Pet Shop"
const petShopProducts = getPetProductsBySeller('seller_4');
console.log('Products from Paw & Love:', petShopProducts);

// ==================== EXAMPLE 4: Combined filtering ====================
// Search for "chó", then filter by price range
const dogResults = searchPetProducts('chó', 20);
const affordable = dogResults.filter(p => p.price < 3000000);
console.log('Affordable dogs:', affordable);

// ==================== EXAMPLE 5: In React component ====================
// Usage example in a search component:
/*
import { useState, useMemo } from 'react';
import { searchPetProducts } from '@/lib/mockProduct';

export default function SearchPetProducts() {
  const [query, setQuery] = useState('');
  
  const results = useMemo(() => {
    return searchPetProducts(query, 10);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search pets... (e.g., 'mèo', 'chó', 'vẹt')"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <ul>
        {results.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Relevance score: {(product.score * 100).toFixed(0)}%</p>
            <p>Price: {product.price.toLocaleString()}₫</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
*/
