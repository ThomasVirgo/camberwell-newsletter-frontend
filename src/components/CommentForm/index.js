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
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="comment" onChange={handleChange} />
            <input type="submit" value="Add Comment" />
        </form>
    )
}

export default CommentForm;