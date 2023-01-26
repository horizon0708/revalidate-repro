import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|_next-live|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  console.log(url);
  // Get hostname of request (e.g. demo.sidenotes.xyz, demo.localhost:3000)
  const hostname = req.headers.get("host") || "demo.sidenotes.xyz";

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(".revalidate.sidenotes.xyz", "")
      : hostname.replace(`.localhost:3000`, "");

  if (currentHost == "app") {
    url.pathname = `/dashboard${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite root application to `/home` folder
  if (hostname === "revalidate.sidenotes.xyz") {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite everything else to `/_sites/[site] dynamic route
  console.log(currentHost, url.pathname);
  url.pathname = `/site/${currentHost}${url.pathname}`;
  console.log(url.pathname);
  return NextResponse.rewrite(url);
}
