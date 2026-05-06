'use client'

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchUsers() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if(term)  {
            params.set("q", term)
        } else {
            params.delete("q");
        }
        router.replace(`/?${params.toString()}`);
    }

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    placeholder="Search users by name.."
                    defaultValue={searchParams.get("q")?.toString()}    
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-4xl md:w-2xl sm:xl max-w-md rounded-xl border border-gray-700 bg-[#202020] p-4 text-white outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                />
            </div>
        </div>
    )
}