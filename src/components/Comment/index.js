import React from "react";

const Comment = ({data}) => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    return (
        <>
        {/* <div>
            {data.content}
        </div> */}

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
                <div className="mt-4 flex items-center">
                    <div className="flex mr-2 text-gray-700 text-sm mr-3">
                    <svg fill="none" viewBox="0 0 24 24"  className="w-4 h-4 mr-1" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    <span>12</span>
                    </div>
                    <div className="flex mr-2 text-gray-700 text-sm mr-8">
                    <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                    </svg>
                    <span>8</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Comment;

