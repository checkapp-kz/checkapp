import {useLayoutEffect, useRef, useState} from "react";
import Image from "next/image";
import Stepper1 from "@/public/stepper/1.svg";
import Stepper2 from "@/public/stepper/2.svg";
import Stepper3 from "@/public/stepper/3.svg";
import Stepper4 from "@/public/stepper/4.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const steps = gsap.utils.toArray(".step-section");

    let stepTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".stepper-container",
        start: "top top",
        end: "+=1000",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const newActiveStep =
            Math.round(self.progress * (steps.length - 1)) + 1;
          setActiveStep(newActiveStep);
        },
      },
    });

    gsap.fromTo(
      headingRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2, // Увеличили продолжительность для плавности
        ease: "power2.out", // Добавили функцию плавности
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 0.5, // Настроили scrub для плавного перехода
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const stepList = [
    {
      id: 1,
      title: "Консилиум",
      content: (
        <>
          <p className="text-[#4B5162] text-xl max-w-[560px]">
            <span className="font-semibold">Качественный сбор анамнеза </span>
            – ключ к точной диагностике. Мы объединили лучших специалистов доказательной медицины в консилиумы, чтобы разработать и регулярно обновлять наши онлайн-анкеты.
          </p>
          <Image src={Stepper1} alt="phone-img" className="-z-10 mt-8" />
        </>
      ),
    },
    {
      id: 2,
      title: "Удобное анкетирование",
      content: (
        <>
          <p className="text-[#4B5162] text-xl max-w-[560px]">
            Наши онлайн-анкеты с персонализированным алгоритмом
            <span className="font-semibold"> заменяют первичный прием </span>
            сразу у нескольких специалистов.
          </p>
          <Image src={Stepper2} alt="call-img" className="mt-8" />
        </>
      ),
    },
    {
      id: 3,
      title: "Персональный план",
      content: (
        <>
          <p className="text-[#4B5162] text-xl max-w-[560px]">
            Всего за 5 минут вы получите
            <span className="font-semibold"> индивидуальный план обследования</span>
            , разработанный на основе ваших ответов.
          </p>
          <Image src={Stepper3} alt="call-img" className="mt-8" />
        </>
      ),
    },
    {
      id: 4,
      title: "Прозрачность и свобода выбора",
      content: (
        <>
          <p className="text-[#4B5162] text-xl max-w-[560px]">
            Вы сами выбираете лаборатории и врачей, следуя
            <span className="font-semibold"> принципам прозрачности и независимости </span>
            CheckApp.
          </p>
          <Image src={Stepper4} alt="call-img" className="mt-8" />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center mt-16">
        <h1 className="text-[#1C1F25] text-3xl lg:text-5xl font-semibold w-full lg:w-2/3 text-center">
          CheckApp - персонализированные чекапы от консилиумов врачей
        </h1>
      </div>
      <div className="stepper-container hidden lg:flex flex-col items-start justify-center gap-y-8 min-h-dvh">
        <div className="container mx-auto">
          <h1
            ref={headingRef}
            className="text-3xl text-[#1C1F25] font-semibold ml-28"
          >
            Как работает CheckApp?
          </h1>
        </div>
        <div className="container mx-auto flex items-center gap-x-16">
          <div className="flex flex-col items-end gap-y-16">
            {stepList.map((step) => (
              <div
                key={step.id}
                className="flex items-center justify-between w-full"
              >
                <div
                  className={cn(
                    "rounded-full w-10 h-10 flex items-center justify-center bg-[#1D7CBC]",
                    activeStep === step.id ? "bg-[#1D7CBC]" : "bg-[#E6E6E6]"
                  )}
                >
                  <p className="text-white text-xl font-medium">{step.id}</p>
                </div>
                <h1
                  className={`font-bold text-4xl w-[90%] uppercase leading-none cursor-pointer text-right ${
                    activeStep === step.id
                      ? "text-[#1D7CBC]"
                      : "text-[#E6E6E6]"
                  }`}
                >
                  {step.title}
                </h1>
              </div>
            ))}
          </div>
          <div className="w-1/2 relative h-[500px] flex flex-col justify-center">
            {stepList.map((step) => (
              <div
                key={step.id}
                className={`step-section ${
                  activeStep === step.id
                    ? "opacity-0 animate-fadeinright"
                    : "hidden"
                }`}
              >
                {step.content}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex lg:hidden flex-col mt-24 px-4">
        {stepList.map((step) => (  
          <div
            key={step.id}
            data-aos={step.id%2==0 ? 'fade-left' : 'fade-right'}
            className="flex flex-col items-center mt-12">
            <h1 className="text-[#1C1F25] uppercase text-2xl font-bold text-left w-full">
              {step.title}
            </h1>
            <div className="flex flex-col items-center mt-4 gap-y-4">
              {step.content}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
