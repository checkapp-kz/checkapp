import Stars from "@/public/stars.svg";
import Image from "next/image";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const Faq = () => {

  const faqList = [
    {
      id: 1,
      title: 'Как это работает?',
      text: (
        <div className="flex flex-col gap-y-0.5 text-[#4B5162]">
          <p>1. Выбрать чекап-пакет.</p>
          <p>2. Пройти онлайн-анкетирование для формирования персонализированного плана обследования.</p>
          <p>3. Онлайн-оплата.</p>
          <p>4. Получить персонализированный план обследования на элек.почту.</p>
          <p>5. Пройти обследование в удобном для вас месте либо обратиться к нашим партнерам.</p>
        </div>
      )
    },
    {
      id: 2,
      title: 'Окончательная ли стоимость?',
      text: (
        <p className="text-[#4B5162]">
          Да, окончательная. Вы платите за список рекомендаций по сдаче анализов крови, прохождению функциональной диагностики от консилиума медицинских специалистов.
        </p>
      )
    },
    {
      id: 3,
      title: 'Какие преимущества дает CheckApp?',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            - Вы устали от того, что на приёме забывают спросить самое важное? Мы спрашиваем всё, что нужно, и ничего лишнего.
          </p>
          <p>
            - Не доверяете одному врачу? Наши рекомендации готовят целые консилиумы разных специалистов. Здесь не будет случайностей.
          </p>
          <p>
            - Вам дорого время? У нас его не нужно тратить. Чекап — в любое удобное для вас время, без очередей и записей.
          </p>
          <p>
            - Переплачиваете за ненужные анализы? Мы назначаем только то, что действительно важно для вашего здоровья. Ни тенге на ветер.
          </p>
          <p>
            - Привязаны к конкретной клинике? У нас нет этого ограничения. Выбирайте лучших врачей и лаборатории сами, без давления.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: 'Есть ли у вас корпоративные предложения?',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            Да,  мы в CheckApp предлагаем уникальное решение для вашего бизнеса — индивидуальные чекап-пакеты именно для вашей компании, которые не только помогут заботиться о здоровье сотрудников, но и повысят их лояльность и продуктивность.
          </p>
          <p>
            Пожалуйста, напишите нам ваш запрос на <a className="underline text-[#1D7CBC]" href="mailto:info@checkapp.kz">info@checkapp.kz</a>
          </p>
        </div>
      )
    }
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
          <p className="text-[#4B5162] ">
            Есть вопросы? У нас есть ответы для вас
          </p>
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
