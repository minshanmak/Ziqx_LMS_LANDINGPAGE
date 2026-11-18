'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, siteConfig } from '@/marketing/config';
import styles from './marketing.module.css';

const sectionIds = navItems.map((item) => item.href.slice(1));

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll and active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 8);

      // Near top of page: clear active highlight (Hero section)
      if (scrollY < 120) {
        setActive('');
        return;
      }

      // At bottom of page: highlight the last section (Contact)
      const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        const lastSection = sectionIds[sectionIds.length - 1];
        if (lastSection) {
          setActive(lastSection);
          return;
        }
      }

      // Check sections based on vertical position from bottom to top
      const headerOffset = 100;
      const sectionElements = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null)
        .sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, el } = sectionElements[i];
        const top = el.getBoundingClientRect().top;
        if (top <= headerOffset) {
          setActive(id);
          return;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setOpen(false);

    if (href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', window.location.pathname);
      setActive('');
      return;
    }

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const headerOffset = 64;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });
    window.history.replaceState(null, '', href);
    setActive(targetId);
  }

  function handleBrandClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', window.location.pathname);
    setActive('');
  }

  const headerClassName = [
    styles.header,
    scrolled ? styles.headerScrolled : null,
    open ? styles.headerOpen : null,
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClassName}>
      <div className={styles.container}>
        <nav className={styles.navInner} aria-label="Main">
          <Link href="/" onClick={handleBrandClick} className={styles.brand} aria-label="ZIQX Skills home">
            <span className={styles.brandMark} aria-hidden="true">Z</span>
            ZIQX Skills
          </Link>

          <ul className={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              const navLinkClass = [
                styles.navLink,
                isActive ? styles.navLinkActive : null,
              ].filter(Boolean).join(' ');

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchor(e, item.href)}
                    className={navLinkClass}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className={styles.navActions}>
            <a
              href={siteConfig.signupHref}
              onClick={(e) => handleAnchor(e, siteConfig.signupHref)}
              className={`${styles.btn} ${styles.btnPrimary}`}
              style={{ height: 40 }}
            >
              Start Creating Courses
            </a>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </nav>

        {open && (
          <div id="mobile-menu" className={styles.mobileMenu}>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink} onClick={(e) => handleAnchor(e, item.href)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.mobileActions}>
              <a
                href={siteConfig.signupHref}
                onClick={(e) => handleAnchor(e, siteConfig.signupHref)}
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
              >
                Start Creating Courses
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
