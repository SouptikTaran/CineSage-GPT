import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMuted } from '../utils/soundSlice';

const VideoTitle = ({ title, overview }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    const isSoundOn = useSelector(store => store.sound?.isSoundOn);
    const dispatch = useDispatch();

    const handleToggleButton = () => {
        dispatch(setIsMuted());
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTextVisible(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const isMobile = window.innerWidth <= 768;

    return (
        <div className='w-screen aspect-video pt-[20%] px-4 md:px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className={`text-lg md:text-6xl  font-bold ${isMobile ? '' : 'transition-all duration-500'} ${!isMobile && isTextVisible ? 'mt-0' : 'mt-[5vh] md:mt-36'}`}>
                {title}
            </h1>
            {!isMobile && isTextVisible && (
                <p className='my-4 text-xs md:text-base w-full md:w-1/2 transition-all duration-500'>
                    {overview}
                </p>
            )}
            <div className={`flex  md:flex-row gap-2 md:gap-4 mt-3`}>
                <button className="flex w-[22vw] md:w-[10vw]  items-center space-x-2 bg-slate-50 hover:bg-opacity-40 px-4 md:px-6 rounded transition-all duration-300">
                    <svg fill="#000000" height="20px" width="20px" viewBox="0 0 17.804 17.804" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313 c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04 c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"></path>
                    </svg>
                    <span className="text-sm md:text-base text-black font-bold my-1 md:my-3">Play</span>
                </button>
                {/* {!isMobile && (
                    <button className='flex w-[20vw] md:w-[12vw] items-center space-x-2 bg-gray-400 text-white font-bold px-4 py-2 rounded hover:bg-opacity-20 transition-all duration-300 mt-2 md:mt-0 md:ml-2'>
                        <svg className='' xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 50 50">
                            <path d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 25 11 A 3 3 0 0 0 25 17 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 23 23 L 23 36 L 21 36 L 21 38 L 29 38 L 29 36 L 27 36 L 27 21 L 21 21 z"></path>
                        </svg>
                        <span className="text-[8px] md:text-base">
                            More Info
                        </span>
                    </button>
                )} */}
               <div className='flex ml-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer" onClick={handleToggleButton}>
                        {isSoundOn ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default VideoTitle;
