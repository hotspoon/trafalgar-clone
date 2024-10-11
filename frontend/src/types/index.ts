export interface TourData {
  _id: string
  title: string
  description: string
  image: {
    asset: {
      _ref: string
    }
  }
  tripYears: number[]
  travel: {
    days: number
    countries: number
    cities: number
  }
  meals: {
    breakfasts: number
    dinners: number
  }
  accommodation: {
    nights: number
  }
  tripCode: string
  highlights: string[]
}
