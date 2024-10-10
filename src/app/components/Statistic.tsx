import Link from "next/link";
import StatisticImg from "@/public/statistic.svg";
import Image from "next/image";

const Statistic = () => {
  return (
    <section className="bg-[#F4F7FA] mt-24 py-16 lg:py-28">
      <div className="container mx-auto px-4 lg:px-0 flex flex-col lg:flex-row items-center w-full gap-y-8">
        <div className="flex flex-col items-center gap-y-4 max-w-full text-center w-full lg:w-1/2">
          <h2 className="text-[#1C1F25] font-semibold text-3xl max-w-full lg:max-w-[456px]">
            1 in 20 scans result in a potentially life-saving diagnosis
          </h2>
          <p className="max-w-full lg:max-w-[456px] text-[#4B5162]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
          </p>
          <Link href="/" className="text-[#1D7CBC] border border-[#1D7CBC] rounded-lg px-4 py-2">
            Узнать подробнее
          </Link>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <Image src={StatisticImg} alt="statistic-img" />
        </div>
      </div>
    </section>
  )
}

export default Statistic;
