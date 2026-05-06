"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/types";
import UserCard from "./UserCard";
import { useFavorites } from "@/store/favorites";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesUsers({ favoritesUsers }: { favoritesUsers: User[] }) {
  const { favorites } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Фильтруем массив: если включен режим "Избранные", оставляем только лайкнутых
  const displayUsers = showFavorites
    ? favoritesUsers.filter((user) => favorites.includes(user.id))
    : favoritesUsers;

  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration: 0.7 }}
      className="w-full"
    >
      {/* Переключатель вкладок */}
      {isMounted && (
        <div className="mb-8 flex justify-center">
          <div className="flex space-x-1 rounded-xl bg-gray-800 p-1">
            <button
              onClick={() => setShowFavorites(false)}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                !showFavorites
                  ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                showFavorites
                  ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Favorites ({favorites.length})
            </button>
          </div>
        </div>
      )}

      {/* Сама сетка */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {displayUsers.length > 0 ? (
            displayUsers.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full mt-10 text-center text-xl text-gray-500"
            >
              {showFavorites ? "You haven't caught any pokemons yet!" : "No users found."}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}