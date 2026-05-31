const apiUrl = `https://mysticmarguerite.com/new/backend/api/getAllUsers`;

const getUsers = async () => {
   const response = await fetch(apiUrl, {
      next: { revalidate: 60 },
   });
   return response.json();
};

export default getUsers;