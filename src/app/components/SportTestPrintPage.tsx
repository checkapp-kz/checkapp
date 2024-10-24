import React, { forwardRef, ForwardedRef } from 'react';
import {getCookie} from "cookies-next";

interface SportTestPrintPageProps {
  answer: any;
}

const SportTestPrintPage = forwardRef<HTMLDivElement, SportTestPrintPageProps>(
  ({ answer }, ref: ForwardedRef<HTMLDivElement>) => {

    const name = getCookie('user-name');
    const email = getCookie('user-email');

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
            Благодарим вас за то, что воспользовались услугами CheckApp!
          </h4>
          <h4 className="mt-4">
            Данные рекомендации подготовлены по результатам пройденного вами анкетирования и составлены консилиумом
            врачей, состоящим из следующих специалистов:
          </h4>
          <h4 className="mt-2">
            (тут будут перечислены врачи в зависимости от пакета)
          </h4>
        </div>
        <div className="flex flex-col items-center mt-12">
          <h4 className="text-[#1D7CBC]">Ваш персонализированный план обследования</h4>
          <div className="flex flex-col gap-y-1 w-full">
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
          <h4 className="text-[#1D7CBC]">Дополнительная информация</h4>
          <div className="flex flex-col gap-y-1 w-full">
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>Рост:</p>
              <p>{answer[2].answer.height} см.</p>
            </div>
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>Вес:</p>
              <p>{answer[2].answer.weight} кг.</p>
            </div>
            <div className="flex items-center gap-x-2 border-b px-2">
              <p>BMI:</p>
              <p>{(answer[2].answer.weight / (answer[2].answer.height * answer[2].answer.height)) * 10000}</p>
            </div>
            <div className="flex items-start gap-x-2 border-b px-2">
              <p className="w-1/2">Вы когда-нибудь теряли сознание или почти теряли сознание во время или после
                тренировки?</p>
              {answer[6].answer === 'a' && (
                <p className="font-bold">ДА</p>
              )}
            </div>
            {answer[7].answer === 'a' && (
              <div className="flex items-start gap-x-2 border-b px-2">
                <p className="w-1/2">
                  Испытывали ли вы когда-нибудь дискомфорт, боль, стеснение или давление в груди во время физических
                  упражнений?
                </p>
                <p className="font-bold">ДА</p>
              </div>
            )}
            {answer[9].answer === 'a' && (
              <div className="flex items-start gap-x-2 border-b px-2">
                <p className="w-1/2">
                  Во время упражнений вы устаете или задыхаетесь быстрее, чем ваши сокомандники или люди в окружении
                  одного с вами возраста, выполняющие схожие нагрузки?
                </p>
                <p className="font-bold">ДА</p>
              </div>
            )}
            {(answer[10].answer === 'a' || answer[10].answer === 'b' || answer[10].answer === 'c' || answer[10].answer === 'd' || answer[10].answer === 'e' || answer[10].answer === 'f') && (
              <div className="flex items-start gap-x-2 border-b px-2">
                <p className="w-1/2">
                  Давайте пройдемся по имеющимся у вас диагнозам, связанными со здоровьем костей и суставов:
                </p>
                <p className="font-bold">
                  {answer[10].answer === 'a' && 'нестабильность шейных позвонков/атлантоаксиальная нестабильность'}
                  {answer[10].answer === 'b' && 'синдром Дауна'}
                  {answer[10].answer === 'c' && 'карликовость'}
                  {answer[10].answer === 'd' && 'травмы костей, мышц, связок или сухожилий'}
                  {answer[10].answer === 'e' && 'стрессовый перелом'}
                  {answer[10].answer === 'f' && 'заболевания суставов и связок'}
                </p>
              </div>
            )}
            {answer[11].answer !== 'l' && (
              <div className="flex items-start gap-x-2 border-b px-2">
                <p className="w-1/2">
                  Давайте пройдемся по общим медицинским вопросам, необходимым для корректного анамнеза:
                </p>
                <p className="font-bold">
                  {answer[10].answer === 'a' && 'Астма'}
                  {answer[10].answer === 'b' && 'Депрессию или тревога'}
                  {answer[10].answer === 'c' && 'Боль в паху или болезненная выпуклость либо грыжа в паховой области'}
                  {answer[10].answer === 'd' && 'Инфекционный мононуклеоз в течение последнего месяца'}
                  {answer[10].answer === 'e' && 'Сыпь или другие проблемы с кожей'}
                  {answer[10].answer === 'f' && 'Аллергия'}
                  {answer[10].answer === 'g' && 'Кожаные инфекции'}
                  {answer[10].answer === 'h' && 'Травма головы или сотрясения мозга'}
                  {answer[10].answer === 'i' && 'Болит голова при физических нагрузках'}
                  {answer[10].answer === 'j' && 'Частые мышечные судороги при физических нагрузках'}
                  {answer[10].answer === 'k' && 'Зависимость от алкоголя или наркотиков'}
                </p>
              </div>
            )}
            <div className="flex items-start gap-x-2 border-b px-2">
              <p className="w-1/2">
                Принимаете ли вы какие-либо травяные добавки (чабрец, мята, и тд) на постоянной основе?
              </p>
              <p className="font-bold">
                {answer[12].answer === 'a' ? 'Да' : 'Нет'}
              </p>
            </div>
            <div className="flex items-start gap-x-2 border-b px-2">
              <p className="w-1/2">
                Принимаете ли вы какие-либо лекарства, витамины и БАДы?
              </p>
              <p className="font-bold">
                {answer[13].answer === 'a' ? 'Да' : 'Нет'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6">
          <h4 className="text-[#1D7CBC]">Рекомендации по анализам</h4>
          <div className="flex flex-col gap-y-1 w-full">
            <div className="border px-2">
              <p className="font-medium">Название анализа</p>
            </div>
            <div className="flex items-center gap-x-4 border-b px-2">
              <p className="w-full">
                Общий анализ крови
              </p>
              <p className="border-l pl-2">
                {answer[1].answer === 'a' && `ОАК, развернутый биохимический анализ крови, белок общий, альбумин, креатинин, мочевина, билирубин общий, билирубин прямой, АСаТ, АЛаТ, калий, магний, цинк, глюкоза, железо, ТТГ, витамины D25 OH`}
                {(answer[1].answer === 'b' && answer[0].answer === 'a') && 'ОАК, развернутый биохимический анализ крови, белок общий, альбумин, креатинин, мочевина, билирубин общий, билирубин прямой, АСаТ, АЛаТ, калий, магний, цинк, глюкоза, железо, ТТГ, витамины D25 OH, тестостерон общий'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-28">
          <h4 className="text-[#1D7CBC]">Рекомендации по консультациям</h4>
          <div className="flex flex-col gap-y-1 w-full">
            <div className="flex flex-col gap-x-2 px-2">
              {answer[3].answer === 'a' && (
                <p className="border-b px-2">
                  Консультация пульмонолога
                </p>
              )}
              {answer[3].answer === 'b' && (
                <p className="border-b px-2">
                  Консультация терапевта + ферритин, сывороточное железо, витамин В12
                </p>
              )}
              {answer[3].answer === 'c' && (
                <p className="border-b px-2">
                  Консультация эндокринолога
                </p>
              )}
              {answer[3].answer === 'd' && (
                <p className="border-b px-2">
                  Консультация терапевта
                </p>
              )}
              {(answer[4].answer === 'a' || answer[4].answer === 'b' || answer[4].answer === 'c' || answer[4].answer === 'd') && (
                <p className="border-b px-2">
                  Консультация кардиолога
                </p>
              )}
              {answer[8].answer === 'a' && (
                <p className="border-b px-2">
                  Консультация невролога
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h4>
            Выбор лабораторий, медицинских центров и врачей всегда остается за вами - вы можете пройти обследование там,
            где вам удобно и комфортно. Но вы всегда можете воспользоваться специальными предложениями и скидками от
            наших партнеров, информация о которых размещена на нашем сайте: <span
            className="text-[#1D7CBC]">www.checkapp.kz/partners</span>
          </h4>
        </div>
        <div className="mt-6">
          <h4>
            Если у вас возникают трудности при выборе специалиста для прохождения консультации, вы всегда можете пройти прием непосредственно у врачей из нашего консилиума. Вся информация, включая контактные данные, расположена на нашем сайте: <span
            className="text-[#1D7CBC]">www.checkapp.kz/doctors</span>
          </h4>
        </div>
        <div className="mt-12 flex justify-center">
          <h4 className="text-[#1D7CBC]">Будьте здоровы!</h4>
        </div>
      </div>
    );
  }
);

SportTestPrintPage.displayName = "SportTestPrintPage";

export default SportTestPrintPage;
