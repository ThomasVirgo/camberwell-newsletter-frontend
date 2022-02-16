import React, { useState, useEffect } from "react";
import { getPosts, createPost } from "../../lib/requests_posts";
import { Post } from "../../components";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isFormShowing, setIsFormShowing] = useState(false)
    const [postInput, setPostInput] = useState({
        "title": "",
        "content": "",
        "image": null
    })
    
    
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

    async function handleSubmit(event){
        // need to wait for the post to be successful before doing anything else, i.e. freeze page
        event.preventDefault()
        console.log(postInput);
        let formData = new FormData();
        formData.append('image', postInput.image, postInput.image.name);
        formData.append('title', postInput.title);
        formData.append('content', postInput.content);
        formData.append('author', JSON.parse(localStorage.getItem('authData')).email)
        let [data, isError] = await createPost(formData)
        console.log(data);
    }

    function handleChange(event){
        if (event.target.name === 'image'){
            let newInput = {
                ...postInput,
                "image": event.target.files[0]
            }
            setPostInput(newInput)
            return
        }
        let newInput = {...postInput}
        newInput[event.target.name] = event.target.value
        setPostInput(newInput)
    }

    function toggleForm(){
        setIsFormShowing(prev => !prev)
    }

    const postElements = posts.map((p, idx) => <div key={idx}><Post info={p}/></div>)
    return (
        <>
        <h1>Posts</h1>
        <button onClick={toggleForm}>Add new post +</button>

        { isFormShowing &&
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder="title" name='title' onChange={handleChange}></input>
            <textarea name="content" rows="4" cols="50" onChange={handleChange}></textarea>
            <input type='file' name='image' onChange={handleChange}></input>
            <input type='submit' value='Submit'></input>
        </form>}

        {postInput.image && isFormShowing && 
        <div>
            <img alt="not fount" width={"250px"} src={URL.createObjectURL(postInput.image)} />
            <br />
            <button onClick={()=>setPostInput({...postInput, "image": null})}>Remove</button>
        </div>}
        
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {postElements}
            </div>
        </div>
        </>
    )
}

export default Posts