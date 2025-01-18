import Stars from "@/public/stars.svg";
import Image from "next/image";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { getCookie } from "cookies-next";
import { Textarea } from "@/components/ui/textarea";

const Faq = () => {
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('user-token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmitQuestion = async () => {
    try {
      if (!question.trim()) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Пожалуйста, введите ваш вопрос"
        });
        return;
      }

      if (!isAuthenticated && !email.trim()) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Пожалуйста, введите вашу почту"
        });
        return;
      }

      if (!isAuthenticated && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Пожалуйста, введите корректный email"
        });
        return;
      }

      setIsLoading(true);

      // Получаем email из куки если пользователь авторизован, иначе из поля ввода
      const userEmail = isAuthenticated ? getCookie('user-email') : email;

      const response = await fetch('https://backend-checkapp.vercel.app/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: userEmail,
          description: question
        })
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Ваш вопрос отправлен. Мы ответим вам в ближайшее время."
        });
        setQuestion('');
        if (!isAuthenticated) {
          setEmail('');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось отправить вопрос. Попробуйте позже."
        });
      }
    } catch (error) {
      console.error('Ошибка:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при отправке вопроса"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const faqList = [
    {
      id: 1,
      title: 'Как это работает?',
      text: (
        <div className="flex flex-col gap-y-0.5 text-[#4B5162]">
          <p>1. Зарегистрировавшись, выберите нужный вам чекап-пакет.</p>
          <p>2. Пройти онлайн-анкетирование для формирования персонализированного плана обследования.</p>
          <p>3. Провести онлайн-оплату для получения персонализированного плана обследования на элек.почту.</p>
          <p>4. Получить персонализированный план обследования на элек.почту.</p>
          <p>5. Пройти обследование в удобном для вас месте либо обратиться к нашим партнерам.</p>
        </div>
      )
    },
    {
      id: 2,
      title: 'Консилиум врачей',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            Только в CheckApp ваш анамнез собирает целый консилиум специалистов.
          </p>
          <p className="my-2">
            Пример консилиума в спортивном чекапе:
            <ul className="ml-2 mt-1">
              <li>• ведущий специалист по направлению - спортивный врач.</li>
              <li>• эксперты смежных областей (кардиолог, эндокринолог, терапевт).</li>
            </ul>
          </p>
          <p>
            Это исключает упущения и однобокий взгляд. Один врач может не знать всех нюансов, важнейших для точной диагностики.
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: 'Персонализирующий алгоритм',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            В вопросах диагностики состояния здоровья не может быть унифицированного подхода. Следуя этому принципу, CheckApp уделяет особое внимание персонализации, разработав и постоянно улучшая уникальный алгоритм в своих продуктах, который помогает составить план обследования именно для вас.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: 'Минимизация человеческого фактора',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            На первичном приеме врачи часто могут не успеть или не задать важные вопросы, упустив ценную информацию о пациенте.
          </p>
          <p>
            CheckApp исключает такие риски:
            <ul className="ml-2 mt-1">
              <li>• анкеты разработаны не одним специалистом, а консилиумами врачей, без спешки и с учетом всех деталей.</li>
              <li>• анкеты сформированы из действительно необходимых вопросов.</li>
            </ul>
          </p>
        </div>
      )
    },
    {
      id: 5,
      title: 'Независимость и свобода выбора',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            CheckApp не заинтересован в «накрутке» ненужных анализов и других услуг. Мы даем вам свободу выбора: обследуйтесь там, где вам удобно. Однако если вы растеряны и не знаете, куда именно обратиться, вы всегда можете воспользоваться услугами рекомендуемых и проверенных нами специалистов и медицинских центров. Это значит, что они разделяют приверженность CheckApp принципам честной и доказательной медицины.
          </p>
        </div>
      )
    },
    {
      id: 6,
      title: 'Время — главный ресурс',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            CheckApp позволяет вам:
            <ul className="ml-2 mt-1">
              <li>• заполнить анкету в любое время онлайн и без очередей.</li>
              <li>• получить ваш персонализированный план обследования за 5 минут</li>
              <li>• прийти к врачу уже подготовленным — с результатами первичных анализов.</li>
            </ul>
          </p>
        </div>
      )
    },
    {
      id: 7,
      title: 'Экономия средств',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            Вы получаете рекомендации консилиума врачей по цене ниже стандартного первичного приема специалиста. Только нужные анализы и никакой скрытой выгоды.
          </p>
        </div>
      )
    },
    {
      id: 8,
      title: 'Есть ли у вас корпоративные предложения?',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            Да, мы в CheckApp предлагаем уникальное решение для вашего бизнеса — индивидуальные чекап-пакеты именно для
            вашей компании, которые не только помогут заботиться о здоровье сотрудников, но и повысят их лояльность и
            продуктивность.
          </p>
          <p>
            Пожалуйста, напишите нам ваш запрос на <a className="underline text-[#1D7CBC]" href="mailto:info@checkapp.kz">info@checkapp.kz</a>
          </p>
        </div>
      )
    },
  ];

  return (
    <section id="faq" className="bg-[#F4F7FA] mt-24 py-16 lg:py-28">
      <div className="container mx-auto px-4 lg:px-0 flex flex-col lg:flex-row items-start gap-12">
        <div className="min-w-[476px] flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2 px-3 py-2 rounded-full border bg-white border-[#B6BCCD] w-fit drop-shadow-md">
            <Image src={Stars} alt="stars-icon" />
            <p className="text-[#4B5162] font-medium uppercase">FAQ</p>
          </div>
          <h1 className="text-[#1C1F25] font-bold text-3xl lg:text-5xl">
            Frequently asked questions
          </h1>
          <p className="text-[#4B5162]">
            Есть вопросы? У нас есть ответы для вас
          </p>
          <div className="flex flex-col gap-y-2 md:max-w-[70%] w-full">
            {!isAuthenticated && (
              <Input
                type="email"
                placeholder="Введите вашу почту"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-[#B6BCCD]"
              />
            )}
            <Textarea
              placeholder="Введите ваш вопрос"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-white border-[#B6BCCD] min-h-[100px] resize-none"
            />
            <Button 
              onClick={handleSubmitQuestion}
              disabled={isLoading}
              className="bg-[#1D7CBC] hover:bg-[#1666a0] transition-colors w-fit"
            >
              {isLoading ? "Отправка..." : "Задать вопрос"}
            </Button>
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="1"
        >
          {faqList.map((item) => (
            <AccordionItem key={item.id} value={`${item.id}`}>
              <AccordionTrigger className="text-[#1C1F25] font-bold lg:text-xl">
                <div className="flex items-center gap-x-4 text-left">
                  <div className="bg-[#519B8E] rounded-sm w-1 h-4" />
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {item.text}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default Faq;
