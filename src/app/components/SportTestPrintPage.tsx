import React, { forwardRef, ForwardedRef } from 'react';
import {getCookie} from "cookies-next";
import { SportTest } from "@/app/types/tests";

interface SportTestPrintPageProps {
  answer: any;
}

const SportTestPrintPage = forwardRef<HTMLDivElement, SportTestPrintPageProps>(
  ({ answer }, ref: ForwardedRef<HTMLDivElement>) => {

    const name = getCookie('user-name');
    const email = getCookie('user-email');

    const getAnswerByIdAndValue = (id: string, answer: string) => {
      const question = SportTest.find(q => q.id === id);
      if (question) {
        const selectedVariant = question.variants?.find(variant => variant.value === answer);
        if (selectedVariant) {
          return selectedVariant.label;
        } else if (answer.length > 0) {
          return answer;
        }
      } else {
        return 'Вопрос не найден';
      }
    }

    const bmi = () => {
      if (answer.length < 14) {
        return Math.round((answer[2].answer.weight / (answer[2].answer.height * answer[2].answer.height)) * 10000)
      } else {
        return Math.round((answer[3].answer.weight / (answer[3].answer.height * answer[3].answer.height)) * 10000)
      }
    };

    const getCurrentDate = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0'); // Добавляет ведущий ноль
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    return (
      <div ref={ref} className="hidden print:flex flex-col p-8">
        <div className="flex items-center justify-between w-full">
          <img src="/_next/static/media/logo.d8dc0cee.svg" alt="logo"/>
          <div className="flex flex-col gap-y-1">
            <a href="https://checkapp.kz" className="underline text-blue-500">
              www.checkapp.kz
            </a>
            <a href="mailto:info@checkapp.kz" className="underline text-blue-500">
              info@checkapp.kz
            </a>
          </div>
        </div>
        <div className="mt-6">
          <h4>
            Благодарим вас за то, что воспользовались услугами <b>CheckApp!</b> Вы уже сделали важный шаг к заботе о
            своем здоровье. Мы верим, что наши рекомендации помогут вам пройти необходимые обследования эффективно,
            сэкономив ваши время и средства. Следуя нашим рекомендациям, вы сможете укрепить уверенность в своем
            здоровье и предотвратить возможные риски.
          </h4>
        </div>
        <div className="flex flex-col items-center mt-12">
          <h4 className="text-[#1D7CBC] text-xl font-medium">Ваш персонализированный план обследования</h4>
          <p className="text-lg font-medium text-[#1D7CBC] text-left w-full mt-4">Общие данные:</p>
          <div className="flex flex-col gap-y-1 w-full border">
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>Название чекап-пакета:</p>
              <p>Спортивный</p>
            </div>
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>ФИО:</p>
              <p>{name}</p>
            </div>
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>Пол:</p>
              <p>{answer[0].answer === 'a' ? 'Мужской' : 'Женский'}</p>
            </div>
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>Email:</p>
              <p>{email}</p>
            </div>
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>Дата анкетирования:</p>
              <p>{getCurrentDate()}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6">
          <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">Персонализированные рекомендации по
            анализам:</h4>
          <div className="flex flex-col gap-y-1 w-full border">
            <div className="flex items-center border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>Наименование</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>Краткое описание</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>ОАК</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это лабораторное исследование, которое позволяет оценить состояние здоровья человека, выявить
                  различные заболевания и отклонения, анализируя состав крови. Он включает в себя измерение уровня
                  гемоглобина, эритроцитов, лейкоцитов, тромбоцитов и других показателей.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>общий холестерин</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это лабораторное исследование, которое позволяет оценить уровень холестерина в вашей крови</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>общий белок</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это лабораторное исследование, которое позволяет оценить уровень белка в вашей крови</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>креатинин</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это продукт распада креатина, который является источником энергии для мышц. Большая часть
                  креатинина выводится из организма через почки.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>мочевина</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— анализ на мочевину используется для оценки функции почек и выявления нарушений в обмене веществ,
                  таких как хроническая почечная недостаточность или дегидратация.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>креатинфосфакиназа</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это фермент, катализирующий образование из АТФ и креатина высокоэнергетического соединения
                  креатинфосфата, который расходуется организмом при увеличенных физических нагрузках.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>билирубин общий</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это пигмент, образующийся при распаде гемоглобина. Его уровень отражает работу печени и
                  желчевыводящих путей.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>АСаТ</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— эндогенный фермент из группы трансфераз, подгруппы аминотрансфераз (трансаминаз).</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>АЛаТ</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— эндогенный фермент из группы трансфераз, подгруппы аминотрансфераз (трансаминаз), широко
                  используемый в медицинской практике для лабораторной диагностики повреждений печени.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>калий</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это важный электролит, который поддерживает работу сердца, мышц и нервов. Уровень калия в крови
                  помогает выявить нарушения в работе сердца и почек, а также оценить состояние организма при
                  обезвоживании.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>натрий</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— важный питательный элемент, необходимый для поддержания нормального объема плазмы крови,
                  кислотно-щелочного баланса, передачи нервных импульсов и нормального функционирования клеток.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>магний</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— благотворно влияет на рост костей; нормализует сердечный ритм, снижает артериальное давление;
                  регулирует уровень сахара в крови; устраняет судороги в мышцах; уменьшает боли в суставах.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>ферритин</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это белок, который хранит железо в организме. Он играет важную роль в поддержании нормального
                  уровня железа и его доступности для клеток. Анализ на ферритин используется для диагностики дефицита
                  железа.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>С-реактивный белок</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это белок, уровень которого повышается в ответ на воспаление в организме. Анализ на С-РБ
                  используется для диагностики воспалительных заболеваний, инфекций, а также для оценки риска
                  сердечно-сосудистых заболеваний. </p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>ТТГ</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это гормон, вырабатываемый гипофизом, который регулирует работу щитовидной железы.</p>
              </div>
            </div>
            {
              (answer.length > 13) && (answer[2].answer === 'a' || answer[2].answer === 'b') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>глюкоза</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>— это углевод, который необходим клеткам организма для выработки энергии.</p>
                  </div>
                </div>
              )
            }
            {
              (answer.length < 14) && (answer[1].answer === 'a' || answer[1].answer === 'b') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>глюкоза</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>— это углевод, который необходим клеткам организма для выработки энергии.</p>
                  </div>
                </div>
              )
            }
            {bmi() > 30 && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>гликированный гемоглобин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это форма гемоглобина, связанная с молекулами глюкозы. Анализ на HbA1c используется для
                    мониторинга долгосрочного уровня сахара в крови, что помогает в диагностике и контроле диабета.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="new-page flex flex-col items-center">
          <div className="flex flex-col w-full mt-10">
            <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">Специалисты, рекомендованные к
              посещению:</h4>
            <div className="flex flex-col gap-y-1 w-full border">
              {
                ((answer.length < 14 && answer[1].answer === 'd') || answer[9].answer === 'd') && (
                  <div className="border-b">
                    <p className="pl-1">консультация кардиолога</p>
                  </div>
                )
              }
              {
                ((answer.length > 13 && answer[2].answer === 'd') || (answer[9].answer === 'd')) && (
                  <div className="border-b">
                    <p className="pl-1">консультация кардиолога</p>
                  </div>
                )
              }
              {
                (bmi() > 30 ||
                  (answer.length > 13 && (answer[9].answer === 'e' || answer[9].answer === 'b')) ||
                  (answer.length < 14 && (answer[8].answer === 'e' || answer[8].answer === 'b'))) && (
                  <div className="border-b">
                    <p className="pl-1">консультация эндокринолога</p>
                  </div>
                )
              }
              {answer[1].id === '1b' && answer[1].answer === 'a' && (
                <div className="border-b">
                <p className="pl-1">консультация гинеколога</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center mt-10">
            <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">Функциональная диагностика к
              прохождению:</h4>
            <div className="flex flex-col gap-y-1 w-full border">
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Наименование</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>Краткое описание</p>
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>ЭКГ (электрокардиограмма)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это метод исследования, который позволяет оценить электрическую активность сердца и выявить
                    различные нарушения в его работе. </p>
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>УЗИ сердца</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это метод ультразвукового исследования, который используется для оценки состояния сердца, его
                    структуры и функции. Этот метод позволяет получить изображение сердца, кровеносных сосудов и их
                    внутренних структур с помощью ультразвуковых волн.</p>
                </div>
              </div>
              {(answer.length < 14) && answer[1].answer === 'd' && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>Денситометрия</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- это метод диагностики, предназначенный для измерения плотности костной ткани с целью оценки
                      риска развития остеопороза и других заболеваний, связанных с потерей костной массы.</p>
                  </div>
                </div>
              )}
              {(answer.length > 13) && answer[2].answer === 'd' && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>Денситометрия</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- это метод диагностики, предназначенный для измерения плотности костной ткани с целью оценки
                      риска развития остеопороза и других заболеваний, связанных с потерей костной массы.</p>
                  </div>
                </div>
              )}
              {((answer.length < 14) && answer[5].answer === 'a') || ((answer.length < 14) && answer[6].answer === 'f') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>суточное (холтеровское) мониторирование с физической нагрузкой</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- Суточное (холтеровское) мониторирование - метод исследования, который позволяет производить
                      непрерывную регистрацию динамики сердца на ЭКГ с помощью портативного устройства (холтера),
                      отслеживать изменения в работе сердца и контролировать артериальное давление пациента в течение
                      всего дня в условиях его активности.</p>
                  </div>
                </div>
              )}
              {((answer.length > 13) && answer[6].answer === 'a') || ((answer.length > 13) && answer[7].answer === 'f') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>суточное (холтеровское) мониторирование с физической нагрузкой</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- Суточное (холтеровское) мониторирование - метод исследования, который позволяет производить
                      непрерывную регистрацию динамики сердца на ЭКГ с помощью портативного устройства (холтера),
                      отслеживать изменения в работе сердца и контролировать артериальное давление пациента в течение
                      всего дня в условиях его активности.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center mt-10">
            <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">Дополнительная информация для
              врача:</h4>
            <div className="flex flex-col gap-y-1 w-full border">
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1">
                  <p>BMI/ИМТ</p>
                </div>
                <div className="flex w-full border-l pl-1">
                  <p>{bmi()}</p> <p className="mx-2">|</p>
                  {bmi() < 16 && (
                    <p>Выраженный дефицит массы тела</p>
                  )}
                  {(bmi() > 16 && bmi() < 19) && (
                    <p>Недостаточная масса тела</p>
                  )}
                  {(bmi() >= 19 && bmi() < 25) && (
                    <p>Норма</p>
                  )}
                  {(bmi() >= 25 && bmi() < 30) && (
                    <p>Предожирение</p>
                  )}
                  {(bmi() >= 30 && bmi() < 35) && (
                    <p>Ожирение 1 степени</p>
                  )}
                  {(bmi() >= 35 && bmi() < 40) && (
                    <p>Ожирение 2 степени</p>
                  )}
                  {(bmi() >= 40) && (
                    <p>Ожирение 3 степени</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1">
                  <p>Рост/Вес</p>
                </div>
                <div className="flex w-full border-l pl-1">
                  {answer.length < 14 && (
                    <p>{answer[2].answer.height} см / {answer[2].answer.weight} кг</p>
                  )}
                  {answer.length > 13 && (
                    <p>{answer[3].answer.height} см / {answer[3].answer.weight} кг</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Какой вид тренировки вы выполняете чаще всего?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('4', answer[4].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('4', answer[3].answer)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Какой у вас режим сна?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('5', answer[5].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('5', answer[4].answer)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Испытываете ли вы один или несколько из нижеперечисленных симптомов при умеренной физической
                    нагрузке?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('7', answer[7].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('7', answer[6].answer)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Имелись ли у ваших ближайших родственников следующие клинические состояния?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('8', answer[8].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('8', answer[7].answer)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Диагностировали ли вам следующие хронические заболевания?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('9', answer[9].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('9', answer[8].answer)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Придерживаетесь ли вы одного из следующих видов коррекционных диет?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('10', answer[10].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('10', answer[9].answer)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Количество основных приемов пищи?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('11', answer[11].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('11', answer[10].answer)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Принимаете ли вы какие-либо БАДы* или витамины на постоянной основе?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('12', answer[12].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('12', answer[11].answer)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-3/4 pl-1 border-r">
                  <p>Как часто вы употребляете алкоголь?</p>
                </div>
                <div className="flex w-full pl-1">
                  {answer.length > 13 && (
                    <p>{getAnswerByIdAndValue('13', answer[13].answer)}</p>
                  )}
                  {answer.length < 14 && (
                    <p>{getAnswerByIdAndValue('13', answer[12].answer)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="new-page flex flex-col items-center mt-10">
          <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">Для вашей информации:</h4>
          <p className="mt-6">
            Выбор лабораторий, медицинских центров и врачей всегда остается за вами - вы можете пройти обследование там,
            где вам удобно и комфортно. Но всегда можно воспользоваться специальными предложениями и скидками от
            партнеров CheckApp, информация о которых размещена на нашем сайте: <a
            href="www.checkapp.kz/partners" className="text-[#1D7CBC]">www.checkapp.kz/partners</a>
          </p>
          <p className="mt-6">
            Если у вас возникают трудности при выборе специалиста для прохождения консультации, вы всегда можете пройти
            прием непосредственно у врачей из нашего консилиума. Вся необходимая информация о них расположена на нашем
            сайте:
            <a href='www.checkapp.kz/doctors' className="text-[#1D7CBC]">www.checkapp.kz/doctors</a>
          </p>
          <h4 className="text-[#1D7CBC] text-2xl font-bold mt-24">Специальное предложение от партнера CheckApp!</h4>

          <p className="mt-4 text-[#1D7CBC]">У вас есть возможность получить скидку от 20% до 30% на ряд лабораторных
            исследований в <b>сети Invitro</b> по всему Казахстану, используя единоразовый промокод «CheckAppMe».
          </p>
          <p className="mt-4 text-[#1D7CBC]">Промокод действителен в течение <b>14 календарных дней</b> после даты
            прохождения анкетирования, при предъявлении вашего персонального плана обследования (данного документа) и
            документа, удостоверяющего личность.
          </p>
          <p className="mt-4 text-[#1D7CBC]">
            Результаты анализов вы получите на указанный в лаборатории ваш WhatsApp номер.
          </p>
          <div className="mt-12 flex justify-center">
            <h4 className="text-[#1D7CBC] text-2xl font-bold">Будьте здоровы!</h4>
          </div>
          <div className="flex items-end w-full flex-col gap-y-1">
            <a href="https://checkapp.kz" className="underline text-blue-500">
              www.checkapp.kz
            </a>
            <a href="mailto:info@checkapp.kz" className="underline text-blue-500">
              info@checkapp.kz
            </a>
          </div>
        </div>
      </div>
    );
  }
);

SportTestPrintPage.displayName = "SportTestPrintPage";

export default SportTestPrintPage;
