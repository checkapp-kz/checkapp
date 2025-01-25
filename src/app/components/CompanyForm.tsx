"use client"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCallback, useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import gsap from 'gsap';
import { cn } from "@/lib/utils";

const StyledButton = ({ ...props }) => (
  <Button
    className={cn(
      "bg-white text-[#1D7CBC] hover:bg-white/90 rounded-lg h-14 text-lg font-medium transition-all hover:scale-[1.02] w-full",
    )}
    {...props}
  />
);

const CompanyForm = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация левой части
      gsap.from(contentRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Анимация правой части (формы)
      gsap.from(formFieldsRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3
      });

      // Анимация появления полей формы
      const inputs = formFieldsRef.current?.querySelectorAll('input, textarea');
      gsap.from(inputs, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
      });

      // Отдельная анимация для заголовка и кнопки
      const heading = formFieldsRef.current?.querySelector('h1');
      const button = formFieldsRef.current?.querySelector('button');

      gsap.from([heading, button], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.8,
        clearProps: "all" // Очищаем inline стили после анимации
      });
    });

    return () => ctx.revert();
  }, []);

  const sendMail = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch('https://backend-checkapp.vercel.app/partner/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        mail: mail,
        message: message
      })
    }).finally(() => {
      setIsLoading(false)
      setName('');
      setMail('');
      setMessage('');
      toast({
        variant: 'success',
        title: 'Заявка успешно отправлена!',
        description: 'Мы свяжемся с вами в ближайшее время для обсуждение партнерства!'
      });
    });
  }, [mail, message, name]);

  return (
    <section className="container mx-auto py-12 px-4 lg:px-0">
      <div 
        ref={formRef}
        className="flex items-stretch flex-col lg:flex-row justify-center rounded-2xl overflow-hidden shadow-xl"
      >
        <div 
          ref={contentRef}
          className="w-full lg:w-1/2 bg-[#F4F7FA] p-8 lg:p-12 flex flex-col gap-y-6"
        >
          <h1 className="text-3xl font-bold text-[#1C1F25]">Хотите поработать с нами?</h1>
          <p className="text-[#4B5162]">
            Сегодня забота о здоровье сотрудников становится приоритетом для успешных компаний, стремящихся к
            долгосрочному развитию. Мы в CheckApp предлагаем уникальное решение для вашего бизнеса — индивидуальные
            чекап-пакеты именно для вашей компании, которые не только помогут заботиться о здоровье сотрудников, но и
            повысят их лояльность и продуктивность.
          </p>
          <div className="flex flex-col gap-y-3">
            <p className="text-[#1C1F25] font-semibold text-lg">
              Почему это важно для вашей компании?
            </p>
            <ul className="flex flex-col gap-y-2 list-none text-[#4B5162]">
              <li className="flex items-center gap-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1D7CBC]" />
                Снижение количества больничных дней
              </li>
              <li className="flex items-center gap-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1D7CBC]" />
                Сокращение расходов на временную нетрудоспособность
              </li>
              <li className="flex items-center gap-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1D7CBC]" />
                Повышение вовлеченности и лояльности сотрудников
              </li>
            </ul>
          </div>
          <p className="text-[#4B5162]">
            Будьте той компанией, которая заботится о здоровье своих сотрудников! Свяжитесь с нами, чтобы обсудить возможности создания персонализированного чекап-пакета для вашей команды. Сделаем ваш бизнес здоровее вместе!
          </p>
        </div>
        <div className="w-full lg:w-1/2 bg-[#1D7CBC] p-8 lg:p-12 flex flex-col gap-y-6">
          <div ref={formFieldsRef} className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-white form-element">Напишите нам</h1>
            <Input
              type="name"
              placeholder="Имя"
              className="form-element focus-visible:ring-0 bg-white/10 border-white/20 placeholder:text-white/70 text-white rounded-lg h-14 text-lg hover:bg-white/20 transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Почта"
              className="form-element focus-visible:ring-0 bg-white/10 border-white/20 placeholder:text-white/70 text-white rounded-lg h-14 text-lg hover:bg-white/20 transition-colors"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <Textarea
              placeholder="Напишите письмо"
              className="form-element focus-visible:ring-0 bg-white/10 border-white/20 placeholder:text-white/70 text-white resize-none rounded-lg min-h-[120px] text-lg hover:bg-white/20 transition-colors"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <StyledButton
              disabled={isLoading}
              onClick={sendMail}
            >
              {isLoading ? 'Идет отправка...' : 'Отправить'}
            </StyledButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyForm;
