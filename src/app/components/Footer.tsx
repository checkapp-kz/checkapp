import {Facebook, Instagram, Mail, PhoneCall} from "lucide-react";

const Footer = () => {
  return (
    <footer className="container mx-auto border-t lg:px-0 px-4">
      <div className="flex flex-wrap items-start gap-8 lg:gap-16 py-8 lg:py-16">
        <div className="flex flex-col gap-y-2 lg:gap-y-4">
          <h6 className="text-[#343844] font-bold">
            Контакты
          </h6>
          <div className="flex items-center gap-x-2">
            <Mail className="text-[#519B8E]"/>
            <a href="mailto:checkapp.kz@gmail.com" className="text-[#4B5162] font-medium">
              checkapp.kz@gmail.com
            </a>
          </div>
          <div className="flex items-start gap-x-2">
            <PhoneCall className="text-[#519B8E]"/>
            <div className="flex flex-col">
              <a href="tel:+77012226747" className="text-[#4B5162] font-medium">
                +7 701 2226747
              </a>
              <a href="tel:+77019294571" className="text-[#4B5162] font-medium">
                +7 701 9294571
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 lg:gap-y-4">
          <h6 className="text-[#343844] font-bold">
            Соц. сети
          </h6>
          <div className="flex items-center gap-x-2">
            <Facebook className="text-[#519B8E]"/>
            <a href="https://www.facebook.com/?locale=ru_RU" target="_blank" className="text-[#4B5162] font-medium">
              Facebook
            </a>
          </div>
          <div className="flex items-center gap-x-2">
            <Instagram className="text-[#519B8E]"/>
            <a href="https://www.instagram.com/" target="_blank" className="text-[#4B5162] font-medium">
              Instagram
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 lg:gap-y-4 max-w-[254px]">
          <h6 className="text-[#343844] font-bold">
            Разное
          </h6>
          <a href="#" target="_blank" className="text-[#4B5162] font-medium">
            Публичная оферта
          </a>
          <a href="#" target="_blank" className="text-[#4B5162] font-medium">
            Политика хранения
          </a>
          <a href="#" target="_blank" className="text-[#4B5162] font-medium">
            Политика уничтожения
          </a>
          <a href="#" target="_blank" className="text-[#4B5162] font-medium">
            Политика по сбору и обработке
            персональных данных
          </a>
        </div>
      </div>
      <div className="mt-8 lg:mt-16 border-t py-4">
        <p className="text-[#626981] text-sm">©2024 Batrbekk · All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;
