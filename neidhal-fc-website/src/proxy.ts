import { NextResponse } from "next/server";

/**
 * Next.js 16+ Proxy Handler (Middleware Replacement)
 * Handles global routing, redirects, rewrites, and request interceptions.
 */
export function proxy() {
  // Currently passes through all requests. 
  // Any future request interception logic should be added here.
  return NextResponse.next();
}

export default proxy;
