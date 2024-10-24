import Image from "next/image";
import Doctor1 from "@/public/docs/1.svg";
import Doctor2 from "@/public/docs/2.svg";
import Doctor3 from "@/public/docs/3.svg";

const DocList = () => {
  const docsList = [
    {
      id: 1,
      img: Doctor1,
      position: 'Врач гинеколог',
      name: 'Омарова Жанара Дисембаевна',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
    },
    {
      id: 2,
      img: Doctor2,
      position: 'Врач уролог-андролог',
      name: 'Фролов Ростислав Александрович',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
    },
    {
      id: 3,
      img: Doctor3,
      position: 'Спортивный врач',
      name: 'Реймер Эвальд Олегович',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
    }
  ];

  return (
    <section className="container mx-auto py-12 lg:py-16 px-4 lg:px-0">
      <div className="flex flex-col items-center gap-y-8">
        {docsList.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center lg:items-start flex-col lg:flex-row lg:max-w-[90%] pb-8 gap-6 lg:gap-16
              ${index % 2 === 0 ? '' : 'flex-row-reverse'}
              ${index !== docsList.length - 1 ? 'border-b' : ''}`} // Проверка на последний элемент
          >
            <Image src={item.img} alt="doctor-img" className="rounded-2xl" />
            <div className="flex flex-col gap-y-4">
              <h3 className="text-3xl font-bold text-[#1C1F25]">{item.name}</h3>
              <p className="px-4 py-2 rounded-full bg-[#1D7CBC] text-white w-fit shadow-md">
                {item.position}
              </p>
              <p className="text-[#4B5162] text-ld">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DocList;
