import jwt, { JwtPayload } from "jsonwebtoken";

export async function IsLoggedIn(req: Request, secret: string) {
  try {
    let authHeader = req.headers.get("Authorization");

    if (authHeader == undefined) {
      return false;
    }

    let token = authHeader.split(" ")[1];

    if (token == null || token == undefined) {
      return false;
    }

    var decoded = jwt.verify(token, secret);

    return decoded as JwtPayload;
  } catch (error) {
    return false;
  }
}
