"use client"
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import config from '../../config';

interface UserTest {
  _id: string;
  testType: "MALE_CHECKUP" | "FEMALE_CHECKUP" | "SPORT_CHECKUP";
  createdAt: string;
  paymentStatus?: string;
}

const testTypeLabels = {
  MALE_CHECKUP: "Мужской чекап",
  FEMALE_CHECKUP: "Женский чекап",
  SPORT_CHECKUP: "Спортивный чекап"
};

export default function CheckupsPage() {
  const [tests, setTests] = useState<UserTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const userId = getCookie('user-id');
        const response = await fetch(`${config.BACKEND_URL}/test/user-tests/${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setTests(data);
        } else {
          console.error('Ошибка при получении чекапов');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-2xl font-bold mb-6">Загрузка...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Мои чекапы</h1>
      
      {tests.length === 0 ? (
        <p className="text-gray-500">У вас пока нет пройденных чекапов</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <Card key={test._id}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-[#1D7CBC]">
                    {testTypeLabels[test.testType]}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Создан: {format(new Date(test.createdAt), 'dd MMMM yyyy', { locale: ru })}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">
                      Статус: {test.paymentStatus === 'PAID' ? (
                        <span className="text-green-600">Оплачен</span>
                      ) : (
                        <span className="text-yellow-600">Ожидает оплаты</span>
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 