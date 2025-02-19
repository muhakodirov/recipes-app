import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("userSession")?.value;
    const isPublicPath = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';
    const url = request.nextUrl.clone();
    let session = sessionCookie ? JSON.parse(sessionCookie) : null;




    // Wenn der Benutzer bereits auf einer öffentlichen Seite ist und nicht eingeloggt, KEIN Redirect
    if (isPublicPath && !session) {
        return NextResponse.next();
    }

    // Falls keine gültige Session existiert, leite auf /login um
    if (!session || !session.expires || Date.now() > session.expires) {
        request.cookies.delete("userSession"); // Sicherstellen, dass das Cookie gelöscht wird
        url.pathname = '/login';
        url.searchParams.set('redirect', request.url);
        console.log(url)
        return NextResponse.redirect(url);
    }

    // Eingeloggte Nutzer sollen nicht auf /login oder /signup landen
    if (isPublicPath && session.expires > Date.now()) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile', '/create', '/login', '/signup'],
};
