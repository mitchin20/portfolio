import { NotFoundIcon } from "./components/svgs";

export default function NotFound() {
    return (
        <div className='grid h-screen mt-[-80px]'>
            <div className='text-center place-items-center place-self-center'>
                <h1>
                    SORRY!
                </h1>
                <NotFoundIcon className="text-9xl mx-auto" />
                <h2>Page Not Found</h2>
                <p>Could not find requested resource</p>
            </div>
        </div>
    )
}