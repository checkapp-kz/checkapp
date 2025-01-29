"use client"

import * as React from "react"

import {useCallback, useState} from "react";
import { cn } from "@/lib/utils"
import {Input} from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {PasswordInput} from "@/components/ui/password-input";
import {useRouter} from "next/navigation";
import {toast} from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import config from '../../config';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch(`${config.BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: mail,
        password: password
      })
    }).finally(() => {
      setIsLoading(false);
    });

    if (response.ok) {
      const data = await response.json();
      setUserId(data.userId);
      setOpen(true);
    } else if (response.status == 400) {
      const errorData = await response.json();
      toast({
        variant: 'destructive',
        title: errorData.message,
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Упс! Что-то пошло не так...',
        description: 'Попробуйте еще раз'
      })
    }
  }

  const confirm = useCallback(async () => {
    setConfirmLoading(true);
    const response = await fetch('https://checkapp-back.vercel.app/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        otp: otp
      })
    }).then((res) => {
      toast({
        variant: 'success',
        title: 'Поздравляем!',
        description: 'Регистрация прошла успешно!'
      });
      router.push('/login');
    }).catch(() => {
      toast({
        variant: 'destructive',
        title: 'Упс! Что-то пошло не так...',
        description: 'Попробуйте еще раз'
      })
    }).finally(() => {
      setConfirmLoading(false);
    });
  }, [otp, router, userId]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ваше имя"
              type="text"
              autoComplete="name"
              disabled={isLoading}
              className="border-[#4B5162]"
            />
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
          </div>
          <Button disabled={isLoading} className="bg-[#1D7CBC] hover:bg-[#1D7CBC]">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Верификация пользователя</DialogTitle>
            <DialogDescription>
              На вашу почту был отправлен 6-значный OTP код, подтвердите его ниже для верификации
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button disabled={confirmLoading} type="submit" onClick={confirm}>
              {confirmLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
