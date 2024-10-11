"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronDown, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import groq from "groq"
import client from "~/client"
import imageUrlBuilder from "@sanity/image-url"

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source)
}

interface ItineraryDay {
  day: number
  title: string
  description: string
  image: any
  locations: string
  activities: string[]
  badge?: {
    text: string
    variant: string
  }
}

export default function Component() {
  const [itineraryData, setItineraryData] = React.useState<ItineraryDay[]>([])
  const [expandAll, setExpandAll] = React.useState(false)

  React.useEffect(() => {
    const fetchItineraryData = async () => {
      const query = groq`*[_type == "dayByDayItinerary"] | order(day asc) {
        day,
        title,
        description,
        image,
        locations,
        activities,
        badge
      }`
      const data = await client.fetch(query)
      setItineraryData(data)
    }

    fetchItineraryData()
  }, [])

  const toggleExpandAll = () => {
    setExpandAll(!expandAll)
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Day by day itinerary</CardTitle>
        <p className="text-sm text-muted-foreground">
          {itineraryData.length} days itinerary trip from Rome to Rome visiting 2 countries and 15
          cities
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download itinerary
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print itinerary
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleExpandAll}>
            {expandAll ? "Collapse" : "Expand"} all days
            <ChevronDown
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                expandAll ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          value={expandAll ? itineraryData.map((_, i) => `item-${i}`) : undefined}
        >
          {itineraryData.map((day, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex gap-4 w-full">
                  <Image
                    src={urlFor(day.image).width(300).height(150).url()}
                    alt={day.title}
                    width={150}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">Day {day.day}</h3>
                      {day.badge && (
                        <Badge
                          variant={
                            day.badge.variant as "default" | "secondary" | "destructive" | "outline"
                          }
                        >
                          {day.badge.text}
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-xl font-bold">{day.title}</h4>
                    <p className="text-sm text-muted-foreground">{day.locations}</p>
                    <div className="flex gap-2 mt-2">
                      {day.activities.map((activity, actIndex) => (
                        <span key={actIndex} className="text-xs bg-muted px-2 py-1 rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mt-2 text-muted-foreground">{day.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
