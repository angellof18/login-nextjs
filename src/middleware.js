import { NextResponse } from "next/server"


export function middleware(request) {
    const authToken = request.cookies.get('authTokens')?.value

    if (request.nextUrl.pathname === '/' && authToken) {
        const response = NextResponse.redirect(new URL('/home', request.url))
        return response
    }

    if (request.nextUrl.pathname === '/' && !authToken) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        return response
    }

    if (request.nextUrl.pathname.startsWith('/home') && !authToken) {
        console.log("Redirecting to / from /home due to missing auth token")
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('authTokens')
        return response
    }

    if (request.nextUrl.pathname.startsWith('/login') && authToken) {
        console.log("Redirecting to /home from / due to presence of auth token")
        const response = NextResponse.redirect(new URL('/home', request.url))
        return response
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/', '/login', '/home(.*)']
}