const apiUrl = `https://mysticmarguerite.com/new/backend/api/timeslot`;

const getTimeSlot = async (id: string) => {
   try {
      const response = await fetch(`${apiUrl}/${id}`, {
         next: { revalidate: 60 },
      });
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
   }
};

export default getTimeSlot;