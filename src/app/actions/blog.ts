"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File | null;

  if (!title || !content) return;

  let imageUrl = null;
  if (image && image.size > 0) {
    try {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const ext = path.extname(image.name) || ".jpg";
      const filename = `${Date.now()}${ext}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    } catch (e) {
      console.error("❌ Vercel File Write Error (as expected):", e);
      // Fallback: Continue without image or with an error indicator if needed
      // imageUrl = "/Banner.png"; // Placeholder
    }
  }

  await prisma.blogPost.create({
    data: { title, content, imageUrl }
  });

  const postsCount = await prisma.blogPost.count();
  if (postsCount > 5) {
    const postsToDelete = await prisma.blogPost.findMany({
      orderBy: { createdAt: "asc" },
      take: postsCount - 5,
      select: { id: true, imageUrl: true }
    });

    for (const post of postsToDelete) {
      // Optional: Delete the image file too to save space
      if (post.imageUrl) {
        try {
          const filePath = path.join(process.cwd(), "public", post.imageUrl);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (e) {
          console.error("Failed to delete image file", e);
        }
      }
      await prisma.blogPost.delete({ where: { id: post.id } });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/blog");
}

export async function deletePost(id: string) {
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (post?.imageUrl) {
    try {
      const filePath = path.join(process.cwd(), "public", post.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      console.error("Failed to delete image file", e);
    }
  }
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/blog");
}
