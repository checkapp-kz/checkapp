"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Hero from "@/app/components/Hero";
import Stepper from "@/app/components/Stepper";
import CheckCards from "@/app/components/CheckCards";
import Partners from "@/app/components/Partners";
import Faq from "@/app/components/Faq";
import Reviews from "@/app/components/Reviews";

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 700,
    })
  }, [])

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Stepper />
      <CheckCards />
      <Partners />
      <Faq />
      <Reviews />
    </main>
  );
}
