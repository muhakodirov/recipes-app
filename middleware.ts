import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("userSession")?.value;
    const url = request.nextUrl.clone();

    if (!sessionCookie) {
        url.pathname = '/login';
        url.searchParams.set('redirect', request.url);
        return NextResponse.redirect(url);
    }

    const session = JSON.parse(sessionCookie);

    // Prüfen, ob die Session abgelaufen ist
    if (Date.now() > session.expires) {
        url.pathname = '/login';
        url.searchParams.set('redirect', request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/profile', '/create'],
}