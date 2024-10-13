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
          <p>3.Онлайн-оплата.</p>
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
          Да, окончательная. Вы платите за список рекомендаций по сдаче анализов крови, прохождению функциональной диагностики от консилиума узких медицинских специалистов.
        </p>
      )
    },
    {
      id: 3,
      title: 'Какие преимущества дает CheckApp?',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            Наши чекап-пакеты основаны на принципах доказательной медицины и разработаны с учетом лучших казахстанских и мировых практик. Для пациентов уникальность наших пакетов еще и состоит в их персонализированности.
          </p>
          <p>
            На сегодня существующие чекап пакеты перегружены ненужными анализами, мало актуализируются и недоступны для большинства населения. Наши чекап-пакеты не содержат в себе ничего лишнего, только максимально необходимые важные пункты.
          </p>
          <p>
            CheckApp также провел верификацию врачей, выбрав лучших из них и объединив их в формат консилиума. С нами вы можете пройти обследование без лишних временных и финансовых трат.
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
