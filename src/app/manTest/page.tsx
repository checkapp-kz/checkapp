"use client";

import {useEffect, useRef, useState} from "react";
import { ManTest as Test } from "@/app/types/tests";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useReactToPrint} from "react-to-print";
import ManTestPrintPage from "@/app/components/ManTestPrintPage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ManTest() {
  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [question, setQuestion] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null); // Состояние для хранения выбранного варианта
  const [answers, setAnswers] = useState([]); // Массив для хранения ответов
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [otherAnswer, setOtherAnswer] = useState('');
  const [age, setAge] = useState<number>();

  useEffect(() => {
    if (currentQuestionId === '8') {
      setQuestion(null);
    } else {
      const currentQuestion = Test.find((q) => q.id === currentQuestionId);

      if (currentQuestion) {
        setQuestion(currentQuestion);
      } else {
        setQuestion(null);
      }
    }
  }, [currentQuestionId]);

  const handleNext = () => {
    // Определяем ответ: если есть текстовое поле (otherAnswer), используем его значение, иначе выбранный вариант
    const answerValue = otherAnswer ? otherAnswer : selectedVariant;

    if (answerValue) {
      setAnswers(prevAnswers => {
        const existingAnswerIndex = prevAnswers.findIndex(answer => answer.id === currentQuestionId);

        if (existingAnswerIndex !== -1) {
          // Обновляем существующий ответ
          return prevAnswers.map((answer, index) =>
            index === existingAnswerIndex ? { id: currentQuestionId, answer: answerValue } : answer
          );
        } else {
          // Добавляем новый ответ
          return [...prevAnswers, { id: currentQuestionId, answer: answerValue }];
        }
      });

      // Очищаем выбранные значения для следующего вопроса
      setSelectedVariant(null);
      setOtherAnswer('');

      // Переход на следующий вопрос
      const nextQuestionId = (parseInt(currentQuestionId) + 1).toString();
      setCurrentQuestionId(nextQuestionId);
    }
  };

  const handleNextCheckAge = (variant: string,) => {
    const answerValue = otherAnswer ? otherAnswer : selectedVariant;

    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(answer => answer.id === currentQuestionId);

      if (existingAnswerIndex !== -1) {
        // Обновляем существующий ответ
        return prevAnswers.map((answer, index) =>
          index === existingAnswerIndex ? { id: currentQuestionId, answer: answerValue } : answer
        );
      } else {
        // Добавляем новый ответ
        return [...prevAnswers, { id: currentQuestionId, answer: answerValue }];
      }
    });

    setSelectedVariant(null);
    setOtherAnswer('');

    if (variant !== 'a' && variant !== 'b') {
      setCurrentQuestionId('7');
    }

    if (variant === 'a' || variant === 'b') {
      setCurrentQuestionId('8');
    }
  };

  const handleQuestionThree = () => {
    // Сохранение роста и веса в нужном формате
    const answerData = {
      id: '2',
      answer: {
        weight: weight,
        height: height
      }
    };

    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(answer => answer.id === '2');
      if (existingAnswerIndex !== -1) {
        // Обновляем существующий ответ
        return prevAnswers.map((answer, index) =>
          index === existingAnswerIndex ? answerData : answer
        );
      } else {
        // Добавляем новый ответ
        return [...prevAnswers, answerData];
      }
    });

    // Очистка значений
    setHeight('');
    setWeight('');

    // Переход на следующий вопрос
    setCurrentQuestionId('3');
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleSendPdf = async () => {
    try {
      const element = contentRef.current;
      if (!element) throw new Error('Element not found');

      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(data, 'PNG', 0, 0, 595, 842);
      pdf.save('document.pdf');

      // Создание и отправка Blob
      const pdfBlob = new Blob([pdf.output('arraybuffer')], { type: 'application/pdf' });
      const formData = new FormData();
      formData.append('file', pdfBlob, 'document.pdf');
      formData.append('to', 'batrbekk@gmail.com');
      formData.append('subject', 'Ваш спортивный чекап!');
      formData.append('text', 'Поздравляем вас с прохождение спортивного чекапа! Будьте здоровы!');

      const response = await fetch('https://checkapp-back.vercel.app/test/send-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('PDF отправлен успешно');
      } else {
        console.error('Ошибка при отправке PDF');
      }
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };

  // const sendRequest = () => {
  //   const now = new Date();
  //   const pad = (n) => n.toString().padStart(2, '0');
  //   const timestamp = now.getUTCFullYear().toString() +
  //     pad(now.getUTCMonth() + 1) +
  //     pad(now.getUTCDate()) +
  //     pad(now.getUTCHours()) +
  //     pad(now.getUTCMinutes()) +
  //     pad(now.getUTCSeconds());
  //
  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("AMOUNT", "5990");
  //   urlencoded.append("CURRENCY", "398");
  //   urlencoded.append("ORDER", "27");
  //   urlencoded.append("MERCH_RN_ID", "AF1POST90033686");
  //   urlencoded.append("DESC", "TRTYPE=1 test transaction (Frictionless Flow)");
  //   urlencoded.append("MERCHANT", "90033686");
  //   urlencoded.append("MERCH_NAME", 'TOO CHECK APP');
  //   urlencoded.append("TERMINAL", "88888881");
  //   urlencoded.append("TIMESTAMP", timestamp);
  //   urlencoded.append("MERCH_GMT", "+6");
  //   urlencoded.append("TRTYPE", "1");
  //   urlencoded.append("BACKREF", "https://www.checkapp.kz/sportTest?step=1");
  //   urlencoded.append("LANG", "ru");
  //   urlencoded.append("NONCE", "");
  //   urlencoded.append("P_SIGN", "");
  //   urlencoded.append("CLIENT_IP", "194.187.139.14");
  //   urlencoded.append("M_INFO", "ewoJImJyb3dzZXJTY3JlZW5IZWlnaHQiOiIxOTIwIiwKCSJicm93c2VyU2NyZWVuV2lkdGgiOiIxMDgwIiwKCSJtb2JpbGVQaG9uZSI6ewoJCSJjYyI6ICI3IiAsCgkJInN1YnNjcmliZXIiOiI3NDc1NTU4ODg4IgoJfQp9");
  //
  //   const requestOptions:RequestInit = {
  //     method: 'POST',
  //     body: urlencoded,
  //     redirect: 'follow'
  //   };
  //
  //   fetch("https://test3ds.bcc.kz:5445/cgi-bin/cgi_link", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // };

  return (
    <main className="overflow-x-hidden container mx-auto py-12 flex justify-center">
      <div className="flex flex-col rounded-xl border border-[#1D7CBC] w-full max-w-4xl p-8">
        {question ? (
          <>
            <h4 className="font-medium text-xl text-[#4B5162]">
              <span className="uppercase">{currentQuestionId}</span>) {question.question}
            </h4>
            {currentQuestionId === '2' ? (
              <div className="mt-8 flex flex-col gap-y-2">
                <Input
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  placeholder="Рост (см.)"
                />
                <Input
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder="Вес (кг.)"
                />
              </div>
            ) : (
              <>
                <RadioGroup className="mt-8" value={selectedVariant} onValueChange={setSelectedVariant}>
                  {question.variants && question.variants.map((variant) => (
                    <div key={variant.value} className="flex flex-col gap-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={variant.value} id={variant.value}/>
                        <Label htmlFor={variant.value} className="text-md text-[#4B5162]">{variant.label}</Label>
                      </div>
                      {variant.form && (
                        <Input
                          type="text"
                          value={otherAnswer}
                          onChange={(e) => setOtherAnswer(e.target.value)}
                          placeholder="Введите ваш ответ"
                          className="ml-6 w-2/4"
                        />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </>
            )}
            <div className="flex items-center justify-end mt-8 gap-x-4">
              <Button
                className="bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none"
                onClick={() => {
                  if (currentQuestionId === '2') {
                    handleQuestionThree();
                  } else if (currentQuestionId === '6') {
                    handleNextCheckAge(answers[0].answer);
                  } else {
                    handleNext();
                  }
                }}
                disabled={currentQuestionId === '2' ? !height || !weight : !selectedVariant}
              >
                Далее
              </Button>
            </div>
          </>
        ) : (
          currentQuestionId === '8' && (
            <div className="flex flex-col gap-y-2">
              <h4 className="font-medium text-xl text-[#4B5162]">
                Дисклеймер
              </h4>
              <p className="text-[#4B5162]">
                Бывает так, что люди сталкиваются с различными аутоимунными заболеваниями, крайне редкими синдромами и онкологией. Если это касается вас, то CheckApp настоятельно рекомендует обратиться к вашему лечащему врачу для соответствующих рекомендаций, зависящих от конкретно вашего случая. Данная рекомендация имеет силу и в случаях полной ремиссии.
              </p>
              <div className="flex items-center justify-end">
                <Button
                  className="bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none"
                  onClick={() => {
                    setCurrentQuestionId('9')
                  }}
                >
                  Понятно
                </Button>
              </div>
            </div>
          ) || currentQuestionId === '9' && (
            <div className="flex flex-col gap-y-4">
              <h4 className="font-medium text-xl text-[#4B5162]">
                Финализированный персональный женский чекап-пакет
              </h4>
              <div className="flex flex-col gap-y-1">
                <h4 className="font-medium text-md text-[#4B5162]">Поздравляем!</h4>
                <p className="text-[#4B5162]">
                  Мы только что вместе персонализировали женский чекап именно для вас! Он будет включать в себя различные анализы, методы функциональной диагностики, а также прием узких специалистов. Полный детализированный список ты получишь на указанный электронный адрес после оплаты.
                </p>
              </div>
              <div className="flex items-center justify-end">
                <ManTestPrintPage ref={contentRef} answer={answers} />
                <Button
                  className="bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none"
                  onClick={() => {
                    console.log(answers);
                    reactToPrintFn();
                  }}
                >
                  Оплатить
                </Button>
              </div>
            </div>
          ) || currentQuestionId === '0' && (
            <div className="flex flex-col gap-y-4">
              <h4 className="text-2xl font-medium">
                Кажется, что организм в очередной раз справится сам?
              </h4>
              <p>
                Многие мужчины откладывают визит к врачу, пока не станет поздно. «Мужской чекап» включает только самые важные анализы и обследования, чтобы:
              </p>
              <ul className="pl-6 list-disc">
                <li>вовремя выявить скрытые риски,</li>
                <li>поддерживать здоровье на пике,</li>
                <li>сохранить энергию для жизни и достижений.</li>
              </ul>
              <p>Пройдите анкету и получите персональный план диагностики. Забота о себе начинается сегодня!</p>
              <div className="flex items-center justify-end">
                <Button
                  className="bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none"
                  onClick={() => {
                    setCurrentQuestionId('1');
                  }}
                >
                  Начать
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
