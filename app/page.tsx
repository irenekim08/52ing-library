import LibraryExperience from "./components/LibraryExperience";
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

  return <LibraryExperience books={books} />;
}