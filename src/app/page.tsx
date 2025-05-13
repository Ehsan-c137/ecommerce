import Footer from "@/components/layout/Footer/Footer"
import ScrollToTop from "@/components/UI/ScrollToTop/ScrollToTop"
import Header from "@/components/layout/Header/Header"
import LandingPage from "@/app/Landing/LandingPage"

export default function Home() {
   return (
      <div className="background">
         <div className="fixed w-full top-0 z-10">
            <Header />
         </div>
         <ScrollToTop />
         <LandingPage />
         <Footer />
      </div>
   )
}
