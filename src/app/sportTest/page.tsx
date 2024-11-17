"use client";

import {useEffect, useRef, useState} from "react";
import { SportTest as Test } from "@/app/types/tests";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useReactToPrint} from "react-to-print";
import SportTestPrintPage from "@/app/components/SportTestPrintPage";
import {useSearchParams} from "next/navigation";

export default function SportTest() {
  const searchParams = useSearchParams(); // Retrieve search params
  const stepParam = searchParams.get("step");

  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [question, setQuestion] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null); // Состояние для хранения выбранного варианта
  const [answers, setAnswers] = useState([]); // Массив для хранения ответов
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    // Update currentQuestionId if stepParam exists
    if (stepParam && currentQuestionId !== stepParam) {
      setCurrentQuestionId(stepParam);
    }
  }, [currentQuestionId, stepParam]);

  useEffect(() => {
    if (currentQuestionId === '13') {
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
    if (selectedVariant) {
      // Проверяем, существует ли ответ с таким же id
      setAnswers(prevAnswers => {
        const existingAnswerIndex = prevAnswers.findIndex(answer => answer.id === currentQuestionId);

        if (existingAnswerIndex !== -1) {
          // Если ответ существует, создаем новый массив и обновляем нужный ответ
          return prevAnswers.map((answer, index) =>
            index === existingAnswerIndex ? { id: currentQuestionId, answer: selectedVariant } : answer
          );
        } else {
          // Если ответ не существует, добавляем его в массив
          return [...prevAnswers, { id: currentQuestionId, answer: selectedVariant }];
        }
      });

      setSelectedVariant(null);

      // Логика для перехода между вопросами
      if (currentQuestionId === '1' && selectedVariant === 'b') {
        setCurrentQuestionId('1a');
      } else if (currentQuestionId === '1a') {
        setCurrentQuestionId('1b');
      } else if (currentQuestionId === '1b') {
        setCurrentQuestionId('2');
      } else {
        const nextQuestionId = (parseInt(currentQuestionId) + 1).toString();
        setCurrentQuestionId(nextQuestionId);
      }
    }
  };

  const handleQuestionThree = () => {
    // Сохранение роста и веса в нужном формате
    const answerData = {
      id: '3',
      answer: {
        weight: weight,
        height: height
      }
    };

    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(answer => answer.id === '3');
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
    setCurrentQuestionId('4');
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const sendRequest = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const timestamp = now.getUTCFullYear().toString() +
      pad(now.getUTCMonth() + 1) +
      pad(now.getUTCDate()) +
      pad(now.getUTCHours()) +
      pad(now.getUTCMinutes()) +
      pad(now.getUTCSeconds());

    const urlencoded = new URLSearchParams();
    urlencoded.append("AMOUNT", "5990");
    urlencoded.append("CURRENCY", "398");
    urlencoded.append("ORDER", "27");
    urlencoded.append("MERCH_RN_ID", "AF1POST90033686");
    urlencoded.append("DESC", "TRTYPE=1 test transaction (Frictionless Flow)");
    urlencoded.append("MERCHANT", "90033686");
    urlencoded.append("MERCH_NAME", 'TOO CHECK APP"');
    urlencoded.append("TERMINAL", "88888881");
    urlencoded.append("TIMESTAMP", timestamp);
    urlencoded.append("MERCH_GMT", "+6");
    urlencoded.append("TRTYPE", "1");
    urlencoded.append("BACKREF", "https://www.checkapp.kz/sportTest?step=1");
    urlencoded.append("LANG", "ru");
    urlencoded.append("NONCE", "");
    urlencoded.append("P_SIGN", "");
    urlencoded.append("CLIENT_IP", "192.168.0.103");
    urlencoded.append("M_INFO", "ewoJImJyb3dzZXJTY3JlZW5IZWlnaHQiOiIxOTIwIiwKCSJicm93c2VyU2NyZWVuV2lkdGgiOiIxMDgwIiwKCSJtb2JpbGVQaG9uZSI6ewoJCSJjYyI6ICI3IiAsCgkJInN1YnNjcmliZXIiOiI3NDc1NTU4ODg4IgoJfQp9");

    const requestOptions = {
      method: 'POST',
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://test3ds.bcc.kz:5445/cgi-bin/cgi_link", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  return (
    <main className="overflow-x-hidden container mx-auto py-12 flex justify-center">
      <div className="flex flex-col rounded-xl border border-[#1D7CBC] w-full max-w-4xl p-8">
        {question ? (
          <>
            <h4 className="font-medium text-xl text-[#4B5162]">
              <span className="uppercase">{currentQuestionId}</span>) {question.question}
            </h4>
            {currentQuestionId === '3' ? (
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
                    <div key={variant.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={variant.value} id={variant.value} />
                      <Label htmlFor={variant.value} className="text-md text-[#4B5162]">{variant.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            )}
            <div className="flex items-center justify-end mt-8 gap-x-4">
              <Button
                className="bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none"
                onClick={() => {
                  if (currentQuestionId === '3') {
                    handleQuestionThree();
                  } else {
                    handleNext();
                  }
                }}
                disabled={currentQuestionId === '3' ? !height || !weight : !selectedVariant}
              >
                Далее
              </Button>
            </div>
          </>
        ) : (
          currentQuestionId === '13' && (
            <div className="flex flex-col gap-y-2">
              <h4 className="font-medium text-xl text-[#4B5162]">
                Дисклеймер
              </h4>
              <p className="text-[#4B5162]">
                Бывает так, что люди сталкиваются с различными аутоимунными заболеваниями, крайне редкими синдромами и онкологией. Если это вас касается, CheckApp настоятельно рекомендует обратиться к вашему лечащему врачу для соответствующих рекомендаций, зависящих от конкретно вашего случая. Это никак не означает, что выбранный вами чекап вам не подходит. Это лишь означает, что возможно, в вашем случае есть необходимость дополнительной проверки каких-либо имеющихся факторов риска, о которых известно лишь врачу, знакомому с вашим случаем. Данная рекомендация имеет силу и в случаях полной ремиссии.
              </p>
              <div className="flex items-center justify-end">
                <Button
                  className="bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none"
                  onClick={() => {
                    setCurrentQuestionId('16')
                  }}
                >
                  Понятно
                </Button>
              </div>
            </div>
          ) || currentQuestionId === '14' && (
            <div className="flex flex-col gap-y-4">
              <h4 className="font-medium text-xl text-[#4B5162]">
                Финализированный персональный спортивный чекап-пакет
              </h4>
              <div className="flex flex-col gap-y-1">
                <h4 className="font-medium text-md text-[#4B5162]">Поздравляем!</h4>
                <p className="text-[#4B5162]">
                  Мы только что вместе персонализировали спортивный чекап именно для тебя! Он будет включать в себя
                  различные анализы, методы функциональной диагностики, а также прием узких специалистов. Полный
                  детализированный список ты получишь на указанный электронный адрес после оплаты!
                </p>
              </div>
              <div className="flex items-center justify-end">
                <SportTestPrintPage ref={contentRef} answer={answers} />
                <Button
                  className="bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none"
                  onClick={() => {
                    reactToPrintFn();
                    console.log(answers);
                  }}
                >
                  Оплатить
                </Button>
              </div>
            </div>
          ) || currentQuestionId === '0' && (
            <div className="flex flex-col gap-y-4">
              <Button className="bg-[#1D7CBC] hover:bg-[#1D7CBC]" onClick={sendRequest}>Оплатить</Button>
            </div>
          )
        )}
      </div>
    </main>
  );
}
