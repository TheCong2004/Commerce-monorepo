const apiUrl = `https://mysticmarguerite.com/new/backend/api/admin/orders`;

const getorders = async () => {
   const response = await fetch(apiUrl, {
      next: { revalidate: 60 },
   });
   return response.json();
};

export default getorders;