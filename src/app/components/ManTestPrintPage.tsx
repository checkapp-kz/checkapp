import React, { forwardRef, ForwardedRef } from 'react';
import {getCookie} from "cookies-next";
import { SportTest } from "@/app/types/tests";

interface ManTestPrintPageProps {
  answer: any;
}

const ManTestPrintPage = forwardRef<HTMLDivElement, ManTestPrintPageProps>(
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
      return Math.round((answer[1].answer.weight / (answer[1].answer.height * answer[1].answer.height)) * 10000)
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
              <p>Мужской</p>
            </div>
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>ФИО:</p>
              <p>{name}</p>
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
          <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">
            Персонализированные рекомендации по анализам:
          </h4>
          <div className="flex flex-col gap-y-1 w-full border">
            <div className="flex items-center border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>Наименование</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>Краткое описание</p>
              </div>
            </div>
            {(answer[6].answer === 'a' || answer[3].answer === 'c' || answer[2].answer === 'e') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>пролактин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- гормон, который вырабатывается в гипофизе. Анализ на пролактин назначают для диагностики бесплодия, эндокринных нарушений, гипоталамо-гипофизарных расстройств. </p>
                </div>
              </div>
            )}
            {answer[3].answer === 'c' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>макропролактин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- анализ на макропролактин используется для уточнения диагноза при повышенных уровнях обычного пролактина.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'd' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>анализ крови на ЛДГ</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это фермент, присутствующий в клетках большинства органов, включая сердце, печень, почки и мышцы. Анализ на ЛДГ используется для диагностики заболеваний, связанных с повреждением клеток.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'd' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>хорионический гонадотропин человека (ХГЧ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это гормон, который вырабатывается плацентой в период беременности. Анализ на ХГЧ используется для подтверждения беременности. Уровень ХГЧ может быть повышен не только при беременности, но и при некоторых опухолях.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'd' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Альфа-фетопротеин (АФП)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- белок, который указывает на состояние плода во время беременности, а также может образовываться в организме взрослого человека при различных патологических процессах.</p>
                </div>
              </div>
            )}
            {(answer[6].answer === 'a' || answer[2].answer === 'e') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Лютеинизирующий гормон (ЛГ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это гормон, вырабатываемый гипофизом, который играет ключевую роль в регулировании репродуктивной
                    функции. Анализ на ЛГ используется для диагностики различных нарушений менструального цикла, бесплодия, а также для оценки функции гипофиза и половых желез.</p>
                </div>
              </div>
            )}
            {(answer[6].answer === 'a' || answer[2].answer === 'e') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Глобулин, связывающий половые гормоны (ГСПГ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это белок, который связывает и транспортирует половые гормоны, такие как тестостерон и эстрадиол, в крови.</p>
                </div>
              </div>
            )}
            {(answer[6].answer === 'a' || answer[2].answer === 'e') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Эстрадиол</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это стероидный гормон, который синтезируется в яичниках, коре надпочечников, в плаценте во время беременности у женщин, а также в жировой ткани и в семенниках у мужчин.</p>
                </div>
              </div>
            )}
            {(answer[6].answer === 'a' || answer[5].answer === 'd' || answer[4].answer === 'e' || answer[2].answer === 'e' || answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>общий холестерин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- жироподобное вещество, необходимое организму для нормального функционирования клеток, переваривания пищи, создания многих гормонов.</p>
                </div>
              </div>
            )}
            {(answer[3].answer === 'a' || answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd' || answer[0].answer === 'c' || answer[0].answer === 'b' || answer[0].answer === 'a') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>общий анализ крови (ОАК)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это базовое исследование, которое оценивает общее состояние организма. Анализ помогает выявить анемию, воспалительные процессы, инфекции и нарушения свертываемости крови.</p>
                </div>
              </div>
            )}
            {answer[3].answer === 'a' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>ферритин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это белок, который хранит железо в организме. Он играет важную роль в поддержании нормального уровня железа и его доступности для клеток. Анализ на ферритин используется для диагностики дефицита железа.</p>
                </div>
              </div>
            )}
            {answer[3].answer === 'a' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>С-реактивный белок</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это белок, уровень которого повышается в ответ на воспаление в организме. Анализ на С-РБ используется для диагностики воспалительных заболеваний, инфекций, а также для оценки риска сердечно-сосудистых заболеваний.</p>
                </div>
              </div>
            )}
            {(answer[6].answer === 'a' || answer[4].answer === 'e' || answer[2].answer === 'e' || answer[2].answer === 'b' || answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>глюкоза</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- анализ на уровень глюкозы в крови измеряет концентрацию сахара в организме.</p>
                </div>
              </div>
            )}
            {answer[6].answer === 'a' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Фолликулостимулирующий гормон (ФСГ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это гормон, регулирующий работу половых желез. У женщин его уровень помогает оценить овариальный резерв и диагностировать нарушения менструального цикла, у мужчин – функцию сперматогенеза.</p>
                </div>
              </div>
            )}
            {(answer[5].answer === 'c' || answer[3].answer === 'b' || (bmi() > 30)) && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>гликированный гемоглобин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это форма гемоглобина, связанная с молекулами глюкозы. Анализ на HbA1c используется для мониторинга долгосрочного уровня сахара в крови, что помогает в диагностике и контроле диабета.</p>
                </div>
              </div>
            )}
            {(answer[5].answer === 'e' || answer[3].answer === 'a' || answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd' || answer[0].answer === 'c' || answer[0].answer === 'b') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>ТТГ</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это гормон, вырабатываемый гипофизом, который регулирует работу щитовидной железы.</p>
                </div>
              </div>
            )}
            {answer[5].answer === 'e' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Т3 свободный</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это активная форма гормона щитовидной железы, который регулирует обмен веществ в организме, влияет на сердечно-сосудистую систему, рост и развитие тканей.</p>
                </div>
              </div>
            )}
            {(answer[5].answer === 'e' || answer[3].answer === 'a') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Т4 свободный</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это гормон щитовидной железы, который регулирует обмен веществ, рост и развитие организма. Уровень Т4 свободного позволяет оценить функциональное состояние щитовидной железы.</p>
                </div>
              </div>
            )}
            {answer[5].answer === 'e' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Антитела к тиреопероксидазе (анти-ТПО)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это аутоантитела, которые вырабатываются при нарушении работы иммунной системы и атакуют щитовидную железу.</p>
                </div>
              </div>
            )}
            {(answer[4].answer === 'd' || answer[4].answer === 'b' || answer[2].answer === 'b' || answer[2].answer === 'a') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>общий анализ мочи (ОАМ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это исследование, которое помогает оценить состояние мочевыводящей системы и выявить различные заболевания. ОАМ часто используется для диагностики инфекций мочевыводящих путей, заболеваний почек, диабета и других заболеваний.</p>
                </div>
              </div>
            )}
            {(answer[2].answer === 'a') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>заболевания, передающиеся половым путем (ЗППП) - (при условии отсутствия постоянного партнера)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- анализ на ЗППП включает тестирование на наличие инфекций, передаваемых через половые контакты, таких как трихомониаз, хламидиоз, гонорея, микоплазма, сифилис и другие.</p>
                </div>
              </div>
            )}
            {answer[4].answer === 'd' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>мочевина</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- анализ на мочевину используется для оценки функции почек и выявления нарушений в обмене веществ, таких как хроническая почечная недостаточность или дегидратация.</p>
                </div>
              </div>
            )}
            {answer[4].answer === 'd' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Креатинин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это продукт распада креатина, который является источником энергии для мышц. Большая часть креатинина выводится из организма через почки.</p>
                </div>
              </div>
            )}
            {(answer[4].answer === 'c' || (answer[4].answer === 'a' && answer[0].answer === 'a') || answer[0].answer === 'b') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Ингибин B</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это гормон, который вырабатывается клетками яичников (у женщин) и семенниками (у мужчин). У женщин его уровень помогает оценить функцию яичников, у мужчин для оценки функции яичек и количества сперматозоидов, а также для диагностики заболеваний, связанных с репродуктивной системой.</p>
                </div>
              </div>
            )}
            {answer[0].answer === 'f' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>анализ кала на скрытую кровь</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- исследование кала, направленное на обнаружение бессимптомного кровотечения пищеварительной системы.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'f' || answer[0].answer === 'e') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>ПСА общий и свободный (кровь натощак)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- белок, вырабатываемый тканями предстательной железы. Анализ общего ПСА помогает диагностировать и контролировать заболевания предстательной железы, включая воспаления, доброкачественную гиперплазию и рак простаты.</p>
                </div>
              </div>
            )}
            {answer[0].answer === 'f' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Онкомаркер СА 72-4</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это гликопротеин, продуцируемым опухолевыми клетками. Анализ используется совместно с другими лабораторными и инструментальными исследованиями для комплексной диагностики.</p>
                </div>
              </div>
            )}
            {answer[0].answer === 'f' && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Онкомаркер СА 19-9</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это гликопротеин, продуцируемый клетками эпителия желудочно-кишечного тракта. Уровень онкомаркера повышается при опухолях ЖКТ.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd' || answer[0].answer === 'c' || answer[0].answer === 'b') && (
              <div className="flex items-center border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>общий тестостерон</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это часть общего тестостерона, которая не связана с белками. Если общий тестостерон показывает общий уровень гормона, то свободный — активную его часть, что важно при оценке гормонального баланса и диагностике заболеваний.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="new-page flex flex-col items-center">
          <div className="flex flex-col w-full mt-10">
            <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">
              Специалисты, рекомендованные к посещению:
            </h4>
            <div className="flex flex-col gap-y-1 w-full border">
              {(answer[6].answer === 'a' || answer[4].answer === 'b' || answer[2].answer === 'e') && (
                <div className="border-b">
                  <p className="pl-1">консультация уролога-андролога</p>
                </div>
              )}
              {(answer[5].answer === 'd' || answer[4].answer === 'e' || answer[0].answer === 'f') && (
                <div className="border-b">
                  <p className="pl-1">консультация кардиолога</p>
                </div>
              )}
              {(bmi() > 30) && (
                <div className="border-b">
                  <p className="pl-1">консультация эндокринолога</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center mt-10">
            <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">
                Функциональная диагностика к прохождению:
              </h4>
            <div className="flex flex-col gap-y-1 w-full border">
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Наименование</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>Краткое описание</p>
                </div>
              </div>
              {(answer[5].answer === 'a' || answer[4].answer === 'd' || answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd' || answer[0].answer === 'c') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ почек</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- визуализирует состояние почек, помогает выявить кисты, камни и другие патологии.</p>
                  </div>
                </div>
              )}
              {(answer[5].answer === 'b' || answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd' || answer[0].answer === 'c' || answer[0].answer === 'b' || answer[0].answer === 'a') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ мошонки</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- диагностическая процедура, с помощью которой можно оценить размер и структуру яичек, придатков, строение стенок этого мешковидного образования.</p>
                  </div>
                </div>
              )}
              {(answer[5].answer === 'd' || answer[4].answer === 'e' || answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>измерение артериального давления</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- это процедура, которая позволяет определить давление крови на стенки артерий.</p>
                  </div>
                </div>
              )}
              {(answer[5].answer === 'e' || answer[0].answer === 'f') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ щитовидной железы</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- определяет изменения в структуре и функциях щитовидной железы.</p>
                  </div>
                </div>
              )}
              {(answer[4].answer === 'b' || answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ мочевого пузыря</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- оценивает объем, структуру и патологии мочевого пузыря.</p>
                  </div>
                </div>
              )}
              {(answer[0].answer === 'f' || answer[0].answer === 'e' || answer[0].answer === 'd' || answer[0].answer === 'c') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ простаты</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- исследование предстательной железы для диагностики воспалений и других заболеваний.</p>
                  </div>
                </div>
              )}
              {answer[4].answer === 'e' && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗДГ сосудов почек</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- это диагностический метод, который позволяет оценить кровоток в почечных артериях и венах с помощью ультразвука.</p>
                  </div>
                </div>
              )}
              {answer[2].answer === 'f' && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>2-х стаканная проба мочи (проба Никеля)</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- анализ используется для диагностики инфекций мочевыводящих путей, оценки функции мочевого пузыря и простаты.</p>
                  </div>
                </div>
              )}
              {(answer[0].answer === 'f' || answer[0].answer === 'e') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>ЭКГ (электрокардиограмма)</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- это метод исследования, который позволяет оценить электрическую активность сердца и выявить различные нарушения в его работе.</p>
                  </div>
                </div>
              )}
              {(answer[0].answer === 'f' || answer[0].answer === 'e') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ сердца</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- это метод ультразвукового исследования, который используется для оценки состояния сердца, его структуры и функции. Этот метод позволяет получить изображение сердца, кровеносных сосудов и их внутренних структур с помощью ультразвуковых волн.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center mt-10 w-full">
            <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">
              Дополнительная информация для врача:
            </h4>
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
                  <p>{answer[1].answer.height} см / {answer[1].answer.weight} кг</p>
                </div>
              </div>
              {answer[3].answer.length > 1 && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-3/4 pl-1">
                    <p>Давайте пройдемся по имеющимся у вас дополнительным симптомам:</p>
                  </div>
                  <div className="flex w-full border-l pl-1">
                    <p>{getAnswerByIdAndValue('4', answer[3].answer)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="new-page flex flex-col items-center mt-10">
          <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">Что дальше?</h4>
          <p className="mt-4">
            Выбор лабораторий, медицинских центров и врачей всегда остается за вами - вы можете пройти обследование там,
            где вам удобно и комфортно.
          </p>
          <p className="mt-4">
            Но всегда можно воспользоваться специальными предложениями и скидками от партнеров CheckApp, информация о
            которых размещена тут и на нашем сайте:
            <a href='https://checkapp.kz/partners' className="text-[#1D7CBC]">www.checkapp.kz/partners</a>
          </p>

          <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full mt-10">Онлайн-консультация врача</h4>
          <p className="mt-4">
            Если у вас возникают трудности при выборе специалиста для прохождения консультации, вы всегда можете пройти прием непосредственно у врачей доказательной медицины из нашего консилиума. Вся необходимая информация о них расположена на нашем сайте:
            <a href="https://checkapp.kz/doctors">www.checkapp.kz/doctors</a>
          </p>

          <h4 className="text-[#1D7CBC] text-2xl font-bold mt-24">Специальное предложение от партнера CheckApp!</h4>
          <p className="mt-4 text-[#1D7CBC]">У вас есть возможность получить скидку <span className="text-lg font-bold">от 20% до 30%</span> на
            ряд <span className="text-lg font-bold">INVITRO</span> лабораторных исследований в сети по всему Казахстану
            при предъявлении вашего персонального плана обследования (данного документа) и документа, удостоверяющего
            личность.
          </p>
          <p className="mt-4 text-[#1D7CBC] w-full">
            Результаты анализов вы сможете получить напрямую от лаборатории.
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

ManTestPrintPage.displayName = "ManTestPrintPage";

export default ManTestPrintPage;
