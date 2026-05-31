const apiUrl = `https://mysticmarguerite.com/new/backend/api/timeslots`;

const getTimeSlots = async () => {
   try {
      const response = await fetch(apiUrl, {
         next: { revalidate: 60 },
      });
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching time slots:", error);
      return null;
   }
};

export default getTimeSlots;