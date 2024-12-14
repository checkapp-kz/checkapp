import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useCallback, useState} from "react";
import {toast} from "@/hooks/use-toast";

const CompanyForm = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch('https://checkapp-back.vercel.app/partner/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        mail: mail,
        message: message
      })
    }).finally(() => {
      setIsLoading(false)
      setName('');
      setMail('');
      setMessage('');
      toast({
        variant: 'success',
        title: 'Заявка успешно отправлена!',
        description: 'Мы свяжемся с вами в ближайшее время для обсуждение партнерства!'
      });
    });

  }, [mail, message, name]);

  return (
    <section className="container mx-auto py-12 px-4 lg:px-0">
      <div className="flex items-stretch flex-col lg:flex-row justify-center rounded-2xl overflow-hidden">
        <div className="w-full lg:w-1/2 bg-[#F4F7FA] p-8 flex flex-col gap-y-4">
          <h1 className="text-3xl font-bold text-[#1C1F25]">Хотите поработать с нами?</h1>
          <p className="text-[#4B5162]">
            Сегодня забота о здоровье сотрудников становится приоритетом для успешных компаний, стремящихся к
            долгосрочному развитию. Мы в CheckApp предлагаем уникальное решение для вашего бизнеса — индивидуальные
            чекап-пакеты именно для вашей компании, которые не только помогут заботиться о здоровье сотрудников, но и
            повысят их лояльность и продуктивность.
          </p>
          <div className="flex flex-col gap-y-2">
            <p className="text-[#4B5162] font-semibold">
              Почему это важно для вашей компании?
            </p>
            <ul className="flex flex-col gap-y-1 list-disc text-[#4B5162]">
              <li>
                Снижение больничных: ранняя диагностика и профилактика заболеваний позволяют снизить количество дней,
                когда сотрудники не могут работать.
              </li>
              <li>
                Повышение вовлеченности: сотрудники, чувствующие поддержку компании, более мотивированы и удовлетворены
                своей работой.
              </li>
              <li>
                Экономия на медицинских расходах: регулярные чекапы позволяют избежать затрат на лечение запущенных
                заболеваний.
              </li>
            </ul>
          </div>
          <p className="text-[#4B5162]">
            Будьте компанией, которая заботится о здоровье своих сотрудников! Свяжитесь с нами, чтобы обсудить возможности создания персонализированного чекап-пакета для вашей команды. Сделаем ваш бизнес здоровее вместе!
          </p>
        </div>
        <div className="w-full lg:w-1/2 bg-gradient-to-r from-[#3447F6] to-[#4CBFFF] p-8 flex flex-col gap-y-4 text-white">
          <h1 className="text-3xl font-bold">Напишите нам</h1>
          <Input
            type="name"
            placeholder="Имя"
            className="focus-visible:ring-0 border-white placeholder:text-white rounded-lg h-14 text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Почта"
            className="focus-visible:ring-0 border-white placeholder:text-white rounded-lg h-14 text-lg"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <Textarea
            placeholder="Напишите письмо"
            className="focus-visible:ring-0 border-white placeholder:text-white resize-none rounded-lg h-20 text-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            disabled={isLoading}
            className="bg-white text-[#1C1F25] hover:bg-white rounded-lg"
            onClick={sendMail}
          >
            {isLoading ? 'Идет отправка...' : 'Отправить'}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CompanyForm;
