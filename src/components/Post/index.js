import React from "react";

const Post = ({info, toggleModal}) => {
    // {
    //     "id": 5,
    //     "title": "My first post",
    //     "content": "yah yah yah",
    //     "date": "2022-01-18T09:07:04.148787Z",
    //     "image": "https://drive.google.com/uc?id=1SiEvd3jG2ithKZ4HosuLyuMqntwYsvUZ&export=download",
    //     "author": 1,
    //     "author_names": {first_name, last_name}
    // }
    let data;
    if (info.type === 'post'){
        data = info
    } else {
        let avgRating = '';
        if (info.comments.length > 0){
            let totRating = 0;
            info.comments.forEach(x => totRating+=x)
            avgRating = `${Math.round((totRating/info.comments.length)*10) / 10}/10`
        }
        data = {
            "title": info.title,
            "rating": avgRating,
            "id": info.id,
            "type": info.type,
            "content": info.description,
            "date": info.date,
            "image": info.image,
            "author_names": {"first_name": info.made_by, "last_name": ""}
        }
    }

    let img_url = info.image.replace("download", "view")
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }

    return (
        <div onClick={() => toggleModal(data)} className="relative bg-white py-3 px-6 rounded-3xl w-80 h-80 my-4 shadow-xl hover:bg-gray-200 hover:cursor-pointer">
            <div className="mt-8">
                <div className="flex justify-between">
                    <span className="text-lg font-semibold my-2 hover:cursor-pointer">{data.title}</span>
                    {data?.rating && 
                        <span className="mt-3 text-gray-700 text-md">{data.rating}</span>
                    }
                </div>
                <div>
                    <img className="object-scale-down h-48 w-96" alt="" src={img_url}/>
                </div>
                <div className="flex justify-between">
                    <div className="my-2">
                        <p className="font-semibold text-base mb-2">{data.author_names.first_name} {data.author_names.last_name}</p>
                    </div>
                     <div className="my-2">
                        <p className="font-semibold text-gray-400 mb-2">{new Date(data.date).toLocaleDateString("en-US", options)}</p>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Post