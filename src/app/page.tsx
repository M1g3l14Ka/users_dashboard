import UserCard from "@/components/UserCard";
import SearchUsers from "@/components/SearchUsers";
import { Suspense } from "react";

import { ApiResponse } from "@/types/types";

// Передаем query в функцию
async function getUsers(query: string): Promise<ApiResponse> {
  const url = query 
    ? `https://dummyjson.com/users/search?q=${query}` 
    : `https://dummyjson.com/users`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch users :(");
  }
  return res.json();
}

// Принимаем searchParams из URL
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Достаем параметр 'q' (например: /?q=John)
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  
  const data = await getUsers(query);

  return (
    <main className="min-h-screen bg-[#050505] p-8">
      <div className="mx-auto max-w-7xl flex justify-center items-center flex-col gap-10">
        
        {/* Заголовок и наш новый Поиск */}
        <h1 className=" text-center text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
          Users Dashboard
        </h1>
        
        <Suspense fallback={<div className="text-center text-lg text-gray-500 font-bold font-mono mb-8 p-2">Loading search...</div>}>
          <SearchUsers/>
        </Suspense>

        {/* Сетка пользователей */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {data.users.length > 0 ? (
            data.users.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10 text-xl">
              No users found matching {query}
            </p>
          )}
        </div>
        
      </div>
    </main>
  );
}