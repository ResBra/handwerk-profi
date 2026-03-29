"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteInquiry(id: string) {
  try {
    await prisma.contactRequest.delete({
      where: { id },
    });
    revalidatePath("/admin/inquiries");
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
  }
}
