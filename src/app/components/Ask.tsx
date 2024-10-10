import {Button} from "@/components/ui/button";

const Ask = () => {
  return (
    <section className="container mx-auto px-4 lg:px-0 flex flex-col items-center gap-y-8 mt-24 lg:mt-0">
      <h1 className="text-center text-[#1C1F25] font-semibold text-3xl lg:text-5xl">Остались вопросы?</h1>
      <Button className="w-fit text-2xl h-auto bg-[#1D7CBC] hover:bg-[#1D7CBC] hover:drop-shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
        Узнать ответы
      </Button>
    </section>
  )
}

export default Ask;
