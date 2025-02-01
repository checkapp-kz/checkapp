"use client";

import {useEffect, useRef, useState, useContext} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import { ManTest as Test } from "@/app/types/tests";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useReactToPrint} from "react-to-print";
import ManTestPrintPage from "@/app/components/ManTestPrintPage";
import { toast } from "@/hooks/use-toast";
import { getCookie } from "cookies-next";
import { AuthContext } from "@/context/AuthContext";
import config from '../../config';

export default function ManTest() {
  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [question, setQuestion] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null); // Состояние для хранения выбранного варианта
  const [answers, setAnswers] = useState([]); // Массив для хранения ответов
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [otherAnswer, setOtherAnswer] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);

  const auth = useContext(AuthContext);

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

  useEffect(() => {
    if (!auth?.user) {
        setShowLoginButton(true);
    } else {
        console.log("User is authorized, performing action...");
    }
  });

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

  const handlePrint = async () => {
    try {
      const userId = getCookie('user-id');
      
      // Сохраняем тест
      const saveResponse = await fetch(`${config.BACKEND_URL}/test/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          answers: answers,
          testType: 'MALE_CHECKUP'
        })
      });
  
      if (!saveResponse.ok) {
        throw new Error('Ошибка при сохранении теста');
      }
  
      const savedTest = await saveResponse.json();
  
      // Создаем платеж
      const paymentResponse = await fetch(`${config.BACKEND_URL}/payment/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          testId: savedTest._id,
          amount: 5990
        })
      });
  
      if (!paymentResponse.ok) {
        throw new Error('Ошибка при создании платежа');
      }
  
      const { paymentResponse: htmlContent } = await paymentResponse.json();
      
      const paymentWindow = window.open('', '_blank');
      if (paymentWindow) {
        paymentWindow.document.write(htmlContent);
        paymentWindow.document.close();
      } else {
        toast({
          variant: "destructive",
          title: "Внимание",
          description: "Пожалуйста, разрешите всплывающие окна для этого сайта"
        });
      }
  
    } catch (error) {
      console.error('Ошибка:', error.message);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при сохранении теста"
      });
    }
  };

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
          currentQuestionId === '13' && (
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
                    setCurrentQuestionId('14')
                  }}
                >
                  Понятно
                </Button>
              </div>
            </div>
          ) || currentQuestionId === '14' && (
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
                  onClick={handlePrint}
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
              <p>Пройдите анкету и получите персональный план диагностики <b>за 5 минут.</b> <br /> Забота о себе начинается сегодня!</p>
              <div className="flex items-center justify-end">
                {showLoginButton && <Link
                  href="/login"
                  className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none text-white"
                  )}
                >
                  Войти
                </Link>}
                {!showLoginButton && <Button
                  className="bg-[#1D7CBC] hover:bg-[#1D7CBC]/[0.8] border-none"
                  onClick={
                      () => {setCurrentQuestionId('1');}
                  }>
                  Начать
                </Button>}
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
