const apiUrl = `https://mysticmarguerite.com/new/backend/api/categories`;

const getCategories = async () => {
   const response = await fetch(apiUrl, {
      next: { revalidate: 60 },
   });
   return response.json();
};

export default getCategories;