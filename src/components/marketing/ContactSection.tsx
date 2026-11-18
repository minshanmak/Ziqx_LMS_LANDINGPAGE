'use client';

import { useId, useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Mail, MessageSquare, CalendarCheck, Send } from 'lucide-react';
import { siteConfig } from '@/marketing/config';
import { ENQUIRY_TYPES, validateContact, type ContactErrors, type EnquiryType } from '@/marketing/contactValidation';
import styles from './marketing.module.css';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }
  | { kind: 'unconfigured' };

const emptyForm = { name: '', email: '', organization: '', enquiryType: '' as '' | EnquiryType, message: '', website: '' };

export function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const uid = useId();

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof ContactErrors]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === 'submitting') return;

    const fieldErrors = validateContact(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus({ kind: 'idle' });
      document.getElementById(`${uid}-name`)?.focus();
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setForm(emptyForm);
        setStatus({ kind: 'success' });
      } else if (res.status === 503 || data.code === 'not_configured') {
        setStatus({ kind: 'unconfigured' });
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: 'idle' });
      } else {
        setStatus({ kind: 'error', message: data.message ?? 'We could not send your message. Please try again.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Check your connection and try again.' });
    }
  }

  const submitting = status.kind === 'submitting';

  return (
    <section id="contact" className={`${styles.section} ${styles.sectionLavender}`} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.contactGrid}>
          <div data-reveal>
            <p className={styles.eyebrow}>Contact</p>
            <h2 id="contact-title" className={styles.h2}>Let&apos;s Build Better Learning Experiences Together.</h2>
            <p className={styles.lead}>
              Have questions about ZIQX Skills? Want to explore the platform for your teaching business or institution? Get in touch with our team.
            </p>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon} aria-hidden="true"><MessageSquare size={18} strokeWidth={1.75} /></span>
                <div>
                  <p className={styles.contactLabel}>General enquiries</p>
                  <p className={styles.contactValue}>Questions about the platform, features or getting started.</p>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon} aria-hidden="true"><CalendarCheck size={18} strokeWidth={1.75} /></span>
                <div>
                  <p className={styles.contactLabel}>Request a demo</p>
                  <p className={styles.contactValue}>Walk through the teacher dashboard and course builder with our team.</p>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon} aria-hidden="true"><Mail size={18} strokeWidth={1.75} /></span>
                <div>
                  <p className={styles.contactLabel}>Email</p>
                  <p className={styles.contactValue}>
                    {siteConfig.contactEmail ? (
                      <a href={`mailto:${siteConfig.contactEmail}`} style={{ color: 'var(--text-link)' }}>{siteConfig.contactEmail}</a>
                    ) : (
                      'Official email address to be configured.'
                    )}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.formCard} data-reveal="mockup">
            {status.kind === 'success' ? (
              <div role="status" className={`${styles.statusBox} ${styles.statusSuccess}`} style={{ display: 'flex', gap: 12 }}>
                <CheckCircle2 size={20} strokeWidth={1.75} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span>Thanks, your message has been sent. Our team will reply to the email you provided.</span>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={submitting} suppressHydrationWarning>
                {status.kind === 'error' && (
                  <div role="alert" className={`${styles.statusBox} ${styles.statusError}`} style={{ display: 'flex', gap: 12 }}>
                    <AlertCircle size={20} strokeWidth={1.75} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <span>{status.message}</span>
                  </div>
                )}
                {status.kind === 'unconfigured' && (
                  <div role="alert" className={`${styles.statusBox} ${styles.statusInfo}`}>
                    The contact form is not connected to a delivery service yet, so your message could not be sent. Please try again later or use the official email address once it is published.
                  </div>
                )}

                <div className={styles.formRow}>
                  <Field id={`${uid}-name`} label="Full name" error={errors.name}>
                    <input
                      id={`${uid}-name`}
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                      required
                      suppressHydrationWarning
                    />
                  </Field>
                  <Field id={`${uid}-email`} label="Work email" error={errors.email}>
                    <input
                      id={`${uid}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                      required
                      suppressHydrationWarning
                    />
                  </Field>
                </div>

                <div className={styles.formRow}>
                  <Field id={`${uid}-org`} label={<>Institution / Organization <span className={styles.optional}>(optional)</span></>} error={errors.organization}>
                    <input
                      id={`${uid}-org`}
                      name="organization"
                      autoComplete="organization"
                      value={form.organization}
                      onChange={(e) => update('organization', e.target.value)}
                      aria-invalid={!!errors.organization}
                      suppressHydrationWarning
                    />
                  </Field>
                  <Field id={`${uid}-type`} label="Enquiry type" error={errors.enquiryType}>
                    <select
                      id={`${uid}-type`}
                      name="enquiryType"
                      value={form.enquiryType}
                      onChange={(e) => update('enquiryType', e.target.value as EnquiryType)}
                      aria-invalid={!!errors.enquiryType}
                      required
                      suppressHydrationWarning
                    >
                      <option value="" disabled>Select an enquiry type</option>
                      {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>

                <Field id={`${uid}-message`} label="Message" error={errors.message}>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    aria-invalid={!!errors.message}
                    maxLength={2000}
                    required
                    suppressHydrationWarning
                  />
                  <span className={styles.fieldHint}>{form.message.length}/2000</span>
                </Field>

                {/* Honeypot: hidden from people and screen readers. */}
                <div className={styles.honeypot} aria-hidden="true">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} suppressHydrationWarning />
                  </label>
                </div>

                <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} disabled={submitting} suppressHydrationWarning>
                  <Send size={16} strokeWidth={1.75} aria-hidden="true" />
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldInvalid : ''}`}>
      <label htmlFor={id} className={styles.fieldLabel}>{label}</label>
      {children}
      {error && <span id={`${id}-err`} className={styles.fieldError}>{error}</span>}
    </div>
  );
}
