const apiUrl = `https://mysticmarguerite.com/new/backend/api/service`;

const getService = async (id: string) => {
   const response = await fetch(`${apiUrl}/${id}`, {
      next: { revalidate: 60 },
   });
   return response.json();
};

export default getService;