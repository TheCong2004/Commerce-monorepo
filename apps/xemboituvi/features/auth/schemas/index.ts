import * as z from "zod";

export const loginFormSchema = z.object({
   email: z.string().email({
      message: "Email is required",
   }),
   password: z.string().min(1, {
      message: "Password is required",
   }),
});

export const registerFormSchema = z.object({
   name: z.string().min(1, {
      message: "Name is required",
   }),
   email: z.string().email({
      message: "Email is required",
   }),
   password: z.string().min(8, {
      message: "Minimum 8 characters required",
   }),
   confirmPassword: z.string().min(8, {
      message: "Minimum 8 characters required",
   }),
}).refine((data) => data.password === data.confirmPassword, {
   message: "Passwords don't match",
   path: ["confirmPassword"],
});

export const profileFormSchema = z.object({
   name: z.string().min(1, {
      message: "Name is required",
   }),
   email: z.string().email({
      message: "Email is required",
   }),
});

export const userProfileSchema = z.object({
   name: z.string(),
   email: z.string(),
   image: z.any().nullable(),
});

export const productsColumnSchema = z.object({
   title: z.string(),
   price: z.string(),
   description: z.string(),
   image: z.any(z.any()),
});

export const bookingColumnSchema = z.object({
   birth_date: z.string(),
   birth_time: z.string(),
   birth_place: z.string(),
   first_name: z.string(),
   last_name: z.string(),
   phone: z.string(),
   email: z.string(),
   country: z.string(),
   street_address: z.string(),
   town_city: z.string(),
   timeslot: z.string(),
   state: z.string(),
   zip: z.string(),
   meeintg_status: z.string(),
   start_time: z.string(),
   end_time: z.string(),
   date: z.string(),
   timezone: z.string(),
   notes: z.string(),
   meeting_link: z.string(),
   status: z.string(),
   price: z.string(),
});

export const servicesColumnSchema = z.object({
   title: z.string(),
   price: z.string(),
   description: z.string(),
   image: z.any(z.any()),
});

export const blogsColumnSchema = z.object({
   title: z.string(),
   short_description: z.string(),
   description: z.string(),
   category: z.string(),
   image: z.any().nullable(),
});

export const categoryColumnSchema = z.object({
   title: z.string(),
});

export const timeslotColumnSchema = z.object({
   date: z.string(),
   start_time: z.string(),
   end_time: z.string(),
   status: z.string(),
});

export const employeesColumnSchema = z.object({
   name: z.string(),
   email: z.string(),
   address: z.string(),
   phone_number: z.string(),
   state: z.string(),
});

export const requestServicesFormSchema = z.object({
   service_title: z.string().nonempty("Title is required"),
   service_description: z.string().nonempty("Description is required"),
   steps: z.array(
      z.object({
         step_title: z.string().nonempty("Step title is required"),
         step_description: z.string().nonempty("Step description is required"),
         options: z.array(
            z.object({
               size: z.string().nonempty("Size is required"),
               time: z.number().int().nonnegative("Time must be a non-negative integer"),
               price: z.number().nonnegative("Price must be a non-negative number"),
            })
         ),
      })
   ),
});

export const contactFormSchema = z.object({
   name: z.string().min(1),
   email: z.string().email(),
   specialMessage: z.string(),
});

export const simFormSchema = z.object({
   phone: z.string().min(1, "Vui lòng nhập số điện thoại"),
   birthDay: z.string().min(1, "Vui lòng nhập ngày sinh"),
   birthMonth: z.string().min(1, "Vui lòng nhập tháng sinh"),
   birthYear: z.string().min(1, "Vui lòng nhập năm sinh"),
   birthHour: z.string().min(1, "Vui lòng nhập giờ sinh"),
   birthMinute: z.string().min(1, "Vui lòng nhập phút sinh"),
   calendar: z.string().default("duonglich"),
   gender: z.string().default("nam"),
});

export const bookNowFormSchema = z.object({
   name: z.string().min(1),
   lastName: z.string().min(1),
   email: z.string().email({
      message: "Email is required",
   }),
   services: z.string().min(1),
   // healingTopics: z.string().min(1),
   preferredTime: z.string().min(1),
   cityAndState: z.string().min(1),
   specialMessage: z.string().min(1),
});

export type TloginFormData = z.infer<typeof loginFormSchema>;
export type TprofileFormData = z.infer<typeof profileFormSchema>;
export type TcontactFormData = z.infer<typeof contactFormSchema>;
export type TsimFormData = z.infer<typeof simFormSchema>;
export type TbookNowFormData = z.infer<typeof bookNowFormSchema>;
export type TUserProfileProps = z.infer<typeof userProfileSchema>;
export type TblogsColumnProps = z.infer<typeof blogsColumnSchema>;
export type TregisterFormData = z.infer<typeof registerFormSchema>;
export type TbookingFormData = z.infer<typeof bookingColumnSchema>;
export type TcategoryColumnProps = z.infer<typeof categoryColumnSchema>;
export type TtimeslotColumnProps = z.infer<typeof timeslotColumnSchema>;
export type TproductsColumnProps = z.infer<typeof productsColumnSchema>;
export type TservicesColumnProps = z.infer<typeof servicesColumnSchema>;
export type TemployeesColumnSchema = z.infer<typeof employeesColumnSchema>;
export type TrequestServiceFormData = z.infer<typeof requestServicesFormSchema>;
