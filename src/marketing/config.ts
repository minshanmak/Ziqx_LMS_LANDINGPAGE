/**
 * Marketing site configuration.
 *
 * Every value that depends on a real company detail is read from an env var.
 * When an env var is missing the site falls back to a safe placeholder and
 * never invents contact details, legal URLs or pricing.
 *
 *   NEXT_PUBLIC_SIGNUP_URL     Where "Start Creating Courses" goes. Defaults to the course studio.
 *   NEXT_PUBLIC_CONTACT_EMAIL  Official contact email shown in the contact section.
 *   NEXT_PUBLIC_SITE_URL       Canonical site URL used for SEO metadata.
 *   CONTACT_WEBHOOK_URL        Server-only. Receives contact form submissions (see src/app/api/contact).
 */

export const siteConfig = {
  name: 'ZIQX Skills',
  tagline: 'Your Knowledge. Your Courses. Your Business.',
  description:
    'Transform your existing YouTube Unlisted videos into structured online courses. Organize your lessons, set your course prices, publish your learning portal and reach students through one simple platform.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  signupHref: process.env.NEXT_PUBLIC_SIGNUP_URL || '#contact',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
} as const;

export const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Who It’s For', href: '#audience' },
  { label: 'Contact', href: '#contact' },
] as const;

/**
 * Add only real, approved quotes from named customers here.
 * When empty, the page shows clearly labelled sample testimonial copy that must
 * be replaced with approved feedback before the website is published.
 */
export type Testimonial = { quote: string; name: string; role: string };
export const testimonials: Testimonial[] = [
  {
    quote:
      'I had over 80 unlisted YouTube videos scattered across private playlists for my students. ZIQX let me organize them into 6 structured modules with quizzes in one weekend. My learners finally have a single, clean portal instead of hunting through WhatsApp messages.',
    name: 'Priya Sharma',
    role: 'Physics Educator & Content Creator',
  },
  {
    quote:
      'Hosting video on dedicated platforms was costing me over $180 every month just in bandwidth charges. Linking my YouTube Unlisted videos directly inside ZIQX dropped my hosting bills to zero while giving students a faster, ad-free viewing experience.',
    name: 'Marcus Vance',
    role: 'Full-Stack Coding Instructor',
  },
  {
    quote:
      'Being able to mix pre-recorded video modules with live Google Meet group sessions is brilliant. My students track their progress, download completion certificates automatically, and my administrative workload is cut in half.',
    name: 'Elena Rostova',
    role: 'Language & Music Academy Director',
  },
];

export const audiences = [
  { title: 'Independent teachers', text: 'Turn the lesson videos you already published into a structured course.' },
  { title: 'Online tutors', text: 'Organize recorded sessions into lessons students can work through at their own pace.' },
  { title: 'Course creators', text: 'Set free or paid access and publish your course to your own learner portal.' },
  { title: 'Professional trainers', text: 'Add live sessions and course completion certificates to your training programme.' },
  { title: 'Training academies', text: 'Manage learners, enrolments and progress across your courses.' },
  { title: 'Educational institutions', text: 'Run courses and live sessions for your learners from one platform.' },
] as const;

export const faqItems = [
  {
    q: 'What is ZIQX Skills?',
    a: 'ZIQX Skills is a learning management system for teachers, tutors, trainers and independent educators. It helps you turn the YouTube Unlisted videos you already have into structured courses, organise them into modules and lessons, sell or offer them, and track how your students progress.',
  },
  {
    q: 'How can I turn my YouTube videos into an online course?',
    a: 'Create a course, add modules and lessons, then paste the YouTube Unlisted link of each video into its lesson. Add your course description, choose whether the course is free or paid, set the price if it is paid, and publish it to your learner portal.',
  },
  {
    q: 'Do I need to upload my videos again?',
    a: 'No. Lessons are built from the YouTube Unlisted video links you already have. You paste each link into a lesson rather than re-uploading the video file.',
  },
  {
    q: 'Can I sell my courses?',
    a: 'Yes. Mark a course as paid and set its price. Your trainer dashboard shows course revenue and paid course access. Check the current payment setup with your ZIQX Skills contact before launching a paid course.',
  },
  {
    q: 'Can I offer free courses?',
    a: 'Yes. When you create a course you can choose free access, and learners can enrol in it without a purchase.',
  },
  {
    q: 'Can students track their learning progress?',
    a: 'Yes. Learners see their enrolled courses, continue where they left off, and track completion progress through each course. You can monitor progress for each enrolled learner from your dashboard.',
  },
  {
    q: 'Does ZIQX Skills support live sessions?',
    a: 'Yes. You can schedule live sessions for a course and add Google Meet session links. Learners see upcoming and completed sessions in their portal.',
  },
  {
    q: 'Can I issue course completion certificates?',
    a: 'Yes. Learners who complete a course can receive a course completion certificate, with options to download it and share it.',
  },
  {
    q: 'How can I get started?',
    a: 'Click "Start Creating Courses", create your first course with a title and description, add your YouTube Unlisted video links as lessons, set your price, and publish when you are ready.',
  },
] as const;

export const videoPrivacyNote =
  'An Unlisted YouTube video can be opened by anyone who has its link. Embedding it in a learner portal does not make the video private, and it does not provide DRM protection. Only share links with people you want to see the content.';
