import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY:", body);

    const { userId } = body;

    if (!userId) {
      return new Response("User ID missing", { status: 400 });
    }

    console.log("Deleting user:", userId);

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return new Response("Service role key missing", { status: 500 });
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.log("DELETE ERROR:", error.message);
      return new Response(error.message, { status: 500 });
    }

    return new Response("Deleted", { status: 200 });
  } catch (err: any) {
    console.log("SERVER CRASH:", err.message);
    return new Response("Server crash: " + err.message, { status: 500 });
  }
}