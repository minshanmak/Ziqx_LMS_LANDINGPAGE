'use client';

import { useEffect } from 'react';

export function ScrollObserver() {
  useEffect(() => {
    // If reduced motion is requested, reveal everything immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach((el) => {
        el.classList.add('isRevealed');
        el.setAttribute('data-revealed', 'true');
        if (el.hasAttribute('data-reveal-group')) {
          Array.from(el.children).forEach((child) => {
            child.classList.add('isRevealed');
          });
        }
      });
      return;
    }

    // Set stagger index for grouped items
    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
      Array.from(group.children).forEach((child, idx) => {
        if (child instanceof HTMLElement) {
          child.style.setProperty('--stagger-index', String(idx));
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('isRevealed');
            target.setAttribute('data-revealed', 'true');

            if (target.hasAttribute('data-reveal-group')) {
              Array.from(target.children).forEach((child) => {
                child.classList.add('isRevealed');
              });
            }

            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const elements = document.querySelectorAll('[data-reveal], [data-reveal-group]');
    elements.forEach((el) => {
      // Immediately reveal elements already inside or above initial viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('isRevealed');
        el.setAttribute('data-revealed', 'true');
        if (el.hasAttribute('data-reveal-group')) {
          Array.from(el.children).forEach((child) => {
            child.classList.add('isRevealed');
          });
        }
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
