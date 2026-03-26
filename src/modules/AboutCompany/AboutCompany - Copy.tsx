import React from "react";
import styles from "./AboutCompany.module.css";
import aboutCompany from "@/config/aboutCompany.json";

type Row = { label: string; value: string };

function FactsTable({ rows }: { rows: Row[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={`${r.label}-${idx}`}>
              <td className={styles.tdLabel}>{r.label}</td>
              <td className={styles.tdValue}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AboutCompany() {
  return (
    <div className={styles.page}>
      {/* Breadcrumb strip */}
      <div className={styles.breadcrumbWrap}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <a href="/">Home</a> &nbsp;&gt;&nbsp; About Us
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Intro */}
        <div className={styles.header}>
          <h1 className={styles.title}>{aboutCompany.intro?.title || "About Us"}</h1>
          <p className={styles.desc}>{aboutCompany.intro?.description || ""}</p>
        </div>

        {/* Company Factsheet */}
        <section className={styles.section}>
          <div className={styles.sectionTitleWrap}>
            <h2 className={styles.sectionTitle}>
              {aboutCompany.factsheet?.sectionTitle || "Company Factsheet"}
            </h2>
          </div>

          <div className={styles.subTitle}>
            {aboutCompany.factsheet?.subTitle || "Basic Information"}
          </div>

          <FactsTable rows={(aboutCompany.factsheet?.rows || []) as Row[]} />
        </section>

        {/* Infrastructure */}
        <section className={styles.section}>
          <div className={styles.sectionTitleWrap}>
            <h2 className={styles.sectionTitle}>
              {aboutCompany.infrastructure?.sectionTitle || "Infrastructure"}
            </h2>
          </div>

          <FactsTable rows={(aboutCompany.infrastructure?.rows || []) as Row[]} />
        </section>

        {/* Statutory Profile */}
        <section className={styles.section}>
          <div className={styles.sectionTitleWrap}>
            <h2 className={styles.sectionTitle}>
              {aboutCompany.statutoryProfile?.sectionTitle || "Statutory Profile"}
            </h2>
          </div>

          <FactsTable rows={(aboutCompany.statutoryProfile?.rows || []) as Row[]} />
        </section>
      </div>
    </div>
  );
}