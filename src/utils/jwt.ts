import jwt from "jsonwebtoken";

export const encodeToken = (serverToken: string): string => {
    const clientToken = jwt.sign(
        serverToken,
        process.env.NEXT_PUBLIC_JWT_KEY || "your_client_jwt_token"
    );
    return clientToken;
};
export const decodeToken = (clientToken: string): string | jwt.JwtPayload => {
    const serverToken = jwt.verify(
        clientToken,
        process.env.NEXT_PUBLIC_JWT_KEY || "your_client_jwt_token"
    );
    return serverToken;
};
