import { type NextRequest, NextResponse } from 'next/server';

// Multilanguage routing removed — site serves from /
// [locale] routes redirect to / (see app/[locale]/page.tsx)
export function proxy(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
