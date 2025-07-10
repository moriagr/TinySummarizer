'use client'
import CustomForm from "../components/CustomForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className=" w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start m-auto">
        <h2 className="text-xl font-semibold mt-6 m-auto">Quick Summarize App</h2>

        <CustomForm />
      </main>
    </div>
  );
}
