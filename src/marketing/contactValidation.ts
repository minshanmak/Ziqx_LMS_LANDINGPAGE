export const ENQUIRY_TYPES = [
  'Product demo',
  'General enquiry',
  'Institution partnership',
  'Technical support',
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export type ContactPayload = {
  name: string;
  email: string;
  organization: string;
  enquiryType: EnquiryType;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the client form and the API route. Returns an object of field errors. */
export function validateContact(input: {
  name?: string;
  email?: string;
  organization?: string;
  enquiryType?: string;
  message?: string;
}): ContactErrors {
  const errors: ContactErrors = {};
  const name = (input.name ?? '').trim();
  const email = (input.email ?? '').trim();
  const organization = (input.organization ?? '').trim();
  const message = (input.message ?? '').trim();

  if (name.length < 2) errors.name = 'Please enter your full name.';
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.';

  if (!email) errors.email = 'Please enter your work email.';
  else if (!EMAIL_RE.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.';

  if (organization.length > 150) errors.organization = 'Organization must be 150 characters or fewer.';

  if (!(ENQUIRY_TYPES as readonly string[]).includes(input.enquiryType ?? '')) errors.enquiryType = 'Please choose an enquiry type.';

  if (message.length < 10) errors.message = 'Please write at least 10 characters so we can help.';
  else if (message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.';

  return errors;
}
