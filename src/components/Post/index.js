import React, { useState } from "react";
import { getCommentsForPost } from "../../lib/requests_posts";
import { Comment, CommentForm } from "..";

const Post = ({info}) => {
    // {
    //     "id": 5,
    //     "title": "My first post",
    //     "content": "yah yah yah",
    //     "date": "2022-01-18T09:07:04.148787Z",
    //     "image": "https://drive.google.com/uc?id=1SiEvd3jG2ithKZ4HosuLyuMqntwYsvUZ&export=download",
    //     "author": 1
    // }
    let [ areCommentsShowing, setAreCommentsShowing] = useState(false)
    let [comments, setComments] = useState([])

    async function collectComments(){
        const [data, isError] = await getCommentsForPost(info.id)
        console.log(data);
        if (!isError){
            setComments(data)
        }
    }

    function toggleComments(){
        if (comments.length === 0){
            collectComments()
        }
        setAreCommentsShowing(prev => !prev)
    }
    let img_url = info.image.replace("download", "view")
    let commentElements = comments.map((c, idx) => <div key={idx}><Comment data={c}></Comment></div>)

    return (
        <div className="relative bg-white py-6 px-6 rounded-3xl w-80 h-80 my-4 shadow-xl">
            <div className="mt-8">
                <p className="text-lg font-semibold my-2">{info.title}</p>
                <div>
                    <img class="object-scale-down h-48 w-96" src={img_url}/>
                </div>
                <div className="flex justify-between">
                    <div className="my-2">
                        <p className="font-semibold text-base mb-2">Author</p>
                    </div>
                     <div className="my-2">
                        <p className="font-semibold text-gray-400 mb-2">Date</p>
                    </div>
                </div>
            </div>
        </div>
        )
        {/* <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-4">
            <h1>{info.title}</h1>
            <p>{info.content}</p>
            <img src={img_url} alt=""/>
            <button onClick = {toggleComments}>{areCommentsShowing ? 'Hide' : 'Show'} Comments</button>
            {areCommentsShowing && commentElements}
            <CommentForm post_id = {info.id}></CommentForm>
        </div> */}
}

export default Post