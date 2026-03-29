import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (email === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
      await createSession();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Falsche Zugangsdaten" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Anmelden" }, { status: 500 });
  }
}
