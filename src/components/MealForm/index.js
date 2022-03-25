import React, {useState} from "react";
import { createMeal, sendNewMealEmail } from "../../lib/requests_posts";

const MealForm = ({toggleForm}) => {
    const [postInput, setPostInput] = useState({
        "title": "",
        "made_by": "Tom",
        "description":"",
        "image": null
    })

    const [loading, setLoading] = useState(false)

    async function handleSubmit(event){
        // need to wait for the post to be successful before doing anything else, i.e. freeze page
        event.preventDefault()
        console.log(postInput);
        let formData = new FormData();
        formData.append('image', postInput.image, postInput.image.name);
        formData.append('title', postInput.title);
        formData.append('made_by', postInput.made_by);
        formData.append('description', postInput.description);
        setLoading(true)
        let [data, isError] = await createMeal(formData)
        setLoading(false)
        setPostInput({
            "title": "",
            "description": "",
            "made_by": "Tom",
            "image": null
        })
        toggleForm()
        console.log(data);
        if (!isError){
            let emailPayload = {
                "title": data.title,
                "description": data.description,
                "image": data.image.replace("download", "view"),
                "made_by": data.made_by,
            }
            let [emailData, error] = await sendNewMealEmail(emailPayload)
            console.log(emailData);
        }
    }

    // {
    //     "id": 6,
    //     "type": "meal",
    //     "comments": [],
    //     "title": "Sausage and Mash",
    //     "made_by": "George",
    //     "description": "Creamy, and yum",
    //     "date": "2022-03-11T09:13:58.553995Z",
    //     "image": "https://drive.google.com/uc?id=14hnpQ_xCNkMcbCeLcmbqqO1Axh4ydzRp&export=download"
    // }

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

    return (
        <div className="mt-2 mx-auto">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <input onChange={handleChange} type="text" maxLength={26} name="title" id="title" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="delicious sausage and bean pasta..."/>
                            </div>
                        </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="made_by" className="block text-sm font-medium text-gray-700">
                            Made by
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <select name="made_by" value={postInput.made_by} onChange={handleChange}>
                                <option value="Tom">Tom</option>
                                <option value="George">George</option>
                                <option value="Amber">Amber</option>
                                <option value="Charlie">Charlie</option>
                                <option value="Robin">Robin</option>
                                <option value="Luke">Luke</option>
                            </select>
                            {/* <input onChange={handleChange} type="text" name="made_by" id="made_by" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Charlie Mabbutt"/> */}
                            </div>
                        </div>
                        </div>

                        <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div className="mt-1">
                            <textarea onChange={handleChange} id="description" name="description" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Not bad, could have done with less beans"></textarea>
                        </div>
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Photo
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        {postInput.image && 
                        <div>
                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(postInput.image)} />
                            <br />
                            <button onClick={()=>setPostInput({...postInput, "image": null})} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Remove</button>
                        </div>}
                            <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="True">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input onChange={handleChange} id="image" name="image" type="file" className="sr-only"/>
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        {!loading ? 
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                        </button> :
                        <p>Saving post, please wait ...</p>
                    }
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default MealForm;