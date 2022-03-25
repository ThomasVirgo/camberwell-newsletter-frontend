import React from 'react';


const TableRow = ({name, stats}) => {
    // data is a list of meals
    let userStats = stats[name]
    
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {name}
            </th>
            <td className="px-6 py-4">
                {userStats?.mealsMade}
            </td>
            <td className="px-6 py-4">
                {userStats?.avgRating}
            </td>
            <td className="px-6 py-4">
                {userStats?.avgComments}
            </td>
            <td className="px-6 py-4">
                {userStats?.latestMeal}
            </td>
        </tr>
    )
}

export default TableRow;