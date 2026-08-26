import Image from "next/image";

async function getBooks() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BOOKS_CSV_URL!,
    {
      cache: "no-store",
    }
  );

  const csv = await response.text();

  const lines = csv.split("\n");

  const books = lines.slice(1).map((line) => {
    const values = line.split(",");

    return {
      id: values[0],
      title: values[1],
      author: values[2],
      category: values[7],
      age: values[8],
      availability: values[10],
      cover: values[12],
    };
  });

  return books.filter((book) => book.title);
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-[#FFFDF8] p-8">
      <div className="text-center mb-12">
        
        {/* 오잉 마스코트 */}
        <div className="flex justify-center mb-5">
          <Image
            src="/52ing.png"
            alt="오잉"
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-3xl p-5 shadow hover:shadow-lg transition"
            >
              {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className="w-full aspect-[2/3] object-cover rounded-2xl mb-4"
              />
            ) : (
              <div className="w-full aspect-[2/3] flex items-center justify-center text-4xl mb-4">
                📚
              </div>
            )}

              <h2 className="font-bold text-lg">
                {book.title}
              </h2>

              <p className="text-gray-600">
                {book.author}
              </p>

              {book.category && (
                <div className="mt-3">
                  <span className="bg-[#5FE6D3] px-3 py-1 rounded-full text-sm">
                    {book.category}
                  </span>
                </div>
              )}

              {book.age && (
                <div className="mt-2">
                  <span className="bg-[#FFD93D] px-3 py-1 rounded-full text-sm">
                    {book.age}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}