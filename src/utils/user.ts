interface User {
    name?: string | undefined;
    languages?: string[] | undefined;
    avatarImg?: string | undefined;
    followers?: string[] | undefined;
    following?: string[] | undefined;
    friends?: string[] | undefined;
    likedQuestions?: string[] | undefined;
    badges?: string[] | undefined;
}

const updateUser = async (User: User) => {
    const res = await fetch("/api", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            method: "POST",
            url: "/user/edit",
            body: { ...User },
        }),
    });
    console.log(await res.json());
};

export { updateUser };
