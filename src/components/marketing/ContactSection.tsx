'use client';

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, MessageSquare, MonitorPlay } from 'lucide-react';
import { siteConfig } from '@/marketing/config';
import { ENQUIRY_TYPES, validateContact, type ContactErrors, type EnquiryType } from '@/marketing/contactValidation';
import styles from './contact.module.css';

type Status =
  | { kind: 'idle' | 'submitting' | 'success' | 'unconfigured' }
  | { kind: 'error'; message: string };

const emptyForm = { name: '', email: '', organization: '', enquiryType: '' as '' | EnquiryType, message: '', website: '' };

export function ContactSection() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const submitting = status.kind === 'submitting';

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key as keyof ContactErrors]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function selectEnquiry(type: EnquiryType) {
    setStatus({ kind: 'idle' });
    update('enquiryType', type);
    window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus());
  }

  function showErrors(nextErrors: ContactErrors) {
    setErrors(nextErrors);
    setStatus({ kind: 'idle' });
    window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  }

  function fieldProps(key: keyof ContactErrors) {
    return {
      id: `${uid}-${key}`,
      name: key,
      'aria-invalid': Boolean(errors[key]),
      'aria-describedby': errors[key] ? `${uid}-${key}-error` : undefined,
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const fieldErrors = validateContact(form);
    if (Object.keys(fieldErrors).length) {
      showErrors(fieldErrors);
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
        showErrors(data.errors);
      } else {
        setStatus({ kind: 'error', message: data.message ?? 'Your message could not be sent. Please try again.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'Check your connection and try sending your message again.' });
    }
  }

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Contact</p>
          <h2 id="contact-title">Let’s talk about your course.</h2>
          <p className={styles.lead}>Tell us what you teach. We can walk you through the course builder or help you plan your learner portal.</p>
          <div className={styles.options}>
            <button type="button" disabled={submitting} onClick={() => selectEnquiry('Product demo')}>
              <span className={styles.optionIcon}><MonitorPlay size={20} aria-hidden="true" /></span>
              Request a product demo <ArrowUpRight size={16} className={styles.optionArrow} aria-hidden="true" />
            </button>
            <button type="button" disabled={submitting} onClick={() => selectEnquiry('General enquiry')}>
              <span className={styles.optionIcon}><MessageSquare size={20} aria-hidden="true" /></span>
              Ask a question <ArrowUpRight size={16} className={styles.optionArrow} aria-hidden="true" />
            </button>
          </div>
          {siteConfig.contactEmail && (
            <a className={styles.email} href={`mailto:${siteConfig.contactEmail}`}>
              <Mail size={16} aria-hidden="true" />{siteConfig.contactEmail}
            </a>
          )}
        </div>

        <div className={styles.card}>
          {status.kind === 'success' ? (
            <div className={styles.success} role="status">
              <CheckCircle2 size={30} aria-hidden="true" />
              <h3>Message sent</h3>
              <p>Thank you for reaching out. Our team will reply to the email address you provided.</p>
            </div>
          ) : (
            <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-busy={submitting}>
              <h3>Send an enquiry</h3>
              <div className={styles.fields}>
                <Field id={`${uid}-name`} label="Full name" error={errors.name}>
                  <input {...fieldProps('name')} autoComplete="name" maxLength={100} value={form.name}
                    onChange={(event) => update('name', event.target.value)} required />
                </Field>
                <Field id={`${uid}-email`} label="Work email" error={errors.email}>
                  <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254} value={form.email}
                    onChange={(event) => update('email', event.target.value)} required />
                </Field>
                <Field id={`${uid}-organization`} label={<>Organization <span>(optional)</span></>} error={errors.organization}>
                  <input {...fieldProps('organization')} autoComplete="organization" maxLength={150} value={form.organization}
                    onChange={(event) => update('organization', event.target.value)} />
                </Field>
                <Field id={`${uid}-enquiryType`} label="Enquiry type" error={errors.enquiryType}>
                  <select {...fieldProps('enquiryType')} value={form.enquiryType}
                    onChange={(event) => update('enquiryType', event.target.value as EnquiryType)} required>
                    <option value="" disabled>Select a topic</option>
                    {ENQUIRY_TYPES.map((type) => <option key={type}>{type}</option>)}
                  </select>
                </Field>
              </div>
              <Field id={`${uid}-message`} label="Message" error={errors.message}>
                <textarea {...fieldProps('message')} rows={3} maxLength={2000} value={form.message}
                  onChange={(event) => update('message', event.target.value)} required />
                <span className={styles.limit}>{form.message.length} / 2000</span>
              </Field>
              <div className={styles.honeypot} aria-hidden="true">
                <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website}
                  onChange={(event) => update('website', event.target.value)} /></label>
              </div>
              {status.kind === 'error' && <p className={styles.feedback} role="alert">{status.message}</p>}
              {status.kind === 'unconfigured' && (
                <p className={styles.feedback} role="alert">
                  This form is temporarily unavailable.{' '}
                  {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`}>Email our team instead.</a> : 'Please try again later.'}
                </p>
              )}
              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? 'Sending…' : 'Send message'} <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: ReactNode; error?: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className={styles.error} id={`${id}-error`}>{error}</span>}
    </div>
  );
}
