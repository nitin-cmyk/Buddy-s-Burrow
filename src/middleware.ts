import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("MIDDLEWARE RUNNING on path:", req.nextUrl.pathname);

  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  console.log("MIDDLEWARE user:", user?.email ?? "NO USER");

  if (!user) {
    console.log("MIDDLEWARE: no user, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  console.log("MIDDLEWARE profile role:", profile?.role ?? "NO PROFILE");

  if (profile?.role !== "admin") {
    console.log("MIDDLEWARE: not admin, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("MIDDLEWARE: admin confirmed, letting through");
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};