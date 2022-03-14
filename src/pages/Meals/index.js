import React, { useState, useEffect } from "react";
import { getMeals } from "../../lib/requests_posts";
import { Post, PostModal, MealForm, LoadingBar } from "../../components";

const Meals = () => {
    
    const [isFormShowing, setIsFormShowing] = useState(false)
    const [meals, setMeals] = useState([])
    const [isModalShowing, setIsModalShowing] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('Date')
    const [filteredMeals, setFilteredMeals] = useState([])

    useEffect(()=>{
        async function requestMeals(){
            const [data, isError] = await getMeals()
            if (!isError){
                setMeals(data)
                setFilteredMeals(data)
                setLoading(false)
            } else {
                console.log('unable to get posts');
            }
        }
        requestMeals()
    }, [])

    function handleChange(event){
        setFilter(event.target.value)
        let nameArray = ['Tom', 'George', 'Amber', 'Charlie', 'Luke', 'Robin']
        if (nameArray.includes(event.target.value)){
            let newMeals = meals.filter(m => m.made_by === event.target.value)
            setFilteredMeals(newMeals)
        }
        if (event.target.value === 'Rating_high' || event.target.value === 'Rating_low'){
            console.log('starting sort');
            let calc_avg = (arr, type) => {
                if (arr.comments.length === 0 && type === 'high'){
                    return 0
                }
                if (arr.comments.length === 0 && type === 'low'){
                    return Number.POSITIVE_INFINITY
                }
                return arr.comments.reduce( ( p, c ) => p + c, 0 ) / arr.comments.length
            }
            let newMeals = [...meals]
            if (event.target.value === 'Rating_high'){
                newMeals.sort((a,b) => calc_avg(b, 'high') - calc_avg(a, 'high'))
            } else {
                newMeals.sort((a,b) => calc_avg(a, 'low') - calc_avg(b, 'low'))
            }
            setFilteredMeals(newMeals)
            console.log('finished sort');
        }
        if (event.target.value === 'Date'){
            setFilteredMeals(meals)
        }
    }

    function toggleForm(){
      setIsFormShowing(prev => !prev)
    }

    function toggleModal(info=null){
        setIsModalShowing(prev => !prev)
        setModalData(info)
    }

    const mealElements = filteredMeals.map((p, idx) => <div key={idx}><Post info={p} toggleModal={toggleModal}/></div>)

    return (
        <>
        <div className="bg-white shadow mt-2">
          <div className="max-w-7xl py-6 sm:px-6 lg:px-8 flex">
            <div>
                <button onClick={toggleForm} className="flex z-50 mx-2 shadow w-32 block border-blue-600 border-2 rounded-full focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white">
                    <span>Add Meal +</span>
                </button>
            </div>
            <div className="ml-2">
                <label htmlFor="meal_filter" className="block text-sm font-medium text-gray-700"> Filter by: </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <select name="meal_filter" value={filter} onChange={handleChange}>
                        <option value="Date">Date</option>
                        <option value="Rating_high">Rating - high to low</option>
                        <option value="Rating_low">Rating - low to high</option>
                        <option value="Tom">Tom</option>
                        <option value="George">George</option>
                        <option value="Amber">Amber</option>
                        <option value="Charlie">Charlie</option>
                        <option value="Robin">Robin</option>
                        <option value="Luke">Luke</option>
                    </select>
                </div>
            </div>
          </div>
        </div>
        {isModalShowing && <PostModal toggleModal={toggleModal} info={modalData}/>}
        {isFormShowing && <MealForm toggleForm={toggleForm}/>}
        {loading && <LoadingBar />}
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {mealElements}
            </div>
        </div>
        </>
    )
}

export default Meals;
