import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  CalendarIcon,
  BedDoubleIcon,
  UtensilsIcon,
  MapIcon,
  InfoIcon,
  ChevronRightIcon,
  CalendarDays,
  ShieldCheck,
  Calendar
} from "lucide-react"
import groq from "groq"
import client from "~/client"
import imageUrlBuilder from "@sanity/image-url"
import { TourData } from "@/types"

const highlightsData = [
  {
    icon: <CalendarDays size={20} />,
    text: "Low deposit from $200"
  },
  {
    icon: <ShieldCheck size={20} />,
    text: "Deposit protection"
  },
  {
    icon: <Calendar size={20} />,
    text: "Free booking changes"
  }
]

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source)
}

async function getTourData(): Promise<TourData | null> {
  const query = groq`*[_type == "topTourSummary"][0]`
  const data = await client.fetch(query)
  return data
}

export default async function ItalyTourSection() {
  const tourData = await getTourData()

  if (!tourData) {
    return <div>No data available</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="itinerary" className="text-primary">
            Your itinerary
          </TabsTrigger>
          <TabsTrigger value="dates">Dates & prices</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="itinerary" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="order-2 md:order-1 flex items-stretch">
              <Image
                src={urlFor(tourData.image.asset._ref).width(600).height(400).url()}
                alt={tourData.title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <Card className="order-1 md:order-2 flex items-stretch">
              <CardContent className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                    <CalendarIcon className="text-muted-foreground flex-shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Trip Year</span>
                    {tourData.tripYears.map((year) => (
                      <Button key={year} variant="outline" className="ml-2 flex-shrink-0">
                        {year}
                      </Button>
                    ))}
                  </div>
                  <h1 className="text-2xl font-bold mb-4">{tourData.title}</h1>
                  <p className="text-muted-foreground mb-6">{tourData.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Travel</p>
                        <p className="text-sm text-muted-foreground">
                          {tourData.travel.days} days, {tourData.travel.countries} countries and{" "}
                          {tourData.travel.cities} cities{" "}
                          <InfoIcon className="inline-block w-4 h-4" />
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDoubleIcon className="text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Accommodation</p>
                        <p className="text-sm text-muted-foreground">
                          {tourData.accommodation.nights} nights
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <UtensilsIcon className="text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Meals</p>
                        <p className="text-sm text-muted-foreground">
                          {tourData.meals.breakfasts} Breakfasts, {tourData.meals.dinners} Dinners
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapIcon className="text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Itinerary</p>
                        <p className="text-sm text-muted-foreground underline">
                          View day-by-day trip itinerary
                        </p>
                      </div>
                    </div>
                  </div>
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold mb-2">
                            Looking to book in a group of 15 or more?
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Deals, savings and exclusive private touring options available plus if
                            you need a different date or itinerary change we can create a custom
                            trip. Contact us for more details
                          </p>
                        </div>
                        <ChevronRightIcon className="w-8 h-8" />
                      </div>
                    </CardContent>
                  </Card>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Trip code: {tourData.tripCode}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center space-x-8 pt-10">
            {highlightsData.map((highlight, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-gray-200 rounded-full p-4">{highlight.icon}</div>
                <p className="mt-2 text-center">{highlight.text}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
