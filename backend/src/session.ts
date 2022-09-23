import { ironSession } from "iron-session/express";
import { COOKIE_NAME, PROD } from "./constants";

export default ironSession({
  cookieName: COOKIE_NAME,
  password: process.env["SESSION_PASSWORD"]!,
  cookieOptions: {
    secure: true,
    httpOnly: true,

    // https://blog.devgenius.io/graphql-apollo-studio-and-cookies-5d8519d0ca7e
    // Setting sameSite to `none` is a workaround for Apollo Studio to work with cookies.
    sameSite: PROD ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  },
});
