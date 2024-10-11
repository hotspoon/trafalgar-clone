import groq from "groq"
import client from "~/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface TravelHighlights {
  title: string
  highlights: string[]
}

async function getTravelHighlights(): Promise<TravelHighlights> {
  return await client.fetch(groq`
    *[_type == "travelHighlights"][0]{
      title,
      highlights
    }
  `)
}

export default async function TravelHighlights() {
  const { title, highlights } = await getTravelHighlights()

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-[#8E2C2C]">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Specific transfer information can be found here:
        </p>
        <Button className="bg-[#8E2C2C] hover:bg-[#6E1C1C] text-white mt-2">
          Airport Transfers
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="text-[#8E2C2C] mt-1 flex-shrink-0" />
              <p className="text-gray-700">{highlight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
