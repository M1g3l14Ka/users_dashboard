import FavoritesUsers from "@/components/FavoritesUsers";
import SearchUsers from "@/components/SearchUsers"; 
import { ApiResponse } from "@/types/types";
import { Suspense } from "react";

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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  const data = await getUsers(query);

  return (
    <main className="min-h-screen bg-[#050505] p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
          Users Dashboard
        </h1>

        <Suspense fallback={<div className="text-center text-gray-500 mb-8">Loading search...</div>}>
          <SearchUsers />
        </Suspense>

        <FavoritesUsers favoritesUsers={data.users} />
        
      </div>
    </main>
  );
}