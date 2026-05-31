const apiUrl = `https://mysticmarguerite.com/new/backend/api/products`;

const getProducts = async () => {
   const response = await fetch(apiUrl, {
      next: { revalidate: 60 },
   });
   return response.json();
};

export default getProducts;