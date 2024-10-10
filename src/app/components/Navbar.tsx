import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {MenuIcon} from "lucide-react";

const Navbar = () => {
  const links = [
    {
      label: 'Наши врачи',
      link: '/docs'
    },
    {
      label: 'Чекап-пакеты',
      link: '#check-list'
    },
    {
      label: 'Компаниям',
      link: '/company'
    },
    {
      label: 'Партнеры',
      link: '#partners'
    },
    {
      label: 'FAQ',
      link: '#faq'
    },
    {
      label: 'Praxis podcast',
      link: 'https://www.youtube.com/channel/UC-NQBgRNxRmydHL3Y0oSnsQ'
    }
  ];

  return (
    <nav className="container mx-auto lg:py-5 py-2 px-4 lg:px-0 flex items-center justify-between border-b">
      <Sheet>
        <SheetTrigger className="flex lg:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="top">
          <SheetDescription>
            <ul className="flex flex-col gap-y-2 text-[#4B5162]">
              {links.map((link) => (
                <li key={link.link}>
                  <Link href={link.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetDescription>
        </SheetContent>
      </Sheet>
      <Link href="/">
        <Image src={Logo} alt="logo"/>
      </Link>
      <ul className="items-center gap-x-6 ml-8 hidden lg:flex text-[#4B5162]">
        {links.map((link) => (
          <li key={link.link}>
            <Link href={link.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/auth"
        className="bg-[#1D7CBC] hover:bg-[#1D7CBC] text-white rounded-xl px-4 py-2 hover:drop-shadow-md transition ease-in-out delay-150 lg:ml-auto duration-300"
      >
        Войти
      </Link>
    </nav>
  )
}

export default Navbar;
