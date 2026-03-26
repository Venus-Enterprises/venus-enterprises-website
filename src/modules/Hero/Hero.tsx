import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import { getHeroVM } from "@/shared/adapters/heroAdapter";
import CategorySearch from "@/modules/CategorySearch";

export default function Hero() {
  const vm = useMemo(() => getHeroVM(), []);

  const items = vm.sliderItems || [];
  const SLIDE_H = 350;

  const [trackIdx, setTrackIdx] = useState(0);
  const [noAnim, setNoAnim] = useState(false);

  const loopItems = useMemo(() => {
    if (!items.length) return [];
    return [...items, items[0]];
  }, [items]);

  const active = items.length ? items[trackIdx % items.length] : null;

  useEffect(() => {
    if (items.length <= 1) return;

    const intervalMs = 6000;
    const id = window.setInterval(() => {
      setNoAnim(false);
      setTrackIdx((prev) => prev + 1);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [items.length]);

  useEffect(() => {
    setNoAnim(true);
    setTrackIdx(0);
    const t = window.setTimeout(() => setNoAnim(false), 0);
    return () => window.clearTimeout(t);
  }, [items.length]);

  const handleTrackEnd = () => {
    if (items.length > 0 && trackIdx === items.length) {
      setNoAnim(true);
      setTrackIdx(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoAnim(false));
      });
    }
  };

  return (
    <section className={styles.wrapper}>
      <div
        className={styles.container}
        style={{ gridTemplateColumns: `${vm.leftPercent}% ${vm.rightPercent}%` }}
      >
        <div
          className={styles.leftPanel}
          style={
            {
              "--hero-left-bg": `url("${vm.leftBackgroundImage}")`
            } as React.CSSProperties
          }
        >
          <nav className={styles.navLinks} aria-label="Hero Navigation">
            {vm.links.map((l) => (
              <Link key={l.href} href={l.href} className={styles.navLink}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className={styles.companyBox}>
            <div className={styles.companyTitle}>{vm.companyTitle}</div>

            {vm.companyItems && vm.companyItems.length ? (
              <div className={styles.companyGrid}>
                {vm.companyItems.map((it, i) => (
                  <div className={styles.companyItem} key={i}>
                    <div className={styles.companyIcon} aria-hidden="true">
                      ⓘ
                    </div>
                    <div className={styles.companyText}>
                      <div className={styles.companyItemLabel}>{it.label}</div>
                      <div className={styles.companyItemValue}>{it.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {vm.companyAddress ? (
              <div className={styles.addressRow}>
                <div className={styles.companyIcon} aria-hidden="true">
                  📍
                </div>
                <div className={styles.addressText}>
                  <div className={styles.addressLabel}>Address</div>
                  <div className={styles.addressValue}>{vm.companyAddress}</div>

                  {vm.companyMapUrl ? (
                    <a
                      className={styles.mapLink}
                      href={vm.companyMapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📍 Get Directions
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}

            {vm.companySummary ? (
              <div className={styles.companySummary}>
                {vm.companySummary}{" "}
                <Link href="/about-us" className={styles.readMore}>
                  Read More
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div
          className={styles.rightPanel}
          style={
            {
              "--hero-right-bg": `url("${vm.rightBackgroundImage}")`
            } as React.CSSProperties
          }
        >
          <div className={styles.searchRow}>
            <CategorySearch
              placeholder="Search products/services"
              variant="hero"
            />
          </div>

          <div className={styles.bigSlider}>
            <div className={styles.bigSliderInner}>
              <div className={styles.sliderViewport}>
                <div
                  className={`${styles.sliderTrack} ${
                    noAnim ? styles.noTransition : ""
                  }`}
                  style={{ transform: `translateY(-${trackIdx * SLIDE_H}px)` }}
                  onTransitionEnd={handleTrackEnd}
                >
                  {loopItems.map((item, index) => (
                    <div className={styles.slide} key={index}>
                      <img
                        className={styles.bigImage}
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.dots} aria-label="Slider dots">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.dot} ${
                      i === (items.length ? trackIdx % items.length : 0)
                        ? styles.dotActive
                        : ""
                    }`}
                    onClick={() => {
                      setNoAnim(false);
                      setTrackIdx(i);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {active ? (
              <div className={styles.bigMetaRow}>
                <div className={styles.bigMetaLeft}>
                  <div className={styles.bigTitle}>
                    {active.title}{" "}
                    {active.subtitle ? (
                      <span className={styles.bigSubtitle}>
                        {active.subtitle}
                      </span>
                    ) : null}
                  </div>
                </div>

                <Link href="/contact-us" className={styles.bigCta}>
                  Get Best Quote
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}