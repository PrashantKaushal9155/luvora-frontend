import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]: string;
    exp: number;
}

export const getUserIdFromToken = (token: string) => {
    const decodedToken = jwtDecode<JwtPayload>(token);

    return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
};