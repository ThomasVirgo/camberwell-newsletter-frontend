import React, { useState } from "react";
import { getCommentsForPost } from "../../lib/requests_posts";
import { Comment } from "..";

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
        <>
        <h1>{info.title}</h1>
        <p>{info.content}</p>
        <img src={img_url} alt=""/>
        <button onClick = {toggleComments}>{areCommentsShowing ? 'Hide' : 'Show'} Comments</button>
        {areCommentsShowing && commentElements}
        </>
    )
}

export default Post