"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getThemeSettings() {
  try {
    const settings = await prisma.themeSettings.findUnique({
      where: { id: "global" }
    });
    return settings;
  } catch (error) {
    console.error("Error fetching theme settings:", error);
    return null;
  }
}

export async function updateThemeSettings(data: {
  gradientStart: string;
  gradientEnd: string;
  gradientStartDark: string;
  gradientEndDark: string;
  sidebarBgLight: string;
  sidebarBgDark: string;
}) {
  try {
    const settings = await prisma.themeSettings.upsert({
      where: { id: "global" },
      update: {
        gradientStart: data.gradientStart,
        gradientEnd: data.gradientEnd,
        gradientStartDark: data.gradientStartDark,
        gradientEndDark: data.gradientEndDark,
        sidebarBgLight: data.sidebarBgLight,
        sidebarBgDark: data.sidebarBgDark,
      },
      create: {
        id: "global",
        gradientStart: data.gradientStart,
        gradientEnd: data.gradientEnd,
        gradientStartDark: data.gradientStartDark,
        gradientEndDark: data.gradientEndDark,
        sidebarBgLight: data.sidebarBgLight,
        sidebarBgDark: data.sidebarBgDark,
      }
    });
    
    // Purge cache for the entire site since layout uses these settings
    revalidatePath("/", "layout");
    
    return { success: true, settings };
  } catch (error) {
    console.error("Error updating theme settings:", error);
    return { success: false, error: "Fehler beim Speichern der Farben" };
  }
}
