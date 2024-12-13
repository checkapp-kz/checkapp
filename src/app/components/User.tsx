"use client"

import {useCallback, useEffect, useState} from "react";
import {ChartLine, List, User} from "lucide-react";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import Link from "next/link";
import {Profile} from "@/app/types/profile";
import {Skeleton} from "@/components/ui/skeleton";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {ExitIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";

const UserComponent = () => {
  const router = useRouter();
  const [me, setMe] = useState<Profile | null>(null); // Устанавливаем начальное значение null
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние для загрузки
  const [token, setToken] = useState<string | undefined>(getCookie('user-token') as string | undefined); // Добавляем state для токена

  // Получение данных пользователя
  const getMe = useCallback(async () => {
    if (!token) return; // Проверяем наличие токена

    try {
      const response = await fetch('https://checkapp-back.vercel.app/users/me', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMe(data);
        setCookie('user-name', data.name);
        setCookie('user-email', data.email);
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setIsLoading(false); // Устанавливаем завершение загрузки
    }
  }, [token]);

  // Функция для выхода
  const exit = useCallback(() => {
    deleteCookie('user-token');
    setToken(undefined);
    router.refresh();
  }, [router]);

  const goToAnalyse = useCallback(() => {
    router.push('/analyse');
  }, [router]);

  useEffect(() => {
    setToken(getCookie('user-token') as string | undefined); // Обновляем токен при рендере
    if (token) {
      getMe(); // Загружаем данные пользователя
    } else {
      setIsLoading(false); // Если токена нет, прекращаем загрузку
    }
  }, [token, getMe]);

  return (
    isLoading ? (
      <Skeleton className="w-8 h-8 rounded-full" />
    ) : (
      !token ? (
        <Link
          href="/login"
          className="bg-[#1D7CBC] hover:bg-[#1D7CBC] text-white rounded-lg px-4 py-2 hover:drop-shadow-md transition ease-in-out delay-150 lg:ml-auto duration-300"
        >
          Войти
        </Link>
      ) : (
        <HoverCard>
        <HoverCardTrigger className="flex items-center gap-x-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1D7CBC]">
            <User className="w-6 h-6 text-white"/>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit mt-2" align="end">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-1">
              <p>Добро пожаловать</p>
              <p className="font-medium text-[#1D7CBC]">{me?.name || "Неизвестный пользователь"}!</p>
            </div>
            <Button variant="ghost" className="gap-x-2 justify-start border-b rounded-none">
              <List className="w-4 h-4" />
              Мои чекапы
            </Button>
            <Button variant="ghost" className="gap-x-2 justify-start border-b rounded-none" onClick={goToAnalyse}>
              <ChartLine className="w-4 h-4" />
              Мои анализы
            </Button>
            <Button variant="ghost" className="gap-x-2 justify-start border-b rounded-none" onClick={exit}>
              <ExitIcon />
              Выйти
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
      )
    )
  )
}

export default UserComponent;
