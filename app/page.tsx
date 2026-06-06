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

        <div className="text-6xl mb-4">
          ☄️
        </div>

        <h1 className="text-5xl font-bold text-[#1F2A44]">
          52ing Library
        </h1>

        <p className="mt-4 text-gray-600">
          Stories waiting to find their orbit.
        </p>

        <p className="mt-2 text-gray-500">
          {books.length} books currently in orbit
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-3xl p-5 shadow hover:shadow-lg transition"
          >

            {book.cover && (
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
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

    </main>
  );
}