import React, { useState } from "react";
import { getCommentsForPost } from "../../lib/requests_posts";
import { Comment, CommentForm } from "..";

const PostModal = ({toggleModal, info}) => {
    let img_url = info.image.replace("download", "view")
    let [ areCommentsShowing, setAreCommentsShowing] = useState(false)
    let [comments, setComments] = useState([])

    async function collectComments(){
        const [data, isError] = await getCommentsForPost(info.id, info.type)
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

    let commentElements = comments.map((c, idx) => <div key={idx}><Comment data={c}></Comment></div>)

    return (
        <div id="modal" className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
            <div className="relative top-20 mx-auto shadow-lg rounded-md bg-white">

                
                <div className="flex justify-between items-center bg-green-500 text-white text-xl rounded-t-md px-4 py-2">
                    <h3>{info.title}</h3>
                    <button onClick={toggleModal}>x</button>
                </div>

        
                <div className="max-h-72 overflow-y-scroll p-4">
                    <p>{info.content}</p>
                    <img src={img_url} alt=""></img>
                </div>

                
                <div className="px-4 py-2 border-t border-t-gray-500 flex justify-start items-center space-x-4 ">
                    <button onClick={toggleComments} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">{areCommentsShowing ? 'Hide' : 'Show'} Comments</button>
                </div>
                <div className="max-h-72 overflow-y-scroll p-4">
                    <CommentForm post_id = {info.id} type = {info.type}></CommentForm>
                    {areCommentsShowing && commentElements}
                </div>
            </div>
        </div>
    )
}

export default PostModal