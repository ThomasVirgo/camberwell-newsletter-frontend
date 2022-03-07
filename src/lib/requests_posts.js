import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/models'


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

async function getMeals(){
    try {
        const {data} = await axios.get(`${BASE_URL}/meals/`, {
            headers: tokenHeader()
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function getCommentsForPost(post_id, type){
    try {
        const {data} = await axios.get(`${BASE_URL}/${type === 'post' ? 'post_comments' : 'meal_comments'}/${post_id}/comments_on_post/`, {
            headers: tokenHeader()
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function createPost(formData){
    try {
        const {data} = await axios.post(`${BASE_URL}/posts/add_post_by_email/`, formData, {
            headers: {
                "Authorization": `Token ${localStorage.getItem('token')}`,
                "content-type": "multipart/form-data"
            }
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function createMeal(formData){
    try {
        const {data} = await axios.post(`${BASE_URL}/meals/`, formData, {
            headers: {
                "Authorization": `Token ${localStorage.getItem('token')}`,
                "content-type": "multipart/form-data"
            }
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}


async function createComment(payload, type){
    try {
        const {data} = await axios.post(`${BASE_URL}/${type === 'post' ? 'post_comments' : 'meal_comments'}/add_comment_by_email/`, payload, {
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

export { createPost, getPosts, getCommentsForPost, createComment, getMeals, createMeal }