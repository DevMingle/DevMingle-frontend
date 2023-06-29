import jwt from "jsonwebtoken";

export const encodeToken = (serverToken: string): string => {
  const clientToken = jwt.sign(
    serverToken,
    process.env.JWT_TOKEN || "your_client_jwt_token"
  );
  return clientToken;
};
export const decodeToken = (clientToken: string): string | jwt.JwtPayload => {
  const serverToken = jwt.verify(
    clientToken,
    process.env.JWT_TOKEN || "your_client_jwt_token"
  );
  return serverToken;
};
