"use client";

import { useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  series: string;
  category: string;
  age: string;
  availability: string;
  cover: string;
};

function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow hover:shadow-lg transition">
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

      <h3 className="font-bold text-lg">{book.title}</h3>

      <p className="text-gray-600">{book.author}</p>

      {book.category && (
        <span className="inline-block mt-3 bg-[#5FE6D3] px-3 py-1 rounded-full text-sm">
          {book.category}
        </span>
      )}

      {book.age && (
        <span className="inline-block mt-2 ml-2 bg-[#FFD93D] px-3 py-1 rounded-full text-sm">
          {book.age}
        </span>
      )}
    </div>
  );
}

export default function BookBrowser({ books }: { books: Book[] }) {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  const seriesGroups: Record<string, Book[]> = {};

  books.forEach((book) => {
    const seriesName = book.series?.trim();

    if (seriesName) {
      if (!seriesGroups[seriesName]) {
        seriesGroups[seriesName] = [];
      }

      seriesGroups[seriesName].push(book);
    }
  });

  const individualBooks = books.filter(
    (book) => !book.series || book.series.trim() === ""
  );

  // If a series has been clicked, ONLY show that series
  if (selectedSeries) {
    const selectedBooks = seriesGroups[selectedSeries] || [];

    return (
      <div>
        <button
          onClick={() => setSelectedSeries(null)}
          className="mb-8 bg-[#FFD93D] px-5 py-3 rounded-full font-bold hover:scale-105 transition"
        >
          ← 시리즈 목록으로
        </button>

        <h2 className="text-3xl font-bold text-[#1F2A44] mb-2">
          {selectedSeries}
        </h2>

        <p className="text-gray-500 mb-8">
          총 {selectedBooks.length}권
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    );
  }

  // Normal library view
  return (
    <div>
      {/* SERIES */}
      {Object.keys(seriesGroups).length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">
            시리즈
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {Object.entries(seriesGroups).map(
              ([seriesName, seriesBooks]) => (
                <button
                  key={seriesName}
                  onClick={() => setSelectedSeries(seriesName)}
                  className="text-left bg-[#5FE6D3] rounded-3xl p-5 shadow hover:shadow-lg hover:scale-[1.02] transition"
                >
                  {seriesBooks[0].cover ? (
                    <img
                      src={seriesBooks[0].cover}
                      alt={seriesName}
                      className="w-full aspect-[2/3] object-cover rounded-2xl mb-4"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] flex items-center justify-center text-4xl mb-4">
                      📚
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-[#1F2A44]">
                    {seriesName}
                  </h3>

                  <p className="mt-2 text-[#1F2A44]/70">
                    총 {seriesBooks.length}권
                  </p>

                  <p className="mt-4 font-bold">
                    책 보기 →
                  </p>
                </button>
              )
            )}
          </div>
        </>
      )}

      {/* INDIVIDUAL BOOKS */}
      <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">
        낱권 책
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {individualBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}