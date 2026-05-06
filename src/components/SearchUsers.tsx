'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { BorderTrail } from "../../BorderTrailComponent/motion-primitives/border-trail";
import { motion } from "framer-motion";

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
        <motion.div 
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center w-full">
          <div className="group relative w-full max-w-md overflow-hidden rounded-xl bg-gray-800 p-px focus-within:ring-2 focus-within:ring-purple-500/50">

            <input
              type="text"
              placeholder="Search users by name..."
              defaultValue={searchParams.get("q")?.toString()}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-xl bg-[#080808] p-4 text-white outline-none transition-colors placeholder:text-gray-500"
            />

            <BorderTrail
                style={{
                  boxShadow:
                    '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                }}
                size={100} 
            />
          </div>
        </motion.div>
      );
}
