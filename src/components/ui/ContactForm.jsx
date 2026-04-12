import { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import styles from './ContactForm.module.css';

const FORM_STATES = { idle: 'idle', submitting: 'submitting', success: 'success', error: 'error' };

export default function ContactForm() {
  const { t } = useTranslation();
  const [state, setState] = useState(FORM_STATES.idle);

  async function handleSubmit(e) {
    e.preventDefault();
    setState(FORM_STATES.submitting);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setState(FORM_STATES.success);
        e.target.reset();
        setTimeout(() => setState(FORM_STATES.idle), 4000);
      } else {
        setState(FORM_STATES.error);
      }
    } catch {
      setState(FORM_STATES.error);
    }
  }

  const submitLabel =
    state === FORM_STATES.submitting
      ? '...'
      : state === FORM_STATES.success
        ? '✓ ' + (t('form-enviado') || 'Enviado')
        : t('form-enviar');

  return (
    <form
      name="contacto"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contacto" />
      <p className="sr-only">
        <label>
          No llenar si eres humano: <input name="bot-field" tabIndex={-1} />
        </label>
      </p>

      <div className={styles.field}>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          className={styles.input}
          placeholder=" "
        />
        <label htmlFor="nombre" className={styles.label}>
          {t('form-nombre-label')}
        </label>
      </div>

      <div className={styles.field}>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
          placeholder=" "
        />
        <label htmlFor="email" className={styles.label}>
          {t('form-email-label')}
        </label>
      </div>

      <div className={styles.field}>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          required
          className={`${styles.input} ${styles.textarea}`}
          placeholder=" "
        />
        <label htmlFor="mensaje" className={styles.label}>
          {t('form-mensaje-label')}
        </label>
      </div>

      <button
        type="submit"
        className={styles.submit}
        disabled={state === FORM_STATES.submitting}
      >
        {submitLabel}
      </button>

      {state === FORM_STATES.error && (
        <p className={styles.errorMsg}>Error al enviar. Intenta de nuevo.</p>
      )}
    </form>
  );
}
