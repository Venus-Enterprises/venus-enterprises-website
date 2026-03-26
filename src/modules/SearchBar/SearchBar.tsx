import React from "react";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  variant?: "hero" | "products";
};

export default function SearchBar({
  value,
  placeholder = "Search...",
  onChange,
  showButton = false,
  buttonLabel = "Search",
  onButtonClick,
  variant = "products",
}: SearchBarProps) {
  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />

      {showButton ? (
        <button
          type="button"
          className={styles.button}
          onClick={onButtonClick}
          aria-label={buttonLabel}
        >
          {buttonLabel}
        </button>
      ) : null}
    </div>
  );
}