import { medusaAdmin } from "@/lib/medusaClient";
import { publicProcedure } from "../../trpc";
import { z } from "zod";
import { get } from "http";

export const priceRoute = {
    getPriceList: publicProcedure.query(async ({}) => {
        const price = await medusaAdmin.admin.priceList.list();
        return price;
    }),
    getPrice: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
                const price = await medusaAdmin.admin.priceList.retrieve(input.id, {
                     fields: "id,*prices"
                });
                return price;
        }),
}