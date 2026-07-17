// app/api/food/classify/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Client } from "@gradio/client";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get("image");
    const topK = Number(formData.get("top_k") ?? 5);

    if (!(image instanceof Blob)) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const client = await Client.connect("blackhacker/bangla-diet");
    const result = await client.predict("/predict_image", {
      image,
      top_k: topK,
    });

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error("Classification error:", error);
    return NextResponse.json(
      { error: "Failed to classify image. Please try again." },
      { status: 502 }
    );
  }
}
