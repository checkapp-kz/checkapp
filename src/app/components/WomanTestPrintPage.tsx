import React, { forwardRef, ForwardedRef } from 'react';
import {getCookie} from "cookies-next";
import { SportTest } from "@/app/types/tests";

interface WomanTestPrintPageProps {
  answer: any;
}

const WomanTestPrintPage = forwardRef<HTMLDivElement, WomanTestPrintPageProps>(
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
              <p>Женский</p>
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
          <h4 className="text-lg font-medium text-[#1D7CBC] text-left w-full">Персонализированные рекомендации по анализам:</h4>
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
                <p>Общий анализ крови с СРБ</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это лабораторное исследование, которое позволяет оценить состояние здоровья человека, выявить
                  различные заболевания и отклонения, анализируя состав крови. Он включает в себя измерение уровня
                  гемоглобина, эритроцитов, лейкоцитов, тромбоцитов, а так же С-реактивного белка (СРБ)</p>
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
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>анти-ТПО</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это аутоантитела, которые вырабатываются при нарушении работы иммунной системы и атакуют щитовидную
                  железу.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>витамин Д</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это жирорастворимый витамин, необходимый для здоровья костей, работы иммунной системы и обмена
                  кальция.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>витамин В12</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это водорастворимый витамин, участвующий в работе нервной системы и кроветворении.</p>
              </div>
            </div>
            <div className="flex items-baseline border-b">
              <div className="flex flex-col w-2/4 pl-1">
                <p>фолиевая кислота</p>
              </div>
              <div className="flex flex-col w-full border-l pl-1">
                <p>— это витамин группы B, необходимый для синтеза ДНК и нормального развития клеток.</p>
              </div>
            </div>
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>АСТ (аспартатаминотрасфераза) </p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>это фермент, содержащийся в клетках сердца, печени и мышц. Анализ помогает выявить повреждения этих
                    органов, включая инфаркт миокарда и заболевания печени.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>АЛТ (аланинаминотрансфераза) </p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это фермент, который содержится в клетках печени. Его уровень в крови помогает диагностировать
                    заболевания печени, такие как гепатит и цирроз.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>общий белок</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— эндогенный фермент из группы трансфераз, подгруппы аминотрансфераз (трансаминаз), широко
                    используемый в медицинской практике для лабораторной диагностики повреждений печени.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>общий и прямой билирубин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это пигмент, образующийся при распаде гемоглобина. Его уровень отражает работу печени и
                    желчевыводящих путей.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>общий и прямой билирубин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это пигмент, образующийся при распаде гемоглобина. Его уровень отражает работу печени и
                    желчевыводящих путей.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>глюкоза в крови</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— анализ на уровень глюкозы в крови измеряет концентрацию сахара в организме.</p>
                </div>
              </div>
            )}
            {(bmi() > 30 || answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>гликированный гемоглобин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это форма гемоглобина, связанная с молекулами глюкозы. Анализ на HbA1c используется для мониторинга долгосрочного уровня сахара в крови, что помогает в диагностике и контроле диабета.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Липопротеины высокой плотности (ЛПВП)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это «хороший» холестерин, который помогает удалять избыток жиров из сосудов.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Липопротеины низкой плотности (ЛПНП)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это «плохой» холестерин, который может откладываться на стенках сосудов и приводить к атеросклерозу.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>триглицериды</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это жиры, которые являются основным источником энергии в организме. Их повышенный уровень может указывать на риск атеросклероза, ожирения и сердечно-сосудистых заболеваний.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e' || answer[2].answer === 'a') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>онкомаркер СА-125</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это лабораторное исследование, которое позволяет оценить вероятность наличия у пациента злокачественной опухоли яичника.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>онкомаркер (РЭА)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это вещество белковой природы, которое используется в лабораторной практике в качестве тканевого маркера онкологических заболеваний.</p>
                </div>
              </div>
            )}
            {(answer[0].answer === 'd' || answer[0].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>онкомаркер СА-15–3</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— является антигенной структурой, которую экспрессируют эпителиальные клетки молочной железы.</p>
                </div>
              </div>
            )}
            {(answer[2].answer === 'a' || answer[2].answer === 'c' || answer[2].answer === 'd') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>онкоцитология</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— специальный лабораторный анализ, который с высокой точностью позволяет установить онкологические заболевания шейки матки у женщины.</p>
                </div>
              </div>
            )}
            {(answer[2].answer === 'a' || answer[2].answer === 'c' || answer[2].answer === 'd' || answer[2].answer === 'e') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>флороценоз NCMT</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это исследование микрофлоры влагалища, которое помогает выявить бактериальные, грибковые или вирусные инфекции, а также оценить состояние интимного здоровья женщины.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'b' && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Хорионический гонадотропин человека (ХГЧ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это гормон, который вырабатывается плацентой в период беременности. Анализ на ХГЧ используется для подтверждения беременности. Уровень ХГЧ может быть повышен не только при беременности, но и при некоторых опухолях.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'b' && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>пролактин</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— гормон, который вырабатывается в гипофизе. Анализ на пролактин назначают для диагностики бесплодия, эндокринных нарушений, гипоталамо-гипофизарных расстройств.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'b' && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>17-ОН-прогестерон</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это гормон, связанный с работой надпочечников и половых желез. Анализ используется для диагностики гормональных нарушений, врожденной дисфункции коры надпочечников и проблем с менструальным циклом.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'b' && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Антимюллеров гормон (АМГ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>— это белок, вырабатываемый яичниками, который отражает их резерв (запас яйцеклеток). Анализ помогает оценить фертильность у женщин и планировать процедуры вспомогательной репродукции.</p>
                </div>
              </div>
            )}
            {(answer[2].answer === 'b' || answer[2].answer === 'f') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>ФСГ и ЛГ - на 2-4 день менструального цикла</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>ФСГ — это гормон, регулирующий работу половых желез. У женщин его уровень помогает оценить овариальный резерв и диагностировать нарушения менструального цикла, у мужчин – функцию сперматогенеза.</p>
                  <p>ЛГ - это гормон, вырабатываемый гипофизом, который играет ключевую роль в регулировании репродуктивной функции. Анализ на ЛГ используется для диагностики различных нарушений менструального цикла, бесплодия, а также для оценки функции гипофиза и половых желез.</p>
                </div>
              </div>
            )}
            {(answer[2].answer === 'b' || answer[2].answer === 'f') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>эстрадиол</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>это стероидный гормон, который синтезируется в яичниках, коре надпочечников, в плаценте во время беременности у женщин, а также в жировой ткани и в семенниках у мужчин.</p>
                </div>
              </div>
            )}
            {(answer[2].answer === 'c' || answer[2].answer === 'd') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>эстрадиол</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>это стероидный гормон, который синтезируется в яичниках, коре надпочечников, в плаценте во время беременности у женщин, а также в жировой ткани и в семенниках у мужчин.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'd' && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>если в течение 3-6 месяцев назад был незащищенный половой акт с партнером, статус которого вы не знаете - кровь на ВИЧ, гепатит В, С, сифилис, анализ на ВПЧ</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- Тест на ВИЧ позволяет выяснить, присутствует ли вирус иммунодефицита человека, его антигены или
                    антитела к белкам ВИЧ в крови, моче или слюне.</p>
                  <p>- Оба гепатита относятся к заболеваниям с парентеральным путем передачи - передаются «через кровь», но гепатит В заразнее гепатита С</p>
                  <p>- сифилис является предотвратимой и излечимой бактериальной инфекцией, передающейся половым путем (ИППП). При отсутствии лечения он может привести к серьезным проблемам со здоровьем.</p>
                  <p>- анализ на ВПЧ анализ выявляет наличие вируса, который может вызывать образование бородавок, папиллом и некоторых видов рака (например, шейки матки). Он используется для диагностики инфекций и оценки риска развития онкологических заболеваний..</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'e' && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Общий анализ мочи (ОАМ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это исследование, которое помогает оценить состояние мочевыводящей системы и выявить различные заболевания. ОАМ часто используется для диагностики инфекций мочевыводящих путей, заболеваний почек, диабета и других заболеваний.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'e' && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>бактер.посев мочи</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- исследование, позволяющее выявить и определить возбудителей мочеполовых инфекций.</p>
                </div>
              </div>
            )}
            {answer[2].answer === 'f' && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>Глобулин, связывающий половые гормоны (ГСПГ)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это белок, который связывает и транспортирует половые гормоны, такие как тестостерон и эстрадиол, в крови.</p>
                </div>
              </div>
            )}
            {(answer.length > 5 && answer[5].answer === 'b') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>мазок на онкоцитологию</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- микроскопическое исследование клеток, взятых из шейки матки и цервикального канала.</p>
                </div>
              </div>
            )}
            {(answer.length > 6 && answer[6].answer === 'b') && (
              <div className="flex items-baseline border-b">
                <div className="flex flex-col w-2/4 pl-1">
                  <p>анализ на вирус папилломы человека (ВПЧ) (14 генотипов)</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- анализ выявляет наличие вируса, который может вызывать образование бородавок, папиллом и некоторых видов рака (например, шейки матки). Он используется для диагностики инфекций и оценки риска развития онкологических заболеваний.</p>
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
              {(
                answer[2].answer === 'g' ||
                answer[3].answer === 'b' ||
                answer[3].answer === 'c' ||
                answer[3].answer === 'd' ||
                answer[3].answer === 'e' ||
                answer[4].answer === 'a' ||
                answer[4].answer === 'b'
              ) && (
                <div className="border-b">
                  <p className="pl-1">консультация гинеколога</p>
                </div>
              )}
              {(
                bmi() > 30 ||
                answer[2].answer === 'g' ||
                answer[3].answer === 'a' ||
                answer[4].answer === 'c'
              ) && (
                <div className="border-b">
                  <p className="pl-1">консультация эндокринолога</p>
                </div>
              )}
              {answer[4].answer === 'd' && (
                <div className="border-b">
                  <p className="pl-1">консультация кардиолога</p>
                </div>
              )}
              {(answer[4].answer === 'e' || (answer.length > 7 && answer[7].answer === 'b')) && (
                <div className="border-b">
                  <p className="pl-1">консультация маммолога</p>
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
                  <p>УЗИ органов малого таза</p>
                </div>
                <div className="flex flex-col w-full border-l pl-1">
                  <p>- это метод ультразвукового исследования, который позволяет визуализировать органы, расположенные в области малого таза.</p>
                </div>
              </div>
              {(answer[0].answer === 'c' || answer[0].answer === 'd' || answer[0].answer === 'e' || (answer.length > 7 && answer[7].answer === 'b')) && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ молочных желез</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- исследование позволяет оценить размеры, структуру тканей (преобладание железистого или жирового компонента), наличие патологических образований в молочной железе (кисты, опухоли) или в коже в области груди.</p>
                  </div>
                </div>
              )}
              {(answer[0].answer === 'd' || answer[0].answer === 'e' || (answer.length > 7 && answer[7].answer === 'b')) && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>маммография (c 40 лет)</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- самый информативный метод диагностики рака молочной железы.</p>
                  </div>
                </div>
              )}
              {answer[0].answer === 'e' && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ мочевого пузыря</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- оценивает объем, структуру и патологии мочевого пузыря.</p>
                  </div>
                </div>
              )}
              {answer[0].answer === 'e' && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>УЗИ почек</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- визуализирует состояние почек, помогает выявить кисты, камни и другие патологии.</p>
                  </div>
                </div>
              )}
              {(answer[0].answer === 'd' || answer[0].answer === 'e' || answer[4].answer === 'd') && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>измерение артериального давления</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- визуализирует состояние почек, помогает выявить кисты, камни и другие патологии.</p>
                  </div>
                </div>
              )}
              {(answer[4].answer === 'f' && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>ФГДС желудка</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- эндоскопическое исследование пищевода, желудка и двенадцатиперстной кишки с помощью фиброволоконной оптики (зонд, гастроскоп, эндоскоп).</p>
                  </div>
                </div>
              ))}
              {(answer[4].answer === 'f' && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-2/4 pl-1">
                    <p>колоноскопия</p>
                  </div>
                  <div className="flex flex-col w-full border-l pl-1">
                    <p>- эндоскопический метод исследования внутренней поверхности кишечника с помощью специального прибора –колоноскопа.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-10 w-full">
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
                  <p>{answer[1].answer.height} см / {answer[1].answer.weight} кг</p>
                </div>
              </div>
              {answer[2].answer.length > 1 && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-3/4 pl-1 border-r">
                    <p>Давайте пройдемся по имеющимся у вас симптомам, связанных с женским здоровьем. Проявляются ли у
                      вас следующие симптомы?</p>
                  </div>
                  <div className="flex w-full pl-1">
                    <p>{getAnswerByIdAndValue('3', answer[2].answer)}</p>
                  </div>
                </div>
              )}
              {answer[3].answer.length > 1 && (
                <div className="flex items-baseline border-b">
                  <div className="flex flex-col w-3/4 pl-1 border-r">
                    <p>Были ли у вас диагностированы следующие заболевания?</p>
                  </div>
                  <div className="flex w-full pl-1">
                    <p>{getAnswerByIdAndValue('4', answer[3].answer)}</p>
                  </div>
                </div>
              )}
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

WomanTestPrintPage.displayName = "WomanTestPrintPage";

export default WomanTestPrintPage;
