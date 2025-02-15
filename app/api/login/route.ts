// app/api/login/route.ts
import { NextResponse } from "next/server";
import { loginSchema } from "@/app/libs/zod";
import { signIn } from "@/app/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  // Validate the input using zod
  const parseResult = loginSchema.safeParse({ email, password });
  if (!parseResult.success) {
    // Return validation errors
    return NextResponse.json(
      { error: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    await signIn(formData);
    // On successful login, return a success response
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return NextResponse.json(
        { error: { credentials: ["Invalid credentials"] } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: { general: ["Something went wrong"] } },
      { status: 500 }
    );
  }
}
