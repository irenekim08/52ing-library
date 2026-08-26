import BookBrowser from "./components/BookBrowser";
import Image from "next/image";
import Papa from "papaparse";

type SheetBook = {
  ID?: string;
  제목?: string;
  글쓴이?: string;
  시리즈?: string;
  카테고리?: string;
  연령?: string;
  Availability?: string;
  표지?: string;
};

async function getBooks() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BOOKS_CSV_URL!,
    {
      cache: "no-store",
    }
  );

  const csv = await response.text();

  const parsed = Papa.parse<SheetBook>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data
    .map((book) => ({
      id: book.ID?.trim() || "",
      title: book.제목?.trim() || "",
      author: book.글쓴이?.trim() || "",
      series: book.시리즈?.trim() || "",
      category: book.카테고리?.trim() || "",
      age: book.연령?.trim() || "",
      availability: book.Availability?.trim() || "",
      cover: book.표지?.trim() || "",
    }))
    .filter((book) => book.title);
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-[#FCF057] p-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-5">
          <Image
            src="/52ing.PNG"
            alt="운석 오잉이"
            width={140}
            height={140}
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-5xl font-bold text-[#1F2A44]">
          오잉 도서관
        </h1>

        <p className="mt-4 text-gray-600">
          우리들의 운석의 새로운 궤도를 찾아서!
        </p>

        <p className="mt-2 text-gray-500">
          어린이와 청소년을 위한 한국어 책 도서관
        </p>

        <p className="mt-3 text-gray-500">
          지금 {books.length}권의 책이 오잉 도서관에 있어요 ☄️
        </p>
      </div>

      <section>
        <h2 className="text-3xl font-bold text-[#1F2A44] mb-8">
          책 둘러보기
        </h2>

        <BookBrowser books={books} />
      </section>
    </main>
  );
}