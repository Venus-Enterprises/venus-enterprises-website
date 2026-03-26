"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./ProductsGridPage.module.css";

type CategoryVM = {
  name: string;
  slug: string;
  image: string;
};

type ProductsGridPageVM = {
  breadcrumb: { label: string; href?: string }[];
  title: string;
  description: string;
  categories: CategoryVM[];
};

export default function ProductsGridPage({ vm }: { vm: ProductsGridPageVM }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vm.categories;
    return vm.categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [query, vm.categories]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Top Row: Left text + Right search */}
        <div className={styles.topRow}>
          <div className={styles.left}>
            <div className={styles.breadcrumb}>
              {vm.breadcrumb.map((b, idx) => (
                <span key={`${b.label}-${idx}`}>
                  {b.href ? <Link href={b.href}>{b.label}</Link> : b.label}
                  {idx < vm.breadcrumb.length - 1 ? <span className={styles.sep}>»</span> : null}
                </span>
              ))}
            </div>

            <h1 className={styles.title}>{vm.title}</h1>
            <p className={styles.desc}>{vm.description}</p>
          </div>

          <div className={styles.right}>
            <div className={styles.searchWrap}>
              <input
                className={styles.searchInput}
                placeholder="Search Products/Categories"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className={styles.searchIcon} aria-hidden="true">🔍</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid} role="list">
          {filtered.map((c) => (
            <div key={c.slug} className={styles.card} role="listitem">
              {/* Card click area */}
              <Link href={`/products/${c.slug}`} className={styles.cardLink}>
                <div className={styles.imageBox}>
                  {/* keep img to match your current style */}
                  <img src={c.image} alt={c.name} className={styles.image} />
                </div>
                <div className={styles.cardTitle}>{c.name}</div>
              </Link>

              {/* View All mandatory */}
              <div className={styles.cardFooter}>
                <Link href={`/products/${c.slug}`} className={styles.viewAllBtn}>
                  View All
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>No categories found.</div>
        ) : null}
      </div>
    </section>
  );
}