const apiUrl = `https://mysticmarguerite.com/new/backend/api/category`;

const getCategory = async (id: string) => {
   const response = await fetch(`${apiUrl}/${id}`, {
      next: { revalidate: 60 },
   });
   return response.json();
};

export default getCategory;