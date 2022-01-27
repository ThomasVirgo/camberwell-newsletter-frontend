import React, { useState, useEffect } from "react";
import { getPosts } from "../../lib/requests_posts";

const Posts = () => {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        async function requestPosts(){
            const [data, isError] = await getPosts()
            if (!isError){
                setPosts(data)
                console.log(data);
            } else {
                console.log('unable to get posts');
            }
        }
        requestPosts()
    }, [])
    return (
        <>
        <h1>Posts</h1>
        </>
    )
}

export default Posts