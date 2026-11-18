import Link from 'next/link';
import {
  ArrowRight, Video, Layers, Wallet, Users, PlayCircle, Award, Radio, Link2, Clock, MonitorPlay, CheckCircle2, Quote,
} from 'lucide-react';
import { siteConfig, testimonials, audiences, faqItems, videoPrivacyNote } from '@/marketing/config';
import { TeacherDashboardMock, CourseBuilderMock, StudentPortalMock } from './mockups';
import styles from './marketing.module.css';

const ICON = { size: 20, strokeWidth: 1.75 } as const;

/* ---------- 02 Hero ---------- */
export function Hero() {
  return (
    <section id="platform" className={`${styles.section} ${styles.hero} ${styles.heroBackdrop}`} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div data-reveal>
            <p className={styles.eyebrow}>Built for teachers and course creators</p>
            <h1 id="hero-title" className={styles.h1}>
              Turn Your Existing Videos Into Online Courses.
            </h1>
            <p className={styles.lead}>
              Turn your existing YouTube Unlisted videos into structured courses. Organize lessons, offer free or paid access, and manage your learners from one platform.
            </p>
            <div className={styles.btnRow}>
              <a href={siteConfig.signupHref} className={`${styles.btn} ${styles.btnPrimary}`}>
                Start Creating Courses <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href="#how-it-works" className={`${styles.btn} ${styles.btnSecondary}`}>
                See How It Works
              </a>
            </div>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <p className={styles.heroNote}>
              Lessons link to your existing YouTube Unlisted videos. You do not need to upload them again.
            </p>
          </div>
          <div data-reveal="mockup">
            <TeacherDashboardMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 Problem and solution ---------- */
const problems = [
  { icon: Video, text: 'Video content is scattered across YouTube.' },
  { icon: Users, text: 'Managing students manually becomes difficult.' },
  { icon: Wallet, text: 'Selling recorded courses requires a website and multiple tools.' },
  { icon: Clock, text: 'Tracking student progress is complicated.' },
  { icon: Layers, text: 'Creating a professional learning experience takes time.' },
];

export function ProblemSolution() {
  return (
    <section id="for-teachers" className={styles.section} aria-labelledby="problem-title">
      <div className={styles.container}>
        <div className={styles.twoCol}>
          <div data-reveal>
            <p className={styles.eyebrow}>Product introduction</p>
            <h2 id="problem-title" className={styles.h2}>Your Teaching Deserves More Than a Video Playlist.</h2>
            <ul className={styles.problemList} style={{ marginTop: 32 }}>
              {problems.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <span className={styles.problemIcon} aria-hidden="true"><Icon size={18} strokeWidth={1.75} /></span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.solutionPanel} data-reveal="mockup">
            <p className={styles.eyebrow} style={{ color: '#3B40B8' }}>What ZIQX Skills does</p>
            <p style={{ margin: 0, fontSize: 18, lineHeight: '26px', fontWeight: 700, color: '#14151A' }}>
              One workflow from video link to published course.
            </p>
            <div className={styles.flow} style={{ marginTop: 20 }}>
              <FlowStep icon={<Link2 size={16} strokeWidth={1.75} />} text="Paste your YouTube Unlisted links into lessons" />
              <FlowStep icon={<Layers size={16} strokeWidth={1.75} />} text="Organize them into modules and lessons" />
              <FlowStep icon={<Wallet size={16} strokeWidth={1.75} />} text="Set a free or paid price" />
              <FlowStep icon={<Users size={16} strokeWidth={1.75} />} text="Track enrolments, progress and live sessions" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowStep({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className={styles.flowStep}>
      <span className={styles.flowStepIcon} aria-hidden="true">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

/* ---------- 04 How it works ---------- */
const steps = [
  { n: '01', title: 'Connect Your YouTube Videos', text: 'Add links to your existing YouTube Unlisted videos as lessons.' },
  { n: '02', title: 'Organize Your Course Structure', text: 'Group your lessons into modules and chapters in minutes.' },
  { n: '03', title: 'Set Pricing and Details', text: 'Choose free access or set a price, add a description and course thumbnail.' },
  { n: '04', title: 'Publish and Start Enrolling', text: 'Make your course available through your learner portal.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section} aria-labelledby="how-title">
      <div className={styles.container}>
        <div className={`${styles.sectionHead} ${styles.center}`} data-reveal>
          <p className={styles.eyebrow}>How it works</p>
          <h2 id="how-title" className={styles.h2}>From Existing Videos to Published Courses.</h2>
        </div>
        <ol className={styles.steps} data-reveal-group>
          {steps.map((s) => (
            <li key={s.n} className={styles.step}>
              <span className={styles.stepNumber}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 05 Feature showcase ---------- */
const features = [
  {
    icon: Layers, tone: 'lavender', title: 'Simple Course Builder',
    points: ['Create courses', 'Organize modules', 'Add individual lessons', 'Add YouTube video links'],
  },
  {
    icon: Wallet, tone: 'sky', title: 'Course Monetization',
    points: ['Create free courses', 'Create paid courses', 'Set course prices', 'Manage paid course access'],
  },
  {
    icon: Users, tone: 'lime', title: 'Student Management',
    points: ['View enrolled learners', 'Monitor course progress', 'Manage learner access'],
  },
  {
    icon: PlayCircle, tone: 'lavender', title: 'Learning Experience',
    points: ['Video lesson viewing', 'Course progress tracking', 'Quizzes', 'Course completion'],
  },
  {
    icon: Radio, tone: 'sky', title: 'Live Learning',
    points: ['Schedule live sessions', 'Google Meet session links', 'Upcoming and completed sessions'],
  },
  {
    icon: Award, tone: 'lime', title: 'Certificates',
    points: ['Course completion certificates', 'Download and sharing options'],
  },
] as const;

export function Features() {
  return (
    <section id="features" className={`${styles.section} ${styles.sectionMuted}`} aria-labelledby="features-title">
      <div className={styles.container}>
        <div className={styles.sectionHead} data-reveal>
          <p className={styles.eyebrow}>Features</p>
          <h2 id="features-title" className={styles.h2}>The Tools to Create and Manage Your Courses.</h2>
        </div>
        <div className={styles.featureGrid} data-reveal-group>
          {features.map(({ icon: Icon, tone, title, points }) => (
            <article key={title} className={styles.feature}>
              <span className={`${styles.featureIcon} ${styles[`tone${tone[0].toUpperCase()}${tone.slice(1)}` as 'toneLavender']}`} aria-hidden="true">
                <Icon size={ICON.size} strokeWidth={ICON.strokeWidth} />
              </span>
              <h3 className={styles.featureTitle}>{title}</h3>
              <ul className={styles.featureList}>
                {points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 Product showcase ---------- */
export function ProductShowcase() {
  return (
    <section id="product" className={`${styles.section} ${styles.sectionMuted}`} aria-labelledby="showcase-title">
      <div className={styles.container}>
        <div className={styles.sectionHead} data-reveal>
          <p className={styles.eyebrow}>Product</p>
          <h2 id="showcase-title" className={styles.h2}>Powerful for Teachers. Simple for Students.</h2>
        </div>

        <div className={styles.showcaseBlock}>
          <div className={styles.showcaseHead} data-reveal>
            <div>
              <h3 className={styles.h2} style={{ fontSize: 24, lineHeight: '32px' }}>Teacher dashboard</h3>
              <p className={styles.lead} style={{ marginTop: 8 }}>
                See published courses, learner numbers and revenue at a glance. Build courses from modules and lessons, and manage who is enrolled.
              </p>
            </div>
            <ul className={styles.highlights} aria-label="Teacher dashboard highlights">
              {['Course overview', 'Published courses', 'Total learners', 'Course revenue', 'Course performance', 'Course creation', 'Learner management'].map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div data-reveal="mockup">
            <TeacherDashboardMock />
          </div>
          <div style={{ height: 24 }} />
          <div data-reveal="mockup">
            <CourseBuilderMock />
          </div>
        </div>

        <div className={styles.showcaseBlock}>
          <div className={styles.showcaseHead} data-reveal>
            <div>
              <h3 className={styles.h2} style={{ fontSize: 24, lineHeight: '32px' }}>Student learning portal</h3>
              <p className={styles.lead} style={{ marginTop: 8 }}>
                Learners find their courses, pick up their last lesson, follow their progress, and join live sessions from one place.
              </p>
            </div>
            <ul className={styles.highlights} aria-label="Learner portal highlights">
              {['My courses', 'Continue learning', 'Completion progress', 'Explore courses', 'Live sessions', 'Certificates'].map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div data-reveal="mockup">
            <StudentPortalMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials / social proof ---------- */
const testimonialExamples = [
  {
    quote: 'I already have lessons recorded as YouTube Unlisted videos. ZIQX gives me a clear way to organize them into modules and present them as a structured course.',
    name: 'Teacher name to be added',
    role: 'Independent teacher · Sample profile',
  },
  {
    quote: 'Keeping course content, enrolments and learner progress together makes running an online course feel much more organized.',
    name: 'Teacher name to be added',
    role: 'Online tutor · Sample profile',
  },
  {
    quote: 'A dedicated learner portal gives my course a more professional home, with a clear place for students to find lessons and continue learning.',
    name: 'Teacher name to be added',
    role: 'Course creator · Sample profile',
  },
] as const;

export function Testimonials() {
  const hasApprovedTestimonials = testimonials.length > 0;
  const items = hasApprovedTestimonials ? testimonials : testimonialExamples;

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.container}>
        <div className={`${styles.sectionHead} ${styles.center}`} data-reveal>
          <p className={styles.eyebrow}>{hasApprovedTestimonials ? 'Teacher stories' : 'Teacher stories · preview'}</p>
          <h2 id="testimonials-title" className={styles.h2}>What Educators Say About ZIQX</h2>
          <p className={styles.lead}>
            A better way to bring your recorded lessons, courses and learners together.
          </p>
        </div>

        <div className={styles.testimonialGrid} data-reveal-group>
          {items.map((t, index) => (
            <figure key={`${t.name}-${index}`} className={styles.testimonialCard}>
              <div className={styles.testimonialTop}>
                <span className={styles.testimonialQuoteIcon} aria-hidden="true">
                  <Quote size={20} strokeWidth={1.75} />
                </span>
                {!hasApprovedTestimonials && <span className={styles.testimonialSample}>Sample copy</span>}
              </div>
              <blockquote className={styles.testimonialQuote}>
                “{t.quote}”
              </blockquote>
              <figcaption className={styles.testimonialPerson}>
                <span className={styles.testimonialAvatar} aria-hidden="true">
                  {hasApprovedTestimonials ? t.name.trim().charAt(0).toUpperCase() : 'T'}
                </span>
                <span className={styles.testimonialIdentity}>
                  <strong className={styles.testimonialName}>{t.name}</strong>
                  <span className={styles.testimonialRole}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {!hasApprovedTestimonials && (
          <p className={styles.testimonialNotice}>
            <strong>Content preview:</strong> These are illustrative examples, not real customer endorsements. Replace them with approved teacher feedback before publishing the website.
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- 07 Course monetization ---------- */
export function Monetization() {
  const flow = [
    { icon: Video, label: 'YouTube videos' },
    { icon: Layers, label: 'Organized lessons' },
    { icon: MonitorPlay, label: 'Published course' },
    { icon: Users, label: 'Student enrolments' },
  ];
  return (
    <section id="monetization" className={styles.section} aria-labelledby="monet-title">
      <div className={styles.container}>
        <div className={styles.monetGrid}>
          <div data-reveal>
            <p className={styles.eyebrow}>Course monetization</p>
            <h2 id="monet-title" className={styles.h2}>Offer Your Courses on Your Terms.</h2>
            <p className={styles.lead}>
              Turn recorded lessons into free or paid courses. Organize your videos into a course, choose free access or set a price,
              then publish it to your learner portal.
            </p>
            <div className={styles.flow} style={{ marginTop: 32 }}>
              {flow.map((f, i) => (
                <div key={f.label}>
                  <div className={styles.flowStep}>
                    <span className={styles.flowStepIcon} aria-hidden="true"><f.icon size={16} strokeWidth={1.75} /></span>
                    <span>{f.label}</span>
                  </div>
                  {i < flow.length - 1 && (
                    <div className={styles.flowArrow} aria-hidden="true" style={{ height: 20, alignItems: 'center' }}>↓</div>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.noteBox} role="note">
              <CheckCircle2 size={18} strokeWidth={1.75} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                ZIQX Skills does not promise specific earnings. Course results depend on your content, pricing and audience.
              </span>
            </div>
          </div>

            <div data-reveal="mockup">
              <article className={`${styles.card} ${styles.demoCard}`} aria-label="Demonstration course card">
                <div className={styles.demoCardArt} aria-hidden="true"><Layers size={40} strokeWidth={1.5} /></div>
                <div className={styles.demoCardBody}>
                  <h3 className={styles.demoCardTitle}>Data analysis</h3>
                  <p className={styles.demoCardMeta}>Daniel Mensah · 6 modules · 40 lessons</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <span className={styles.demoPrice}>$79.00</span>
                    <span className={`${styles.badge} ${styles.badgePublished}`}>Published</span>
                  </div>
              </div>
            </article>
            <p className={styles.demoCaption}>
              Demonstration course. The title, instructor and price are examples only and are not ZIQX Skills pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Who ZIQX Skills is for ---------- */
export function AudienceSection() {
  return (
    <section id="audience" className={`${styles.section} ${styles.sectionMuted}`} aria-labelledby="audience-title">
      <div className={styles.container}>
        <div className={styles.sectionHead} data-reveal>
          <p className={styles.eyebrow}>Who it’s for</p>
          <h2 id="audience-title" className={styles.h2}>A Home for Different Kinds of Educators.</h2>
        </div>
        <div className={styles.featureGrid} data-reveal-group>
          {audiences.slice(0, 4).map((item) => (
            <article key={item.title} className={styles.feature}>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.stepText}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Frequently asked questions ---------- */
export function FAQSection() {
  return (
    <section id="faq" className={`${styles.section} ${styles.sectionMuted}`} aria-labelledby="faq-title">
      <div className={styles.container}>
        <div className={`${styles.sectionHead} ${styles.center}`} data-reveal>
          <p className={styles.eyebrow}>FAQs</p>
          <h2 id="faq-title" className={styles.h2}>Questions About ZIQX Skills?</h2>
        </div>
        <div className={styles.faqList} data-reveal>
          {faqItems.map((item) => (
            <details className={styles.faqItem} key={item.q}>
              <summary className={styles.faqTrigger}>{item.q}</summary>
              <p className={styles.faqPanel}>{item.a}</p>
            </details>
          ))}
        </div>
        <p className={styles.faqNote} role="note" data-reveal>{videoPrivacyNote}</p>
      </div>
    </section>
  );
}

/* ---------- 10 Final CTA ---------- */
export function FinalCta() {
  return (
    <section className={`${styles.section} ${styles.sectionLavender} ${styles.finalCta}`} aria-labelledby="final-title">
      <div className={styles.container}>
        <h2 id="final-title" className={styles.h2}>Your Teaching Journey. A Better Platform.</h2>
        <p className={styles.lead}>Bring your videos, courses and learners together with ZIQX Skills.</p>
        <div className={styles.btnRow}>
          <a href={siteConfig.signupHref} className={`${styles.btn} ${styles.btnPrimary}`}>
            Start Creating Courses <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 11 Footer ---------- */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandMark} aria-hidden="true">Z</span>
              ZIQX Skills
            </Link>
            <p className={styles.footerDesc}>
              Turn your existing YouTube Unlisted videos into structured online courses, set your prices and reach students through one platform.
            </p>
          </div>
          <nav aria-label="Platform">
            <h2 className={styles.footerHeading}>Platform</h2>
            <ul className={styles.footerList}>
              <li><a className={styles.footerLink} href="#platform">Platform</a></li>
              <li><a className={styles.footerLink} href="#features">Features</a></li>
              <li><a className={styles.footerLink} href="#how-it-works">How it works</a></li>
              <li><a className={styles.footerLink} href="#for-teachers">For teachers</a></li>
            </ul>
          </nav>
          <div>
            <h2 className={styles.footerHeading}>Contact</h2>
            <ul className={styles.footerList}>
              <li><a className={styles.footerLink} href="#contact">Request a demo</a></li>
              {siteConfig.contactEmail ? (
                <li><a className={styles.footerLink} href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></li>
              ) : (
                <li><span className={styles.footerLink}>Official email: to be configured</span></li>
              )}
            </ul>
          </div>
          <nav aria-label="Explore">
            <h2 className={styles.footerHeading}>Explore</h2>
            <ul className={styles.footerList}>
              <li><a className={styles.footerLink} href="#product">Product overview</a></li>
              <li><a className={styles.footerLink} href="#monetization">Free and paid courses</a></li>
              <li><a className={styles.footerLink} href="#faq">FAQs</a></li>
            </ul>
          </nav>
        </div>
        <div className={styles.footerBottom}>© {year} ZIQX Skills. All rights reserved.</div>
      </div>
    </footer>
  );
}
