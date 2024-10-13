import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import {Sheet, SheetContent, SheetDescription, SheetTrigger} from "@/components/ui/sheet";
import {MenuIcon} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const Navbar = () => {
  const links = [
    {
      label: 'Консилиум',
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
    <nav className="fixed top-0 left-1/2 right-1/2 transform -translate-x-1/2 w-full z-50 bg-white lg:py-5 py-2 px-4 lg:px-0 flex items-center justify-between">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Sheet>
            <SheetTrigger className="flex lg:hidden">
              <MenuIcon/>
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
        </div>
        <div className='flex items-center gap-x-4'>
          <Select defaultValue="RU">
            <SelectTrigger className="w-20">
              <SelectValue placeholder="RU"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="KK">KK</SelectItem>
                <SelectItem value="RU">RU</SelectItem>
                <SelectItem value="ENG">EN</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Link
            href="/auth"
            className="bg-[#1D7CBC] hover:bg-[#1D7CBC] text-white rounded-lg px-4 py-2 hover:drop-shadow-md transition ease-in-out delay-150 lg:ml-auto duration-300"
          >
            Войти
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
