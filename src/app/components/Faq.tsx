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
          <div className="flex flex-col gap-y-2">
            <b>1. Консилиум врачей</b>
            <div className="ml-3">
              <p>
                Только в CheckApp ваш анамнез собирает целый консилиум специалистов.
              </p>
              <p className="my-2">
                Наши врачи работают в команде:
                <ul>
                  <li className="ml-2">• ведущий специалист по направлению - спортивный врач.</li>
                  <li className="ml-2">• эксперты смежных областей (например, кардиолог, эндокринолог, невролог для
                    спортивного чекапа).
                  </li>
                </ul>
              </p>
              <p>
                Это исключает упущения и однобокий взгляд. Один врач может не знать всех нюансов, важнейших для точной
                диагностики.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <b>2. Минимизация человеческого фактора</b>
            <div className="ml-3">
              <p>
                На первичном приеме врачи часто не успевают задать важные вопросы.
              </p>
              <p className="my-2">
                CheckApp исключает такие риски:
                <ul>
                  <li className="ml-2">• анкеты разработаны консилиумами, без спешки и с учетом всех деталей.</li>
                  <li className="ml-2">• только необходимые вопросы — ничего лишнего.
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <b>3. Независимость и свобода выбора</b>
            <div className="ml-3">
              <p>
                CheckApp <b>не заинтересован</b> в «накрутке» услуг и дает вам свободу выбора: обследуйтесь там, где вам
                удобно, или у проверенных специалистов.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <b>4. Время — главный ресурс</b>
            <div className="ml-3">
              <p className="my-2">
                CheckApp позволяет вам:
                <ul>
                  <li className="ml-2">• заполнить анкету <b>в любое время</b> и без очередей.</li>
                  <li className="ml-2">• прийти к врачу уже подготовленным — с результатами первичных анализов.</li>
                </ul>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <b>5. Экономия средств</b>
            <div className="ml-3">
              <p>
                Вы получаете рекомендации консилиума врачей по цене ниже стандартного приема терапевта. Только нужные анализы и никакой скрытой выгоды.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Есть ли у вас корпоративные предложения?',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            Да, мы в CheckApp предлагаем уникальное решение для вашего бизнеса — индивидуальные чекап-пакеты именно для
            вашей компании, которые не только помогут заботиться о здоровье сотрудников, но и повысят их лояльность и
            продуктивность.
          </p>
          <p>
            Пожалуйста, напишите нам ваш запрос на <a className="underline text-[#1D7CBC]"
                                                      href="mailto:info@checkapp.kz">info@checkapp.kz</a>
          </p>
        </div>
      )
    },
    {
      id: 5,
      title: 'Что такое чекап?',
      text: (
        <div className="flex flex-col gap-y-2 text-[#4B5162]">
          <p>
            Чекап — это комплексный медицинский осмотр, который помогает выявить потенциальные проблемы со здоровьем на ранних стадиях, часто еще до появления симптомов. Он включает анализы и консультации специалистов, которые помогают составить точную картину состояния организма. Регулярные чекапы позволяют вовремя замечать отклонения от нормы и, если необходимо, начать профилактические меры или лечение.
          </p>
          <p>
            На основе ваших ответов CheckApp подбирает только те обследования и специалистов, которые действительно необходимы для анализа вашего состояния. Это помогает избежать ненужных трат и процедур, а также обеспечить максимальную пользу для вашего здоровья.
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
