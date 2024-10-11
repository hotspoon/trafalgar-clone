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
    <Card className="w-full mx-auto grid md:grid-cols-3">
      <CardHeader className="md:col-span-1">
        <CardTitle className="text-xl font-bold">About this trip</CardTitle>
        <CardTitle className="text-normal font-bold text-green-700">
          {highlightsData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlightsData.highlights.map((highlight, index) => (
          <div key={index} className="flex items-start space-x-3">
            <MapPin className="text-green-700 flex-shrink-0" />
            <p className="text-gray-700 text-sm">{highlight}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
