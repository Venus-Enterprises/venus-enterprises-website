import { useMemo, useState } from "react";
import styles from "./EnquiryBlock.module.css";
import { getEnquiryVM } from "@/shared/adapters/enquiryAdapter";

type Errors = Partial<Record<"name" | "message", string>>;

export default function EnquiryBlock() {
  const vm = useMemo(() => getEnquiryVM(), []);

  const [values, setValues] = useState({
    name: "",
    message: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!vm || vm.enabled === false) {
    return null;
  }

  function handleChange(key: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setStatusMessage("");
  }

  function validate() {
    const nextErrors: Errors = {};

    if (!values.name.trim()) {
      nextErrors.name = vm.fields.name.requiredMessage;
    }

    if (!values.message.trim()) {
      nextErrors.message = vm.fields.message.requiredMessage;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(vm.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          formType: vm.formType,
          values: {
            name: values.name.trim(),
            message: values.message.trim()
          },
          emailContent: vm.emailContent
        })
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || vm.errorMessage);
      }

      setValues({ name: "", message: "" });
      setIsSuccess(true);
      setStatusMessage(vm.successMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : vm.errorMessage;
      setIsSuccess(false);
      setStatusMessage(message || vm.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className={styles.section}
      style={{ backgroundColor: vm.backgroundColor }}
      aria-label="Enquiry"
    >
      <div className={styles.container}>
        <div
          className={styles.card}
          style={{ backgroundColor: vm.cardBackgroundColor }}
        >
          <h3 className={styles.heading}>{vm.heading}</h3>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>{vm.fields.name.label}</label>
              <input
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                placeholder={vm.fields.name.placeholder}
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name ? <div className={styles.errorText}>{errors.name}</div> : null}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>{vm.fields.message.label}</label>
              <textarea
                className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                placeholder={vm.fields.message.placeholder}
                value={values.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={4}
              />
              {errors.message ? (
                <div className={styles.errorText}>{errors.message}</div>
              ) : null}
            </div>

            <button className={styles.button} type="submit" disabled={isSubmitting}>
              {isSubmitting ? vm.submittingText : vm.submitButton.text}
            </button>

            {statusMessage ? (
              <div className={isSuccess ? styles.successText : styles.errorTextCenter}>
                {statusMessage}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
