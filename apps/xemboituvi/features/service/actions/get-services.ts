const apiUrl = `https://mysticmarguerite.com/new/backend/api/services`;

const getServices = async () => {
   const response = await fetch(apiUrl, {
      next: { revalidate: 60 },
   });
   return response.json();
};

export default getServices;