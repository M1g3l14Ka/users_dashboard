"use client";

import Image from "next/image";
import { User } from "@/types/types";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavorites } from "@/store/favorites";
import { useEffect, useState } from "react";

export default function UserCard({ user, index }: { user: User; index: number }) {
  const { favorites, toggleFavorite } = useFavorites();
  const [isMounted, setIsMounted] = useState(false);

  // Ждем Mounted на клиенте для безопасной работы с localStorage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isFavorite = favorites.includes(user.id);

  return (
    <motion.div
      initial={{ opacity: 1, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
      className="group relative h-full rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
    >
      <div className="flex h-full flex-col gap-4 rounded-2xl bg-[#0f172a] p-6 text-white transition-colors duration-300 group-hover:bg-[#131c31]">
        
        {/* Шапка */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={user.image}
              alt={user.firstName}
              width={60}
              height={60}
              className="rounded-full bg-gray-800 p-1 ring-2 ring-gray-700/50"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-100">
                {user.firstName} {user.lastName}
              </h2>
              <h3 className="text-sm font-medium text-purple-400">
                {user.company.title}
              </h3>
            </div>
          </div>

          {/* Кнопка лайка */}
          {isMounted && (
            <button
              onClick={() => toggleFavorite(user.id)}
              className="rounded-full p-2 transition-colors hover:bg-gray-800 focus:outline-none"
            >
              <Heart
                className={`h-6 w-6 transition-all duration-300 ${
                  isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-500 hover:text-pink-400"
                }`}
              />
            </button>
          )}
        </div>

        <div className="h-px w-full bg-gray-800/50"></div>

        {/* Контакты */}
        <div className="mt-auto flex flex-col gap-2 text-sm text-gray-400">
          <p><span className="font-semibold text-gray-300">Company:</span> {user.company.name}</p>
          <p className="truncate" title={user.email}>
            <span className="font-semibold text-gray-300">Email:</span> {user.email}
          </p>
          <p><span className="font-semibold text-gray-300">Phone:</span> {user.phone}</p>
        </div>

      </div>
    </motion.div>
  );
}