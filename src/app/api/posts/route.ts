import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 10
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Laden" }, { status: 500 });
  }
}
