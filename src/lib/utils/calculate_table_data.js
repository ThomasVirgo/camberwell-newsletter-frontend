function calculateStats(meals){
    const names = ['Tom', 'Charlie', 'Luke', 'Robin', 'George', 'Amber']

    class UserStats {
        constructor(meals, name) {
          this.name = name
          this.myMeals = meals.filter(meal => meal.made_by === name)
          this.mealsMade = this.myMeals.length
          this.avgRating = 0
          this.avgComments = 0
          this.latestMeal = '-'
          this.calcAverages()
          this.getLatestMeal()
        }

        calcAverages(){
            if (this.myMeals.length === 0){
                return
            }
            let total = 0
            let count = 0
            this.myMeals.forEach(meal => meal?.comments.forEach(c => {
                total += c
                count += 1
            }))
            let avgRating = Math.round((total/count) * 100) / 100 
            let avgComments = Math.round((count/this.myMeals.length) * 100) / 100 
            this.avgRating = avgRating
            this.avgComments = avgComments
        }

        getLatestMeal(){
            if (this.myMeals.length === 0){
                return
            }
            let date = this.myMeals[0].date
            let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
            this.latestMeal = new Date(date).toLocaleDateString("en-US", options)
        }
      }
        
    
    let statsDict = {}
    names.forEach(name => {
        let userStats = new UserStats(meals, name)
        statsDict[name] = userStats
    })

    return statsDict
}


export default calculateStats