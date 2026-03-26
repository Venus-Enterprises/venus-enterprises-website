import React, { useMemo, useState } from "react";
import styles from "./ContactUsPage.module.css";
import { getContactUsConfig } from "@/shared/adapters/contactUsAdapter";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const isValidPhone = (phone: string) =>
  /^[0-9+\-\s]{7,20}$/.test(phone.trim());

export default function ContactUsPage() {
  const cfg = useMemo(() => getContactUsConfig(), []);

  const [values, setValues] = useState<FormValues>({
    fullName: "",
    phone: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onChange =
    (key: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
      setStatusMessage("");
    };

  const validate = (): boolean => {
    const f = cfg.form.fields;
    const next: Errors = {};

    if (!values.fullName.trim()) next.fullName = f.fullName.requiredMessage;
    if (!values.phone.trim()) next.phone = f.phone.requiredMessage;
    else if (!isValidPhone(values.phone)) next.phone = f.phone.invalidMessage || "Invalid phone";

    if (!values.email.trim()) next.email = f.email.requiredMessage;
    else if (!isValidEmail(values.email)) next.email = f.email.invalidMessage || "Invalid email";

    if (!values.message.trim()) next.message = f.message.requiredMessage;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatusMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(cfg.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          formType: cfg.formType,
          values: {
            fullName: values.fullName.trim(),
            phone: values.phone.trim(),
            email: values.email.trim(),
            message: values.message.trim()
          },
          emailContent: cfg.emailContent
        })
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || cfg.errorMessage);
      }

      setValues({ fullName: "", phone: "", email: "", message: "" });
      setIsSuccess(true);
      setStatusMessage(cfg.successMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : cfg.errorMessage;
      setIsSuccess(false);
      setStatusMessage(message || cfg.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div style={{ fontSize: 12, marginBottom: 8 }}>
          {cfg.breadcrumb.items?.map((it, idx) => (
            <span key={it.href}>
              <a href={it.href} style={{ color: "#111", textDecoration: "none" }}>
                {it.label}
              </a>
              {idx < cfg.breadcrumb.items.length - 1 ? "  ›  " : ""}
            </span>
          ))}
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>{cfg.pageTitle}</h1>
          <p className={styles.desc}>{cfg.pageDescription}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>{cfg.contactDetails.heading}</div>

              <div className={styles.detailsRow}>
                <div className={styles.label}>{cfg.contactDetails.phoneLabel}</div>
                <div className={styles.value}>
                  <a className={styles.link} href={`tel:${cfg.contactDetails.phone}`}>
                    {cfg.contactDetails.phone}
                  </a>
                </div>
              </div>

              <div className={styles.detailsRow}>
                <div className={styles.label}>{cfg.contactDetails.emailLabel}</div>
                <div className={styles.value}>
                  <a className={styles.link} href={`mailto:${cfg.contactDetails.email}`}>
                    {cfg.contactDetails.email}
                  </a>
                </div>
              </div>

              <div className={styles.detailsRow}>
                <div className={styles.label}>{cfg.contactDetails.addressLabel}</div>
                <div className={styles.value}>
                  <div style={{ fontWeight: 700 }}>{cfg.contactDetails.companyName}</div>
                  {cfg.contactDetails.addressLines?.map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <a
                  className={styles.link}
                  href={cfg.contactDetails.directionUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cfg.contactDetails.directionText}
                </a>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>{cfg.form.heading}</div>

              <form onSubmit={onSubmit} noValidate>
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>{cfg.form.fields.fullName.label}</label>
                  <input
                    className={styles.input}
                    value={values.fullName}
                    onChange={onChange("fullName")}
                    placeholder={cfg.form.fields.fullName.placeholder}
                  />
                  {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>{cfg.form.fields.phone.label}</label>
                  <input
                    className={styles.input}
                    value={values.phone}
                    onChange={onChange("phone")}
                    placeholder={cfg.form.fields.phone.placeholder}
                  />
                  {errors.phone && <div className={styles.error}>{errors.phone}</div>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>{cfg.form.fields.email.label}</label>
                  <input
                    className={styles.input}
                    value={values.email}
                    onChange={onChange("email")}
                    placeholder={cfg.form.fields.email.placeholder}
                  />
                  {errors.email && <div className={styles.error}>{errors.email}</div>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>{cfg.form.fields.message.label}</label>
                  <textarea
                    className={styles.textarea}
                    value={values.message}
                    onChange={onChange("message")}
                    placeholder={cfg.form.fields.message.placeholder}
                  />
                  {errors.message && <div className={styles.error}>{errors.message}</div>}
                </div>

                <button className={styles.submit} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? cfg.submittingText : cfg.form.submitText}
                </button>

                {statusMessage ? (
                  <div className={isSuccess ? styles.success : styles.error}>{statusMessage}</div>
                ) : null}
              </form>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>{cfg.map.heading}</div>

            <div className={styles.mapWrap}>
              {cfg.map.embedUrl ? (
                <iframe
                  src={cfg.map.embedUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              ) : (
                <div style={{ padding: 16, fontSize: 12, color: "#666" }}>
                  Map embed URL not configured.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
