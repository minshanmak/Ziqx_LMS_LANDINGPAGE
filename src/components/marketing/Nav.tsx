'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems, siteConfig } from '@/marketing/config';
import styles from './nav.module.css';

export function MarketingNav() {
  const [active, setActive] = useState('');
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const menuToggle = useRef<HTMLElement>(null);

  useEffect(() => {
    const anchors = new Set<string>(navItems.map((item) => item.href.slice(1)));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
      .filter((section) => anchors.has(section.id));
    let frame = 0;
    function update() {
      frame = 0;
      if (window.scrollY <= 4) {
        setActive('platform');
        return;
      }

      let current = 'platform';
      for (const section of sections) {
        if (section.getBoundingClientRect().top > 100) break;
        current = section.id;
      }
      if (
        window.scrollY > 4 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      ) {
        current = sections.at(-1)?.id ?? '';
      }
      setActive(current);
    }
    function queueUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
    };
  }, []);

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && mobileMenu.current?.open) {
        mobileMenu.current.open = false;
        menuToggle.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (mobileMenu.current?.open && !mobileMenu.current.contains(event.target as Node)) {
        mobileMenu.current.open = false;
      }
    }
    document.addEventListener('keydown', onEscape);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  function closeMenu() {
    if (mobileMenu.current) mobileMenu.current.open = false;
  }

  function selectSection(href: string) {
    setActive(href.slice(1));
    closeMenu();
  }

  const links = navItems.map(({ href, label }) => (
    <li key={href}>
      <a className={styles.navLink} href={href} onClick={() => selectSection(href)}
        aria-current={active === href.slice(1) ? 'location' : undefined}>{label}</a>
    </li>
  ));

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link href="/" className={styles.brand} aria-label="ZIQX Skills home" onClick={() => setActive('platform')}>
          <Image src="/favicon.svg" width={36} height={36} alt="" unoptimized />
          ZIQX Skills
        </Link>
        <ul className={styles.links}>{links}</ul>
        <div className={styles.actions}>
          <a className={`${styles.cta} ${styles.desktopCta}`} href={siteConfig.signupHref} onClick={closeMenu}>
            {siteConfig.signupHref === '#contact' ? 'Request a demo' : 'Create a course'}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <details className={styles.mobile} ref={mobileMenu}>
            <summary ref={menuToggle} className={styles.toggle} aria-label="Navigation menu">
              <Menu className={styles.menuIcon} size={21} aria-hidden="true" />
              <X className={styles.closeIcon} size={21} aria-hidden="true" />
            </summary>
            <div className={styles.dropdown}>
              <ul>{links}</ul>
              <a className={styles.cta} href={siteConfig.signupHref} onClick={closeMenu}>
                {siteConfig.signupHref === '#contact' ? 'Request a demo' : 'Create a course'}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
