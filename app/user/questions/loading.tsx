import { ClipLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <ClipLoader color="#9f56fc" size={81} speedMultiplier={0.8} />
        </div>
    );
}
