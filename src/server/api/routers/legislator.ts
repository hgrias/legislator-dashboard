import { z } from "zod";
import { State, Party, Chamber } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const legislatorRouter = createTRPCRouter({
  // Get a single legislator from Legislator ID
  get: protectedProcedure
    .input(z.object({ legislatorId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.legislator.findUnique({
        where: {
          id: input.legislatorId,
        },
      });
    }),

  // Get all legislators
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.legislator.findMany();
  }),

  // Create a legislator
  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        state: z.nativeEnum(State),
        party: z.nativeEnum(Party),
        chamber: z.nativeEnum(Chamber),
        district: z.number(),
        chamberWebsiteUrl: z.string(),
        capitolWebsiteUrl: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.legislator.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          state: input.state,
          party: input.party,
          chamber: input.chamber,
          district: input.district,
          chamberWebsiteUrl: input.chamberWebsiteUrl,
          capitolWebsiteUrl: input.capitolWebsiteUrl,
        },
      });
    }),
});
