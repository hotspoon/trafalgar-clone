"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import groq from "groq"
import client from "~/client"

interface SightseeingHighlights {
  title: string
  highlights: string[]
}

export default function SightseeingHighlights() {
  const [highlightsData, setHighlightsData] = useState<SightseeingHighlights | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHighlights = async () => {
      const query = groq`*[_type == "sightseeingHighlights"][0]{
        title,
        highlights
      }`
      const data = await client.fetch(query)
      console.log(data)
      setHighlightsData(data)
      setLoading(false)
    }

    fetchHighlights()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!highlightsData) {
    return <div>No data available</div>
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">About this trip</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-semibold text-green-700 mb-4">{highlightsData.title}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {highlightsData.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <MapPin className="text-green-700 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{highlight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
