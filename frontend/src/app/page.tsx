import FAQSection from "@/components/section/faq-section"
import ItalyTourSection from "@/components/section/italy-tour"
import ItinerarySection from "@/components/section/itinerary"
import SightseeingHighlights from "@/components/section/sightseeing-highlight"
import TravelHighlights from "@/components/section/travel-highlight"

export default function Home() {
  return (
    <div>
      <p>Hello world!</p>
      <div className="py-4">
        <ItalyTourSection />
      </div>

      <div className="py-4">
        <ItinerarySection />
      </div>

      <div className="py-4">
        <SightseeingHighlights />
      </div>
      <div className="py-4">
        <TravelHighlights />
      </div>
      <div className="py-4">
        <FAQSection />
      </div>
    </div>
  )
}
