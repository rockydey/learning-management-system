import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const adminProtectedRoutes = [
  "/admin/dashboard",
  "/admin/user-list",
  "/admin/profile",
];
const userProtectedRoutes = ["/user/dashboard", "/user/profile"];
const courseProtectedRoutes = ["/courses/"];
const classProtectedRoutes = ["/class/"];

export function middleware(request: NextRequest) {
  const token =
    request.headers.get("Authorization")?.replace("Bearer ", "") ||
    request.cookies.get("accessToken");

  const pathname = request.nextUrl.pathname.endsWith("/")
    ? request.nextUrl.pathname.slice(0, -1)
    : request.nextUrl.pathname;

  const isAdminRoute = adminProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isUserRoute = userProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isCourseRoute = courseProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isClassRoute = classProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(
      new URL(
        isAdminRoute ? "/admin/dashboard" : "/user/dashboard",
        request.url
      )
    );
  }

  if (
    (isAdminRoute || isUserRoute || isCourseRoute || isClassRoute) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/user/dashboard",
    "/user/profile",
    "/admin/user-list",
    "/admin/profile",
    "/login",
    "/signup",
    "/courses/:id",
    "/class/:id",
    "/api/:path*",
  ],
};
