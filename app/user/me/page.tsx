import { getUser } from "@/src/utils/getUser";

export default async function User() {
    const { user } = await getUser();
    return (
        <div className="flex sm:flex-row flex-col p-5 justify-around">
            <div className="align-center flex flex-col justify-between">
                <div className="mb-10 h-52 w-52 rounded-full mx-auto bg-primary-btn"></div>
                <div className="text-center text-4xl">Kartikey</div>
                <div className="hover:brightness-95 cursor-pointer mt-6 text-center bg-primary-btn text-text-dark p-2 rounded-lg">
                    Change profile settings
                </div>
            </div>
            <div className="text-lg text-text-dark flex flex-col p-8 justify-around align-center">
                <h3 className="my-2 bg-field p-2 rounded-md w-48 text-center">
                    Name: Kartikey
                </h3>
                <h3 className="my-2 bg-field p-2 rounded-md w-48 text-center">
                    DOB: 16-18-23
                </h3>
                <h3 className="my-2 bg-field p-2 rounded-md w-48 text-center">
                    Email: kk@gmail.com
                </h3>
                <h3 className="my-2 bg-field p-2 rounded-md w-48 text-center">
                    Age: 13
                </h3>
                <h3 className="my-2 bg-field p-2 rounded-md w-48 text-center">
                    Badges: none
                </h3>
                <h3 className="my-2 bg-field p-2 rounded-md w-48 text-center">
                    Languages: JS
                </h3>
            </div>
        </div>
    );
}
