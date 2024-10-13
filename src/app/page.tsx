"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Stepper from "@/app/components/Stepper";
import Headline from "@/app/components/Headline";
import Ask from "@/app/components/Ask";
import CheckCards from "@/app/components/CheckCards";
import Statistic from "@/app/components/Statistic";
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
      <Headline />
      <Stepper />
      <CheckCards />
      <Statistic />
      <Partners />
      <Faq />
      <Reviews />
    </main>
  );
}
