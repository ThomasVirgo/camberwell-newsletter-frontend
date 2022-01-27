import React, { useState, useEffect } from "react";
import { getPosts } from "../../lib/requests_posts";
import { Post } from "../../components";

const Posts = () => {
    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
        async function requestPosts(){
            const [data, isError] = await getPosts()
            if (!isError){
                setPosts(data)
            } else {
                console.log('unable to get posts');
            }
        }
        requestPosts()
    }, [])

    const postElements = posts.map((p, idx) => <div key={idx}><Post info={p}/></div>)
    return (
        <>
        <h1>Posts</h1>
        {postElements}
        </>
    )
}

export default Posts