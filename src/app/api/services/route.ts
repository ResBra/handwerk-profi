import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await prisma.serviceListing.findMany({
      orderBy: { createdAt: "asc" }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Laden der Leistungen" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, imageUrl, isActive } = body;

    const newService = await prisma.serviceListing.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || null,
        isActive: isActive !== undefined ? isActive : true,
      }
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Fehler beim Erstellen der Leistung:", error);
    return NextResponse.json({ error: "Fehler beim Erstellen" }, { status: 500 });
  }
}
