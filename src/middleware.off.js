import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

 
// This function can be marked `async` if using `await` inside
export function middleware(request) {

  const authHeaders = request.headers.get("authorization");
  if(!authHeaders){
    return NextResponse.redirect(new URL("/", request.url));
  }

  if(!authHeaders.startsWith("Bearer ")){
    return NextResponse.redirect(new URL("/", request.url));
  }

  const token = authHeaders.split(" ")[1];
 
  try{
    jwt.verify(token, process.env.SECRET_KEY);
    return NextResponse.next();
  

  }catch(error){
    return NextResponse.redirect(new URL("/", request.url));
  }

}
 
export const config = {
  matcher: '/dashboard/:path*',

}