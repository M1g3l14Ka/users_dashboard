import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: number[]; // Храним ID лайкнутых юзеров
  toggleFavorite: (id: number) => void;
  showFavoritesOnly: boolean;
  toggleShowFavorites: () => void;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      showFavoritesOnly: false,
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id) // Убираем
            : [...state.favorites, id], // Добавляем
        })),
      toggleShowFavorites: () =>
        set((state) => ({ showFavoritesOnly: !state.showFavoritesOnly })),
    }),
    { name: "favorites-pokemons" } // Название в localStorage :)
  )
);