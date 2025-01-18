import Card1 from "@/public/cards/1.svg";
import Card2 from "@/public/cards/2.svg";
import Card3 from "@/public/cards/3.svg";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {useCallback, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {PasswordInput} from "@/components/ui/password-input";
import * as React from "react";
import {Icons} from "@/components/ui/icons";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

export default function CheckCards() {
  const cardList = [
    {
      img: Card1,
      title: 'Спортивный',
      link: '/sportTest',
      price: '5 990 ₸'
    },
    {
      img: Card2,
      title: 'Женский',
      link: '/womanTest',
      price: '4 990 ₸'
    },
    {
      img: Card3,
      title: 'Мужской',
      link: '/manTest',
      price: '4 990 ₸'
    }
  ];

  const [mail, setMail] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(getCookie('user-token') as string | undefined);

  const checkAuth = useCallback((url: string) => {
    if (!token) {
      setOpen(true);
    } else {
      router.push(url);
    }
  }, [router, token]);

  async function onLogin() {
    setIsLoading(true);

    const response = await fetch('https://backend-checkapp.vercel.app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: mail,
        password: password
      })
    }).finally(() => {
      setIsLoading(false);
    });

    if (response.ok) {
      const data = await response.json();
      setCookie('user-token', data.access_token);
      window.location.reload();
    } else {
      const errorData = await response.json();
      if (errorData.message) {
        toast({
          variant: 'destructive',
          title: errorData.message,
          description: 'Введите корректные данные.'
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Упс! Что-то пошло не так...',
          description: 'Попробуйте еще раз'
        })
      }
    }
  }

  function goToRegister() {
    router.push('/auth');
  }

  return (
    <section id="check-cards" className="container mx-auto mt-24 flex flex-col gap-y-12 items-center px-4 lg:px-0">
      <h1 className="text-[#1C1F25] text-3xl lg:text-5xl font-semibold text-center">Персонализируй свой чекап</h1>
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {cardList.map((card, index) => (
            <CarouselItem key={index} className="basis-80 md:basis-1/3 lg:basis-1/3 relative flex items-end justify-center group">
              <Image src={card.img} alt="check-card" />
              <div className="absolute flex flex-col items-center gap-y-2 bottom-4 lg:bottom-8 w-[80%]">
                <h4 className="text-white font-semibold text-xl lg:text-4xl">{card.title}</h4>
                <p className="text-white text-lg">Цена: {card.price}</p>
                <Button
                  className="text-white border rounded bg-transparent hover:bg-transparent border-white mt-2 flex items-center justify-center w-full px-4 py-2 opacity-0 group-hover:opacity-100 transition duration-300"
                  onClick={() => {checkAuth(card.link)}}
                >
                  Узнать подробнее
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Авторизация
            </DialogTitle>
            <DialogDescription>
              Для прохождения чекапа необходима авторизация
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <div className="flex flex-col gap-y-4 w-10/12">
              <Input
                id="email"
                value={mail}
                onChange={(event) => setMail(event.target.value)}
                placeholder="email@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                className="border-[#4B5162]"
              />
              <PasswordInput
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Пароль"
                type="password"
                autoComplete="password"
                disabled={isLoading}
                className="border-[#4B5162]"
              />
              <div className="flex items-center justify-end gap-x-4">
                <Button variant="ghost" onClick={goToRegister}>Регистрация</Button>
                <Button
                  disabled={isLoading}
                  className="bg-[#1D7CBC] hover:bg-[#1D7CBC]"
                  onClick={onLogin}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Войти
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
