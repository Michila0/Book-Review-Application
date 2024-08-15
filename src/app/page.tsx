import BookList from "@/app/books/page";

export default function Home() {
  return (
      <>
          <main className="bg-gray-100 min-h-screen">
              <div className="container mx-auto py-8">
                  <h1 className="text-3xl font-bold text-center mb-8">Book Hub</h1>
                  <BookList/>
              </div>
          </main>
      </>

  );
}
