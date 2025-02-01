"use client";
import { Category } from "@/models/category";
import { Provider } from "@/models/provider";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useProvider } from "@/contexts/ProviderContext";

export default function CategoriesList() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { setSelectedProvider } = useProvider();

  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories");
      const { categories } = await response.json();
      if (categories && categories.length > 0) {
        setCategories(categories);
        setActiveCategory(categories[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  }

  const fetchProviders = useCallback(async () => {
    if (!activeCategory) return;

    try {
      const response = await fetch(
        `/api/providers?categoryId=${activeCategory}`
      );
      const { providers } = await response.json();
      setProviders(providers);
    } catch (err) {
      console.error("Failed to fetch providers:", err);
    }
  }, [activeCategory]);

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
    router.push(`/dashboard/customer/calendar`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchProviders();
    }
  }, [activeCategory, fetchProviders]);

  if (loading) {
    return <div className="text-center">Carregando categorias...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center border-b border-gray-700">
        <div className="flex space-x-0 overflow-x-auto ">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-1 py-2.5
                text-xs font-medium
                transition-all duration-200 ease-in-out
                border-b-2 
                min-w-[100px]
                hover:bg-gray-700/30
                ${
                  activeCategory === category.id
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-gray-200"
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {providers.map((provider) => (
          <div
            key={provider.id}
            onClick={() => handleProviderClick(provider)}
            className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <h3 className="text-sm font-medium text-white mb-2">
              {provider.name}
            </h3>
            {provider.description && (
              <p className="text-gray-300 text-sm mb-3">
                {provider.description}
              </p>
            )}
            <div className="flex items-center text-gray-400 text-sm">
              <span>⭐ {provider.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
