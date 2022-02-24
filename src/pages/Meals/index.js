import React, { useState, useEffect } from "react";
import { getMeals } from "../../lib/requests_posts";
import { Post, PostModal, MealForm } from "../../components";

const Meals = () => {
    
    const [isFormShowing, setIsFormShowing] = useState(false)
    const [meals, setMeals] = useState([])
    const [isModalShowing, setIsModalShowing] = useState(false)
    const [modalData, setModalData] = useState(null)

    useEffect(()=>{
        async function requestMeals(){
            const [data, isError] = await getMeals()
            if (!isError){
                setMeals(data)
                console.log(data);
            } else {
                console.log('unable to get posts');
            }
        }
        requestMeals()
    }, [])

    function toggleForm(){
      setIsFormShowing(prev => !prev)
    }

    function toggleModal(info=null){
        setIsModalShowing(prev => !prev)
        setModalData(info)
    }

    const mealElements = meals.map((p, idx) => <div key={idx}><Post info={p} toggleModal={toggleModal}/></div>)

    return (
        <>
        <div className="bg-white shadow mt-2">
          <div className="max-w-7xl py-6 sm:px-6 lg:px-8">
            <button onClick={toggleForm} className="flex z-50 mx-2 shadow w-32 block border-blue-600 border-2 rounded-full focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white">
                <span>Add Meal +</span>
            </button>
          </div>
        </div>
        {isModalShowing && <PostModal toggleModal={toggleModal} info={modalData}/>}
        { isFormShowing && <MealForm toggleForm={toggleForm}/>}
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {mealElements}
            </div>
        </div>
        </>
    )
}

export default Meals;