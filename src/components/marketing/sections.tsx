import {
  ArrowDown, ArrowRight, Award, BookOpen, Building2, ChevronDown, CirclePlay, GraduationCap,
  Layers, Link2, ListVideo, MonitorPlay, Radio, School, Users, Wallet,
} from 'lucide-react';
import { audiences, faqItems, siteConfig, testimonials, videoPrivacyNote } from '@/marketing/config';
import { CourseBuilderMock, StudentPortalMock, TeacherDashboardMock } from './mockups';
import styles from './marketing.module.css';

export function Hero() {
  return (
    <section id="platform" className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroLabel}><GraduationCap size={18} aria-hidden="true" /> LMS for educators</p>
          <h1 id="hero-title">Your videos.<br /><span>Your courses.</span></h1>
          <p className={styles.heroLead}>Turn your unlisted YouTube videos into structured courses. Set your price, teach live, and follow each learner’s progress in one place.</p>
          <div className={styles.actions}>
            <a href={siteConfig.signupHref} className={styles.primary}>
              {siteConfig.signupHref === '#contact' ? 'Request a demo' : 'Create a course'}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="#how-it-works" className={styles.secondary}>See how it works <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className={styles.heroStage}>
          <figcaption className={styles.stageCaption}>
            <span><MonitorPlay size={16} aria-hidden="true" /> Trainer workspace</span>
            <small>Sample data</small>
          </figcaption>
          <div className={styles.heroScreen}><TeacherDashboardMock /></div>
        </figure>
      </div>
    </section>
  );
}

const audienceIcons = [GraduationCap, MonitorPlay, CirclePlay, Users, School, Building2];

export function AudienceSection() {
  return (
    <section id="audience" className={styles.audience} aria-labelledby="audience-title">
      <div className={`${styles.container} ${styles.audienceInner}`}>
        <h2 id="audience-title">Designed for</h2>
        <ul>
          {audiences.map(({ title }, i) => {
            const Icon = audienceIcons[i];
            return <li key={title}><Icon size={18} aria-hidden="true" />{title}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}

const features = [
  { icon: Wallet, title: 'Free and paid courses', summary: 'Choose who can join and what they pay.', points: ['Offer free enrolment or set a course price.', 'Add an optional discount and preview the price learners will see.'] },
  { icon: Users, title: 'Learner management', summary: 'See who’s enrolled and how far they’ve come.', points: ['Find learners across your courses.', 'Review enrolments and individual course progress.'] },
  { icon: BookOpen, title: 'Learner portal', summary: 'Give your students a home for their courses.', points: ['Learners can browse courses and resume their last lesson.', 'Each course shows its modules, lessons and completion progress.'] },
  { icon: Radio, title: 'Live sessions', summary: 'Bring your class together between lessons.', points: ['Schedule a session and add a Google Meet link.', 'Learners can find upcoming sessions from their portal.'] },
  { icon: Award, title: 'Completion certificates', summary: 'Recognise learners when they finish a course.', points: ['Learners can open and download their certificate.', 'A shareable certificate link makes their achievement easy to pass on.'] },
];

export function Features() {
  return (
    <section id="features" className={styles.section} aria-labelledby="features-title">
      <div className={styles.container}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker}>Platform features</p>
          <h2 id="features-title">Inside your teaching workspace.</h2>
        </header>
        <div className={styles.featureLayout}>
          <article className={styles.builderCard} id="for-teachers">
            <div className={styles.builderCopy}>
              <span className={styles.featureBadge}><Layers size={18} aria-hidden="true" /></span>
              <h3>Course builder</h3>
              <p>Arrange videos into modules and lessons, then preview the course as a learner.</p>
            </div>
            <div className={styles.builderScreen}><CourseBuilderMock /></div>
          </article>
          <div className={styles.disclosures}>
            {features.map(({ icon: Icon, title, summary, points }, index) => (
              <details key={title} className={styles.disclosure} id={index === 0 ? 'monetization' : undefined}>
                <summary>
                  <span className={styles.featureBadge}><Icon size={20} aria-hidden="true" /></span>
                  <span className={styles.rowCopy}><strong>{title}</strong><span>{summary}</span></span>
                  <ChevronDown size={18} aria-hidden="true" className={styles.chevron} />
                </summary>
                <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { icon: Link2, title: 'Link your lessons', text: 'Paste your existing unlisted YouTube links into the course builder.' },
  { icon: ListVideo, title: 'Shape the course', text: 'Group lessons into modules and choose free or paid access.' },
  { icon: GraduationCap, title: 'Open enrolment', text: 'Publish to your learner portal and invite your first students.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className={`${styles.section} ${styles.workflow}`} aria-labelledby="how-title">
      <div className={styles.container}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker}>How it works</p>
          <h2 id="how-title">From playlist to published course.</h2>
        </header>
        <ol className={styles.steps}>
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title}>
              <div className={styles.stepTrack}><span><Icon size={22} aria-hidden="true" /></span></div>
              <h3><small>{index + 1}.</small> {title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ProductShowcase() {
  return (
    <section id="product" className={styles.section} aria-labelledby="portal-title">
      <div className={`${styles.container} ${styles.portalLayout}`}>
        <div className={styles.portalCopy}>
          <p className={styles.kicker}>The learner experience</p>
          <h2 id="portal-title">A clear path to the next lesson.</h2>
          <p className={styles.lead}>Students can pick up where they left off, see what’s coming up, and keep the certificates they’ve earned.</p>
          <ul>
            <li><CirclePlay size={19} /> Resume a lesson</li>
            <li><Radio size={19} /> Join a live session</li>
            <li><Award size={19} /> Download a certificate</li>
          </ul>
        </div>
        <figure className={styles.learnerStage}>
          <figcaption className={styles.stageCaption}><span><BookOpen size={16} aria-hidden="true" /> Learner portal</span><small>Sample data</small></figcaption>
          <StudentPortalMock />
        </figure>
      </div>
    </section>
  );
}

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className={`${styles.section} ${styles.stories}`} aria-labelledby="stories-title">
      <div className={styles.container}>
        <header className={styles.sectionHead}><p className={styles.kicker}>Teacher stories</p><h2 id="stories-title">In educators’ own words.</h2></header>
        <div className={styles.quotes}>
          {testimonials.map(({ quote, name, role }) => (
            <figure key={name}>
              <blockquote>“{quote}”</blockquote>
              <figcaption><strong>{name}</strong><span>{role}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={`${styles.container} ${styles.faqLayout}`}>
        <header className={styles.sectionHead}><p className={styles.kicker}>FAQ</p><h2 id="faq-title">Before you get started.</h2></header>
        <div className={styles.questions}>
          {faqItems.map(({ q, a }) => (
            <details key={q}><summary>{q}<ChevronDown size={17} aria-hidden="true" className={styles.chevron} /></summary><p>{a}</p></details>
          ))}
          <details><summary>Are unlisted videos private?<ChevronDown size={17} aria-hidden="true" className={styles.chevron} /></summary><p>{videoPrivacyNote}</p></details>
        </div>
      </div>
    </section>
  );
}

const copyrightYear = new Date().getUTCFullYear();

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInner}>
          <div className={styles.footerAbout}>
            <a href="#platform" className={styles.brand}><img src="/favicon.svg" alt="" width="38" height="38" /> ZIQX Skills</a>
            <p>Give your knowledge a place to grow. Create courses from your videos, connect with learners, and build your teaching business.</p>
            <a href={siteConfig.signupHref} className={styles.footerCta}>
              {siteConfig.signupHref === '#contact' ? 'Request a demo' : 'Create a course'}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <nav className={styles.footerColumn} aria-labelledby="footer-product">
            <h2 id="footer-product">Product</h2>
            <ul>
              <li><a href="#features">Platform features</a></li>
              <li><a href="#for-teachers">Course builder</a></li>
              <li><a href="#product">Learner portal</a></li>
              <li><a href="#monetization">Free &amp; paid courses</a></li>
            </ul>
          </nav>
          <nav className={styles.footerColumn} aria-labelledby="footer-explore">
            <h2 id="footer-explore">Explore</h2>
            <ul>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#audience">Who we’re built for</a></li>
              {testimonials.length > 0 && <li><a href="#testimonials">Teacher stories</a></li>}
              <li><a href="#faq">Common questions</a></li>
            </ul>
          </nav>
          <div className={styles.footerColumn}>
            <h2>Let’s connect</h2>
            <p>Planning your first course or bringing your academy online? Talk to our team.</p>
            <a className={styles.footerContact} href="#contact">Get in touch <ArrowRight size={15} aria-hidden="true" /></a>
            {siteConfig.contactEmail && <a className={styles.footerEmail} href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {copyrightYear} ZIQX Skills. All rights reserved.</span>
          <a href="#platform">Back to top <ArrowDown size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
