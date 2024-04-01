import { useEffect } from "react";
import { useAppDispatch } from "@/app/redux/hooks";
import { setIsSmall } from "@/app/redux/screenSize/screenSizeSlice";

const useDetectScreenSize = (screenSize: number) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.innerWidth < screenSize;
            dispatch(setIsSmall(isSmall))
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch])
}

export default useDetectScreenSize;