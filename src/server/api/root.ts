import { legislativeSessionRouter } from "./routers/legislativeSession";
import { organizationRouter } from "./routers/organization";
import { interactionRouter } from "./routers/interaction";
import { legislatorRouter } from "./routers/legislator";
import { pageVisitRouter } from "./routers/pageVisit";
import { createTRPCRouter } from "~/server/api/trpc";
import { stafferRouter } from "./routers/staffer";
import { searchRouter } from "./routers/search";
import { noteRouter } from "./routers/note";
import { tagRouter } from "./routers/tag";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  legislator: legislatorRouter,
  interaction: interactionRouter,
  note: noteRouter,
  staffer: stafferRouter,
  legislativeSession: legislativeSessionRouter,
  organization: organizationRouter,
  search: searchRouter,
  tag: tagRouter,
  pageVisit: pageVisitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
