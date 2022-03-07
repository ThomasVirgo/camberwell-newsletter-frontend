import React, { useState } from "react";
import { createComment } from "../../lib/requests_posts";

const CommentForm = ({post_id, type}) => {
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(10)

    function handleChange(event){
        setComment(event.target.value)
    }

    function ratingChange(event){
        setRating(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault()
        let payload;
        if (type === 'post'){
            payload = {
                "post": post_id,
                "content": comment,
                "author": JSON.parse(localStorage.getItem('authData')).email
            }
        } else {
            payload = {
                "meal": post_id,
                "content": comment,
                "rating": rating,
                "author": JSON.parse(localStorage.getItem('authData')).email
            }
        }
        console.log(payload);
        let [data, isError] = await createComment(payload, type)
        setComment("")
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea id="comment" name="comment" onChange={handleChange} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            {type === 'meal' && 
            <div className="relative pt-1">
                <label for="customRange3" className="form-label">Rating: {rating}/10</label>
                <input onChange={ratingChange} type="range" className="form-range appearance-none w-full h-6 p-0 bg-gray-300 rounded-md focus:outline-none focus:ring-0 focus:shadow-none" min="0" max="10" step="1"/>
            </div>
            }
            <button type="submit" className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
            </button>
        </form>
    )
}

export default CommentForm;