import React, {useEffect, useState} from "react";

const LoadingBar = () => {
    let [percent, setPercent] = useState(0)
    let styleObj = {"width": `${percent}%`}

    useEffect(()=>{
        // use setInterval here and clear it on unmount by returning a function from the useEffect
        function incrementPercent(prev) {
            if (prev >= 98){
                return 98
            } 
            return prev + 1
        }
        const intervalId = setInterval(() => {  
            setPercent(prev => incrementPercent(prev))
        }, 70)
        
        return () => clearInterval(intervalId);
         
    }, [])

    return (
        <>
        <p className="text-center">Loading results, please wait ...</p>
        <div className="w-full bg-gray-200 rounded-full m-6">
            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={styleObj}> {percent}%</div>
        </div>
        </>
    )
}

export default LoadingBar;

