"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import CompanyForm from "@/app/components/CompanyForm";

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 700,
    })
  }, []);

  return (
    <main className="overflow-x-hidden">
      <CompanyForm />
    </main>
  );
}
