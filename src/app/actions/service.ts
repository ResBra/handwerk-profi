"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File | null;

  if (!title || !description) return;

  let imageUrl = null;
  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = path.join(process.cwd(), "public/uploads/services");
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const ext = path.extname(image.name) || ".jpg";
    const filename = `${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    imageUrl = `/uploads/services/${filename}`;
  }

  await prisma.serviceListing.create({
    data: { title, description, imageUrl }
  });

  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  const service = await prisma.serviceListing.findUnique({ where: { id } });
  if (service?.imageUrl) {
    try {
      const filePath = path.join(process.cwd(), "public", service.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      console.error("Failed to delete local image file", e);
    }
  }
  await prisma.serviceListing.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}
