"use client"

import { useState, useEffect } from "react"
import groq from "groq"
import client from "~/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface FAQData {
  title: string
  faqs: FAQ[]
}

async function getFAQData(): Promise<FAQData> {
  return await client.fetch(groq`
    *[_type == "faq"][0]{
      title,
      faqs[]{
        question,
        answer
      }
    }
  `)
}

export default function FAQSection() {
  const [faqData, setFaqData] = useState<FAQData | null>(null)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isAllExpanded, setIsAllExpanded] = useState(false)

  useEffect(() => {
    getFAQData().then(setFaqData)
  }, [])

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedItems([])
    } else {
      setExpandedItems(faqData?.faqs.map((_, index) => `item-${index}`) || [])
    }
    setIsAllExpanded(!isAllExpanded)
  }

  if (!faqData) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-3xl font-bold">{faqData.title}</CardTitle>
        <Button variant="ghost" className="text-gray-500" onClick={toggleExpandAll}>
          {isAllExpanded ? "Collapse All" : "Expand All"}
          {isAllExpanded ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          value={expandedItems}
          onValueChange={setExpandedItems}
          className="w-full"
        >
          {faqData.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left bg-[#2d5a7b] text-white font-bold px-4 my-2">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
