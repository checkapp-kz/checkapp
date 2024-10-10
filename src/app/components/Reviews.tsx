import Ava from "@/public/ava.svg";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Image from "next/image";

const Reviews = () => {

  const reviewList = [
    {
      id: 1,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      author: 'Linda F.'
    },
    {
      id: 2,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      author: 'Linda F.'
    },
    {
      id: 3,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      author: 'Linda F.'
    },
    {
      id: 4,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      author: 'Linda F.'
    },
    {
      id: 5,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      author: 'Linda F.'
    },
  ];

  return (
    <section className="container mx-auto mt-24 py-16 lg:py-28">
      <div className="flex flex-col items-center gap-y-4 px-4 lg:px-0">
        <h1 className="text-center text-[#1C1F25] font-semibold text-3xl lg:text-5xl">
          Отзывы наших клиентов
        </h1>
        <p className="text-[#4B5162] text-center">
          В Checkapp мы гордимся тем, что предоставляем первоклассный продукт. <br />
          Но не верьте нам на слово. Послушайте, что говорят наши довольные клиенты.
        </p>
      </div>
      <Carousel
        className="mt-12"
        opts={{
          loop: true,
          align: "center"
        }}
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem key={review.id} className="basis-80 lg:basis-96">
              <div className="px-10 py-8 border rounded-3xl max-w-[320px] flex flex-col items-center gap-y-5">
                <p className="text-xl text-[#1C1F25] font-medium text-center">
                  {review.text}
                </p>
                <div className="flex flex-col items-center gap-y-3">
                  <Image src={Ava} alt="ava-img" />
                  <p className="font-semibold text-[#343844]">{review.author}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default Reviews;
