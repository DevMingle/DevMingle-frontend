import { setUser, startLoading, setError } from "@src/store/features/userSlice";
import { userType } from "@src/utils/types";
import { useAppDispatch } from "@src/store/hooks";
import { encodeToken } from "@src/utils/jwt";

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

const login = async (Email: string, Password: string) => {
    const dispatch = useAppDispatch();

    if (!Email || !Password) return alert("Please enter both the fields");
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password }),
    });
    const data = await res.json();
    if (data.status === 402) return data.message;
    if (data.success) {
        const clientToken = encodeToken(data.token);
        localStorage.setItem("jwt", clientToken);
        console.log(data);
    }
    try {
        dispatch(startLoading());
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email: Email, password: Password }),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 402) return alert(data.message);
        if (data.success) {
            dispatch(setUser(data.user as userType));
        } else {
            dispatch(setError(data.message as string));
        }
    } catch (err) {
        dispatch(setError(String(err)));
    }
};

const isEmailValid = (email: string) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.toLowerCase().match(emailRegex)) {
        return true;
    } else {
        return false;
    }
};

const isPasswordValid = (password: string) => {
    return password.length >= 8;
};

const isReadyToSignIn = (Email: string, Password: string) => {
    if (isEmailValid(Email) && isPasswordValid(Password)) {
        return false;
    } else {
        return true;
    }
};

const isNameValid = (name: string) => {
    return name.length >= 3;
};

const isConfirmPasswordValid = (password: string, confirmPassword: string) => {
    if (password.length < 1) return false;
    else return password === confirmPassword;
};

const handleRegister = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    const dispatch = useAppDispatch();
    try {
        dispatch(startLoading());
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name, email, password, confirmPassword }),
        });
        const data = await res.json();
        console.log(data);
        if (!data.success) return data.message;
        dispatch(setUser(data.user as userType));
    } catch (err) {
        dispatch(setError(String(err)));
    }
};

const isReadyToRegister = (
    acceptedPolicy: boolean,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    if (
        acceptedPolicy &&
        isNameValid(name) &&
        isEmailValid(email) &&
        isPasswordValid(password) &&
        isConfirmPasswordValid(password, confirmPassword)
    ) {
        return false;
    } else {
        return true;
    }
};

export {
    updateUser,
    login,
    isEmailValid,
    isPasswordValid,
    isReadyToSignIn,
    isNameValid,
    isConfirmPasswordValid,
    handleRegister,
    isReadyToRegister,
};
