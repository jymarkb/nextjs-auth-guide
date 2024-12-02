"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function addTask(formData: FormData) {
  await prisma.task.create({
    data: {
      title: formData.get("title") as string,
    },
  });

  revalidatePath("/task");
}
