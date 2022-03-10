import React from "react";

const Comment = ({data}) => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    let barColour; 
    let barStyle;
    if (data?.rating){
        barStyle = {"width": `${Math.round((data.rating/10)*100)}%`}
        if (data.rating <= 3){
            barColour = 'blue'
        } else if (data.rating >= 7) {
            barColour = 'green'
        } else {
            barColour = 'blue'
        }
    }
    return (
        <>
        <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl ">
        <div className="flex items-start px-4 py-6 w-full">
            <div className="w-full">
                <div className="flex flex-row justify-between w-full">
                    <h2 className="text-lg font-semibold text-gray-900 -mt-1">{data.author_names.first_name} {data.author_names.last_name} </h2>
                    <small className="text-sm text-gray-700">{new Date(data.date).toLocaleDateString("en-US", options)}</small>
                </div>
                <p className="mt-3 text-gray-700 text-sm">
                    {data.content}
                </p>
                
                {data.rating &&
                <>
                    <div>
                        <p className="mt-3 text-gray-700 text-sm">
                            {data.rating}/10
                        </p>
                    </div>
                    <div className="w-full bg-gray-200 h-1 mb-6">
                        <div className={`bg-${barColour}-500 h-1`} style={barStyle}></div>
                    </div>
                </>
                    
                }
            </div>
        </div>
        </div>
        </>
    )
}

export default Comment;

