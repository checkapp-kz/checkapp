"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import {UserAuthForm} from "@/app/components/UserAuthForm";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/logo.svg";

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 700,
    })
  }, [])

  return (
    <main className="overflow-x-hidden">
      <section className="container mx-auto my-4 rounded-3xl overflow-hidden">
        <div className="relative hidden h-[800px] flex-col bg-blue-300 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            href="/examples/authentication"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Войти
          </Link>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-[#F4F7FA]/[0.5]" />
            <div className="relative z-20 flex items-center gap-x-2 text-lg font-medium">
              <Image src={Logo} alt="logo" />
              <p className="text-[#1C1F25]">CheckApp</p>
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg text-[#1C1F25]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                </p>
                <footer className="text-sm text-[#1C1F25]">Цитата основателей</footer>
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
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
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
