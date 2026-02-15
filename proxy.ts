import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;


    const isPublicAsset = pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i);
    if (
        isPublicAsset ||
        pathname === "/" ||
        pathname === "/login" ||
        pathname.startsWith("/api/login") ||
        pathname.startsWith("/_next/image")
    ) {
        return NextResponse.next();
    }

    const isLoggedIn = req.cookies.get("username");

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|avif)).*)"],
};
