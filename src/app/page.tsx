import BookList from "@/app/_components/BookList";

export default function Home() {
  return (
      <>
          {/*<div className="font-bold text-center mt-10 text-5xl">*/}
          {/*    <h1>Book Hub</h1>*/}
          {/*</div>*/}
          {/*<BookList/>*/}

          <main className="bg-gray-100 min-h-screen">
              <div className="container mx-auto py-8">
                  <h1 className="text-3xl font-bold text-center mb-8">Book Hub</h1>
                  <BookList/>
              </div>
          </main>
      </>

  );
}
