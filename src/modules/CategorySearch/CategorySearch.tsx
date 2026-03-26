import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "./CategorySearch.module.css";
import categories from "@/config/products_Category.json";

type CategoryItem = {
  name: string;
  slug: string;
  imageUrl?: string;
};

type CategorySearchProps = {
  placeholder?: string;
  variant?: "hero" | "products";
};

export default function CategorySearch({
  placeholder = "Search products/services",
  variant = "products",
}: CategorySearchProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const allCategories = categories as CategoryItem[];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCategories;
    return allCategories.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
  }, [query, allCategories]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

const handleNavigate = (slug: string) => {
  setOpen(false);
  setQuery("");
  router.push(`/products/${slug}`);
};

  return (
    <div
      ref={rootRef}
      className={`${styles.wrapper} ${styles[variant]}`}
    >
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        className={styles.input}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      <button
        type="button"
        className={styles.toggleBtn}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle category list"
      >
        ▼
      </button>

      {open ? (
        <div className={styles.dropdown}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((item) => (
              <button
                key={item.slug}
                type="button"
                className={styles.option}
                onClick={() => handleNavigate(item.slug)}
              >
                {item.name}
              </button>
            ))
          ) : (
            <div className={styles.empty}>No categories found.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}