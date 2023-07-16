import { cookies } from "next/headers";
import axios from "axios";

export default async function User() {
    const token = cookies().get("jwt");
    const {
        data: { user },
    } = await axios.get(`${process.env.BACKEND_URL}/auth/check`, {
        headers: {
            Authorization: `Bearer ${token?.value}`,
        },
    });
    return <h1>{user?.name}</h1>;
}
