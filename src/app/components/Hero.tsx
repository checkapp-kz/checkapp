"use client"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleScroll = () => {
    const checkCardsSection = document.getElementById('check-cards')
    if (checkCardsSection) {
      checkCardsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация для заголовка
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })

      // Анимация для подзаголовка
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      })

      // Анимация для кнопки
      gsap.from(".hero-button", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
      })

      // Hover эффект для кнопки
      if (buttonRef.current) {
        buttonRef.current.addEventListener('mouseenter', () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            backgroundColor: "#1666a0",
            boxShadow: "0 10px 25px rgba(29, 124, 188, 0.3)"
          })
        })

        buttonRef.current.addEventListener('mouseleave', () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.in",
            backgroundColor: "#1D7CBC",
            boxShadow: "0 0 0 rgba(29, 124, 188, 0)"
          })
        })
      }

      // Параллакс эффект при скролле
      gsap.to(containerRef.current, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative flex items-center bg-[#f8f9fa] overflow-hidden py-40">
      <div 
        ref={containerRef}
        className="container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={headingRef}
            className="text-3xl md:text-6xl font-bold mb-6 leading-tight"
          >
            {/* <img className="mx-auto" alt="logo" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" src="public/images/checkapp.png"></img> */}
            <br/>
            Чекапы «без воды»
          </h1>
          <p
            ref={textRef}
            className="text-xl md:text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Только доказательная медицина. Только действительно нужные анализы.<br />
            Получи свой персонализированный план обследования от консилиума врачей всего от 4990 тг.
          </p>
          <Button 
            ref={buttonRef}
            onClick={handleScroll}
            className="hero-button bg-[#1D7CBC] hover:bg-[#1D7CBC] text-white px-8 py-6 text-lg rounded-full transition-shadow duration-300"
          >
            Узнать больше
          </Button>
        </div>
      </div>
    </section>
  )
} 