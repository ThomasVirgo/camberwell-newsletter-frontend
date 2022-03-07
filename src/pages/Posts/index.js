import React, { useState, useEffect } from "react";
import { getPosts } from "../../lib/requests_posts";
import { Post, PostModal, PostForm, LoadingBar } from "../../components";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isFormShowing, setIsFormShowing] = useState(false)
    const [isModalShowing, setIsModalShowing] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    
    useEffect(()=>{
        async function requestPosts(){
            const [data, isError] = await getPosts()
            if (!isError){
                setPosts(data)
                setLoading(false)
            } else {
                console.log('unable to get posts');
            }
        }
        requestPosts()
    }, [])


    function toggleForm(){
        setIsFormShowing(prev => !prev)
    }

    function toggleModal(info=null){
        setIsModalShowing(prev => !prev)
        setModalData(info)
    }

    const postElements = posts.map((p, idx) => <div key={idx}><Post info={p} toggleModal={toggleModal}/></div>)
    return (
        <>
        <div className="bg-white shadow mt-2">
          <div className="max-w-7xl py-6 sm:px-6 lg:px-8">
            <button onClick={toggleForm} className="flex z-50 mx-2 shadow w-32 block border-blue-600 border-2 rounded-full focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white">
                <span>New Post +</span>
            </button>
          </div>
        </div>
        {isModalShowing && <PostModal toggleModal={toggleModal} info={modalData}/>}
        

        { isFormShowing && <PostForm/>}

        
        {loading && <LoadingBar />}

        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {postElements}
            </div>
        </div>
        </>
    )
}

export default Posts