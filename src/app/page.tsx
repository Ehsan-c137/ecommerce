import Footer from "@/components/Footer/Footer"
import ScrollToTop from "@/components/UI/ScrollToTop/ScrollToTop"
import Header from "@/components/Header/Header"
import LandingPage from "@/components/LandingPage/LandingPage"

export default function Home() {
   return (
      <div className="background">
         <Header />
         <ScrollToTop />
         <LandingPage />
         <Footer />
      </div>
   )
}
