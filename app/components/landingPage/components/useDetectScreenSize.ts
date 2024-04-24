import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setSize } from "@/redux/screenSize/screenSizeActions";

const useDetectScreenSize = (screenSize: number) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.innerWidth < screenSize;
            dispatch(setSize(isSmall))
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch])
}

export default useDetectScreenSize;