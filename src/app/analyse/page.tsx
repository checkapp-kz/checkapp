"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analyse() {
  const pathname = usePathname();

  const [analyseName, setAnalyseName] = useState("");
  const [file, setFile] = useState(null);
  const [analyses, setAnalyses] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const saveAnalyse = useCallback(() => {
    if (analyseName && file) {
      const newAnalyse = { name: analyseName, file }; // Сохраняем сам файл
      setAnalyses((prevAnalyses) => [...prevAnalyses, newAnalyse]);
      setAnalyseName("");
      setFile(null);
    } else {
      alert("Заполните название анализа и выберите файл!");
    }
  }, [analyseName, file]);

  return (
    <main className="lg:container lg:mx-auto p-4 lg:p-0 lg:pb-8 flex">
      <div className="px-8 py-4 border flex flex-col gap-y-4 rounded-lg min-w-56 h-fit">
        <Link href="/checkups" className={cn(pathname === "#" ? "text-[#1D7CBC]" : "", "hover:underline")}>
          Мои чекапы
        </Link>
        <Link href="/analyse" className={cn(pathname === "/analyse" ? "text-[#1D7CBC]" : "", "hover:underline")}>
          Мои анализы
        </Link>
      </div>
      <section className="pl-8 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Список анализов</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Добавить анализы</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="mb-4">
                <DialogTitle>Добавление анализа</DialogTitle>
                <DialogDescription className="mt-2">
                  Для добавления анализа нужно внести имя анализа, а также сами анализы в формате{" "}
                  <span className="font-bold">PDF, IMG</span>
                </DialogDescription>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="name" className="text-left">
                    Название анализа
                  </Label>
                  <Input
                    id="name"
                    value={analyseName}
                    onChange={(event) => setAnalyseName(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="doc" className="text-left">
                    Файл
                  </Label>
                  <Input
                    id="doc"
                    type="file"
                    onChange={handleFileChange}
                    className="file:mt-0.5 file:pl-0"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-[#1D7CBC] hover:bg-[#1D7CBC]" onClick={saveAnalyse}>
                    Загрузить
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-4 flex gap-4 flex-wrap">
          {analyses.length > 0 ? (
            analyses.map((analyse, index) => (
              <Card key={index} className="w-full max-w-72">
                <CardHeader>
                  <CardTitle>{analyse.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyse.file.type === "application/pdf" && (
                    <iframe
                      src={URL.createObjectURL(analyse.file)}
                      width="100%"
                      height="180px"
                      className="rounded-lg border"
                    />
                  )}
                  {analyse.file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(analyse.file)}
                      alt={analyse.name}
                      className="w-full h-[180px] object-cover rounded-lg border"
                    />
                  )}
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <a
                    href={URL.createObjectURL(analyse.file)}
                    download={analyse.file.name}
                  >
                    Скачать
                  </a>
                  <Button variant="ghost" className="flex items-center gap-x-2">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-md">Пока нет добавленных анализов</p>
          )}
        </div>
      </section>
    </main>
  );
}
