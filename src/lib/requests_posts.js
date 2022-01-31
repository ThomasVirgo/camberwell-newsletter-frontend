import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/models'

async function createPost(payload){
    try {
        const {data} = await axios.post(`${BASE_URL}/posts/`, payload, {
            headers: tokenHeader()
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function getPosts(){
    try {
        const {data} = await axios.get(`${BASE_URL}/posts/`, {
            headers: tokenHeader()
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function getCommentsForPost(post_id){
    try {
        const {data} = await axios.get(`${BASE_URL}/post_comments/${post_id}/comments_on_post/`, {
            headers: tokenHeader()
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

function tokenHeader(){
    return { "Authorization": `Token ${localStorage.getItem('token')}` }
}

export { createPost, getPosts, getCommentsForPost }