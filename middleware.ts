import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("userSession")?.value;
    console.log(sessionCookie + ' middleware');
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const session = JSON.parse(sessionCookie);

    // Prüfen, ob die Session abgelaufen ist
    if (Date.now() > session.expires) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/profile', '/create'],
}