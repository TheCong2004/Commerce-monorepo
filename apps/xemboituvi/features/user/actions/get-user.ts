export const getUserData = async (token: string | undefined | null) => {
   try {
      const response = await fetch(`https://mysticmarguerite.com/new/backend/api/profile`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         next: { revalidate: 60 },
      });
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
   }
};