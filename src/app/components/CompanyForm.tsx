import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

const CompanyForm = () => {
  return (
    <section className="container mx-auto py-12 lg:py-16 px-4 lg:px-0">
      <div className="flex items-stretch flex-col lg:flex-row justify-center rounded-2xl overflow-hidden">
        <div className="w-full lg:w-1/2 bg-[#F4F7FA] p-8 flex flex-col gap-y-4">
          <h1 className="text-3xl font-bold text-[#1C1F25]">Сотрудничество?</h1>
          <p className="text-[#4B5162]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
        <div className="w-full lg:w-1/2 bg-[#1D7CBC] p-8 flex flex-col gap-y-4 text-white">
          <h1 className="text-3xl font-bold">Напишите нам</h1>
          <Input type="name" placeholder="ФИО" className="focus-visible:ring-0 border-[#519B8E] placeholder:text-white" />
          <Input type="email" placeholder="Email" className="focus-visible:ring-0 border-[#519B8E] placeholder:text-white" />
          <Textarea placeholder="Напишите письмо" className="focus-visible:ring-0 border-[#519B8E] placeholder:text-white resize-none" />
          <Button className="bg-[#519B8E] hover:bg-[#519B8E]">
            Отправить
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CompanyForm;
