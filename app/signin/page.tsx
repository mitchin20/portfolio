import React from 'react'

const SignIn = () => {
    return (
        <div className='flex w-full h-svh mt-[-80px] place-content-center place-items-center'>
            <div className="card md:w-5/12 sm:w-11/12 bg-base-100 shadow-xl">
                <form
                    className='p-7'
                >
                    <h2 className="card-title mb-5 place-content-center">
                        Sign In
                    </h2>

                    <div className='grid grid-cols-1 gap-4'>
                        <label className={`input input-bordered flex items-center gap-2 sm:mb-2`} >
                            <input type="email" name="email" placeholder="Email" required />
                        </label>
                        <label className={`input input-bordered flex items-center gap-2 sm:mb-2`} >
                            <input type="password" name="password" placeholder="Password" required />
                        </label>
                    </div>
                    <div className="card-actions w-[100%] px-5 sm:px-0 mt-5">
                        <button 
                            type="submit"
                            className='btn btn-success w-full rounded-full'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
            
    )
}

export default SignIn