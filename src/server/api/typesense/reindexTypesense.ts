// src/workers/task.ts
import { prisma } from "~/server/db";

async function indexTypesenseQueue() {
  const queueItems = await prisma.updateQueue.findMany({
    select: {
      data: true,
      model: true,
    },
    orderBy: [{ model: "asc" }],
  });

  console.log(queueItems);
}

void indexTypesenseQueue();
