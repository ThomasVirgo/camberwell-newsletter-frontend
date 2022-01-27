import React from "react";

const Post = ({info}) => {
    // {
    //     "id": 5,
    //     "title": "My first post",
    //     "content": "yah yah yah",
    //     "date": "2022-01-18T09:07:04.148787Z",
    //     "image": "https://drive.google.com/uc?id=1SiEvd3jG2ithKZ4HosuLyuMqntwYsvUZ&export=download",
    //     "author": 1
    // }
    let img_url = info.image.replace("download", "view")
    return (
        <>
        <h1>{info.title}</h1>
        <p>{info.content}</p>
        <img src={img_url} alt=""/>
        </>
    )
}

export default Post