"use client"
import Ava from "@/public/ava.svg";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import config from '../../config';

interface Review {
  id: number;
  text: string;
  userName: string;
}

const Reviews = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [gender, setGender] = useState('male');
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Дефолтный список отзывов
  const defaultReviews = [
    {
      id: 1,
      text: 'Тут может быть ваш отзыв',
      userName: 'Linda F.'
    },
    {
      id: 2,
      text: 'Тут может быть ваш отзыв',
      userName: 'Linda F.'
    },
    {
      id: 3,
      text: 'Тут может быть ваш отзыв',
      userName: 'Linda F.'
    },
    {
      id: 4,
      text: 'Тут может быть ваш отзыв',
      userName: 'Linda F.'
    },
    {
      id: 5,
      text: 'Тут может быть ваш отзыв',
      userName: 'Linda F.'
    },
  ];

  // Получение отзывов при монтировании компонента
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${config.BACKEND_URL}/reviews`);
        if (response.ok) {
          const data = await response.json();
          // Если есть отзывы с бэкенда, используем их, иначе используем дефолтные
          setReviews(data.length > 0 ? data : defaultReviews);
        } else {
          console.error('Ошибка при получении отзывов');
          setReviews(defaultReviews);
        }
      } catch (error) {
        console.error('Ошибка при получении отзывов:', error);
        setReviews(defaultReviews);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!name.trim() || !review.trim()) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Пожалуйста, заполните все поля"
        });
        return;
      }

      setIsLoading(true);

      const response = await fetch(`${config.BACKEND_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: name,
          text: review
        })
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Спасибо за ваш отзыв!"
        });
        setOpen(false);
        setName('');
        setReview('');
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось отправить отзыв. Попробуйте позже."
        });
      }
    } catch (error) {
      console.error('Ошибка:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при отправке отзыва"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto mt-24 py-16 lg:py-28">
      <div className="flex flex-col items-center gap-y-4 px-4 lg:px-0">
        <h1 className="text-center text-[#1C1F25] font-semibold text-3xl lg:text-5xl">
          Отзывы
        </h1>
        <p className="text-[#4B5162] text-center">
          Мы гордимся тем, что предлагаем качественный продукт. <br />
          Но не верьте нам на слово — лучше послушайте тех, кто уже воспользовался CheckApp
        </p>
      </div>
      <Carousel
        className="mt-12"
        opts={{
          loop: reviews.length >= 4,
          align: "center",
          containScroll: reviews.length < 4 ? "keepSnaps" : "trimSnaps"
        }}
      >
        <CarouselContent className={reviews.length < 4 ? "justify-center" : ""}>
          {reviews.map((review) => (
            <CarouselItem 
              key={review.id} 
              className={`basis-80 lg:basis-96 ${reviews.length < 4 ? 'md:basis-1/3' : ''}`}
            >
              <div className="px-10 py-8 border rounded-3xl max-w-[320px] h-[350px] flex flex-col items-center justify-center gap-y-5 relative">
                <p className="text-xl text-[#1C1F25] font-medium text-center">
                  {review.text}
                </p>
                <div className="absolute flex flex-col items-center gap-y-3 bottom-8">
                  <Image src={Ava} alt="ava-img" />
                  <p className="text-[#4B5162]">{review.userName}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-8">
        <Button 
          onClick={() => setOpen(true)}
          className="bg-[#1D7CBC] hover:bg-[#1666a0] text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-[1.02]"
        >
          Оставить отзыв
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1C1F25]">
              Оставить отзыв
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 mt-4">
            <Input
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[#B6BCCD]"
            />
            <Textarea
              placeholder="Ваш отзыв"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="border-[#B6BCCD] min-h-[120px] resize-none"
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-[#1D7CBC] hover:bg-[#1666a0] text-white w-full"
            >
              {isLoading ? "Отправка..." : "Отправить отзыв"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Reviews;
