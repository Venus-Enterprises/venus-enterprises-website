import React from "react";
import Link from "next/link";
import styles from "./AboutCompany.module.css";
import aboutCompanyData from "@/config/aboutCompany.json";

type BreadcrumbItem = { label: string; href: string };
type Row = { label: string; value: string };
type FactsheetSection = { id: string; title: string; rows: Row[] };
type AfterSection = {
  id: string;
  title: string;
  description: string;
  bulletsTitle?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaButtonText?: string;
  ctaLink?: string;
};

export default function AboutCompany() {
  const breadcrumbItems = (aboutCompanyData?.breadcrumb?.items || []) as BreadcrumbItem[];
  const factsheetSections = (aboutCompanyData?.factsheetSections || []) as FactsheetSection[];
  const sectionsAfterFactsheet = (aboutCompanyData?.sectionsAfterFactsheet || []) as AfterSection[];

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbWrap}>
        <div className={styles.breadcrumb}>
          {breadcrumbItems.map((item, idx) => (
            <React.Fragment key={`${item.href}-${idx}`}>
              {idx > 0 && <span> &gt; </span>}
              <Link href={item.href}>{item.label}</Link>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{aboutCompanyData.pageTitle}</h1>
          <p className={styles.desc}>{aboutCompanyData.introText}</p>
        </div>

        {/* Factsheet Main Title */}
        <div className={styles.sectionTitleWrap}>
          <h2 className={styles.sectionTitle}>{aboutCompanyData.factsheetTitle}</h2>
        </div>

        {/* Factsheet Sections */}
        {factsheetSections.map((sec) => (
          <div key={sec.id} className={styles.section}>
            <div className={styles.subTitle}>{sec.title}</div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <tbody>
                  {sec.rows.map((row, i) => (
                    <tr key={`${sec.id}-${i}`}>
                      <td className={styles.tdLabel}>{row.label}</td>
                      <td className={styles.tdValue}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* 4 Sections below Factsheet */}
        {sectionsAfterFactsheet.map((sec) => (
          <section key={sec.id} className={styles.longSection}>
            <div className={styles.longTitleRow}>
              <h3 className={styles.longSectionTitle}>{sec.title}</h3>
            </div>

            <p className={styles.longSectionDesc}>{sec.description}</p>

            {sec.bulletsTitle ? <p className={styles.bulletsTitle}>{sec.bulletsTitle}</p> : null}

            {sec.bullets?.length ? (
              <ul className={styles.bullets}>
                {sec.bullets.map((b, i) => (
                  <li key={`${sec.id}-b-${i}`}>{b}</li>
                ))}
              </ul>
            ) : null}

            <div className={styles.ctaRow}>
              <span className={styles.ctaLabel}>{sec.ctaLabel || "For more Information:"}</span>
              <Link href={sec.ctaLink || "/contact-us"} className={styles.ctaButton}>
                {sec.ctaButtonText || "Contact Us"}
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}