import { getUser } from "@/src/utils/getUser";

export default async function User() {
    const { user } = await getUser();
    return <h1>{user?.name}</h1>;
}
