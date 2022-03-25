import React, { useState, useEffect } from "react";
import { getMeals } from "../../lib/requests_posts";
import { TableRow } from "../../components";
import calculateStats from "../../lib/utils/calculate_table_data";


const Stats = () => {
    const [stats, setStats] = useState({})
    const names = ['Tom', 'Charlie', 'Luke', 'Robin', 'George', 'Amber']
    const [sortedNames, setSortedNames] = useState(names)

    const rowElements = sortedNames.map((name, idx) => 
        <TableRow key={idx} name={name} stats={stats}></TableRow>
    )

    useEffect(()=>{
        async function collectMeals(){
            const [data, isError] = await getMeals()
            if (!isError){
                let newStats = calculateStats(data)
                setStats(newStats)
            } else {
                console.log('unable to collect meals');
            }
        }
        collectMeals()
    }, [])


    function sortNames(by){
        let newNames = [...names]
        newNames.sort((a,b) => {
            let firstVal = stats[a][by]
            let secondVal = stats[b][by]
            return secondVal - firstVal
        })
        setSortedNames(newNames)
    }

    return (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name 
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Meals Made <span onClick={() => sortNames('mealsMade')} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-5 hover:cursor-pointer">Sort</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Avg Rating <span onClick={() => sortNames('avgRating')} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-5 hover:cursor-pointer">Sort</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Avg No Comments <span onClick={() => sortNames('avgComments')} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-5 hover:cursor-pointer">Sort</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Latest Meal
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rowElements}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Stats;