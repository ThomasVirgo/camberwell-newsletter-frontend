import React, { useState } from "react";
import { getCommentsForPost } from "../../lib/requests_posts";
import { Comment, CommentForm } from '..'

const Post = ({info, toggleModal}) => {
    const [comments, setComments] = useState([])
    const [show, setShow] = useState(false)
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

    async function showComments(){
        const [commentList, isError] = await getCommentsForPost(data.id, data.type)
        if (!isError && comments.length === 0){
            setComments(commentList)
        }
        setShow(prev => !prev)
    }

    let commentElements = comments.map((c, i) => <Comment key={i} data={c}></Comment>)

    return (
        <>
        <div className="relative bg-white py-3 px-6 rounded-3xl w-80 my-4 shadow-xl hover:bg-gray-200 hover:cursor-pointer">
            <div className="mt-8">
                <div className="flex justify-between" onClick={() => toggleModal(data)}>
                    <span className="text-base font-semibold my-2 hover:cursor-pointer">{data.title}</span>
                    {data?.rating && 
                        <span className="mt-3 text-gray-700 text-md">{data.rating}</span>
                    }
                </div>
                <div onClick={() => toggleModal(data)}>
                    <img className="object-scale-down h-48 w-96" alt="" src={img_url}/>
                </div>
                <div className="flex justify-between">
                    <div className="my-2" onClick={() => toggleModal(data)}>
                        <p className="font-semibold text-base mb-2">{data.author_names.first_name}</p>
                    </div>
                    <div className="my-2" onClick={() => toggleModal(data)}>
                        <p className="font-semibold text-gray-400 mb-2 text-sm">{new Date(data.date).toLocaleDateString("en-US", options)}</p>
                    </div>
                    <div className="flex gap-1" onClick={showComments}>
                        <span>{info?.comments ? info.comments.length : ''}</span>
                        <svg className="w-8 h-8" >
                        <g>
                            <path style={{"fill":"#010002"}} d="M27.184,1.605H2.156C0.967,1.605,0,2.572,0,3.76v17.572c0,1.188,0.967,2.155,2.156,2.155h13.543
                                l5.057,3.777c0.414,0.31,0.842,0.468,1.268,0.468c0.789,0,1.639-0.602,1.637-1.923v-2.322h3.523c1.188,0,2.154-0.967,2.154-2.155
                                V3.76C29.338,2.572,28.371,1.605,27.184,1.605z M27.34,21.332c0,0.085-0.068,0.155-0.154,0.155h-5.523v3.955l-5.297-3.956H2.156
                                c-0.086,0-0.154-0.07-0.154-0.155V3.759c0-0.085,0.068-0.155,0.154-0.155v0.001h25.029c0.086,0,0.154,0.07,0.154,0.155
                                L27.34,21.332L27.34,21.332z M5.505,10.792h4.334v4.333H5.505C5.505,15.125,5.505,10.792,5.505,10.792z M12.505,10.792h4.334v4.333
                                h-4.334V10.792z M19.505,10.792h4.334v4.333h-4.334V10.792z"/>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
        
        {show && <CommentForm post_id={data.id} type={data.type}/>}
        {show && commentElements}
        </div>
        </>
        )
}

export default Post