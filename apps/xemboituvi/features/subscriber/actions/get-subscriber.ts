const apiUrl = `https://mysticmarguerite.com/new/backend/api/newsletter/subscribes`;

const getSubscribers = async () => {
   const response = await fetch(apiUrl, {
      next: { revalidate: 60 },
   });
   return response.json();
};

export default getSubscribers;