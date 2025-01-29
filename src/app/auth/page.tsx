"use client"

import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {UserAuthForm} from "@/app/components/UserAuthForm";
import {buttonVariants} from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/logo.svg";

export default function Home() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 700,
    })
  }, [])

  return (
    <main className="overflow-x-hidden">
      <section className="container mx-auto my-4 rounded-3xl overflow-hidden">
        <div className="relative hidden h-[700px] flex-col bg-[#F4F7FA] items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8 text-[#4B5162]"
            )}
          >
            Войти
          </Link>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4CBFFF] to-[#3447F6]" />
            <div className="relative z-20 flex items-center gap-x-2 text-lg font-medium">
              <Image src={Logo} alt="logo" />
              <p className="text-white">CheckApp</p>
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-sm text-white">
                  В CheckApp мы верим, что здоровье начинается с превентивного подхода. Наша миссия — предоставить каждому клиенту доступ к рекомендациям, основанным на доказательной медицине, сохраняя его/ее свободу выбора. Вы решаете, где и как заботиться о своем здоровье, а мы помогаем сделать этот путь максимально доступным и эффективным.
                </p>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Создать аккаунт
                </h1>
                <p className="text-sm text-muted-foreground">
                  Введите свою почту для создания аккаунта
                </p>
              </div>
              <UserAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
               Нажимая продолжить, вы соглашаетесь с нашими{" "}
                <Link
                  href="https://checkapp.kz/public-offer.pdf"
                  target="_blank"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Условиями использования
                </Link>{" "}
                и{" "}
                <Link
                  href="https://checkapp.kz/politic-use-data.pdf"
                  target="_blank"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Политикой конфиденциальности
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
