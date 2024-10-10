"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import DocList from "@/app/components/DocList";

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 700,
    })
  }, []);

  return (
    <main className="overflow-x-hidden">
      <DocList />
    </main>
  );
}
