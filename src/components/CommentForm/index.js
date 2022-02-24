import React, { useState } from "react";
import { createComment } from "../../lib/requests_posts";

const CommentForm = ({post_id}) => {
    const [comment, setComment] = useState('')

    function handleChange(event){
        setComment(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault()
        let payload = {
            "post": post_id,
            "content": comment,
            "author": JSON.parse(localStorage.getItem('authData')).email
        }
        let [data, isError] = await createComment(payload)
        setComment("")
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea id="comment" name="comment" onChange={handleChange} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            {/* <input type="text" name="comment" onChange={handleChange} /> */}
            <button type="submit" className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
            </button>
            {/* <input type="submit" value="Add Comment" /> */}
        </form>
    )
}

export default CommentForm;