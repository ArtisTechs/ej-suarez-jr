import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import type { ProfileInfo, SocialLink } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './ContactSection.module.css'

export const ContactSection = ({ profile, links }: { profile: ProfileInfo; links: SocialLink[] }) => {
  const [submitted, setSubmitted] = useState(false)
  const socialIconByLabel: Record<string, ReactNode> = {
    GitHub: (
      <svg viewBox='0 0 24 24' focusable='false'>
        <path d='M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.9 1.7 2.9 2.4.9.6 2.3.5 2.8.3.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 9 9.8a3.6 3.6 0 0 1 .1-2.7s.9-.3 2.9 1.1a10 10 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.4.9.4 1.8.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.8 5 .4.3.7 1 .7 2.1V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z' />
      </svg>
    ),
    LinkedIn: (
      <svg viewBox='0 0 24 24' focusable='false'>
        <path d='M6.9 8.4a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8zM5.2 9.8h3.4V20H5.2V9.8zm5.2 0h3.2v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20h-3.4v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V20h-3.4V9.8z' />
      </svg>
    ),
    Facebook: (
      <svg viewBox='0 0 24 24' focusable='false'>
        <path d='M13.6 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.6 1.6-1.6h1.7V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8.4V14h2.3v8h2.9z' />
      </svg>
    ),
  }

  return (
    <section id={SECTION_IDS.contact} className={styles.section}>
      <Container>
        <SectionHeader title='Contact' subtitle='Let us build something useful' />
        <motion.div className={styles.grid} initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.article className={`${styles.card} ${styles.infoCard}`} variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}>
            <h3><span className={styles.icon}>MSG</span>Get In Touch</h3>
            <p className={styles.lead}>Have a project, collaboration, or idea to build? Let us connect and ship something clean and impactful.</p>
            <a className={styles.emailLink} href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className={styles.meta}>
              <motion.span initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.4, delay: 0 }}>
                <span className={styles.metaIcon} aria-hidden='true'>
                  <svg viewBox='0 0 24 24' focusable='false'><path d='M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z' /></svg>
                </span>
                {profile.location}
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.4, delay: 0.08 }}>
                <span className={styles.metaIcon} aria-hidden='true'>
                  <svg viewBox='0 0 24 24' focusable='false'><path d='M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.4 2.7.6 4.1.6.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10 22.2 1.8 14 1.8 3.8 1.8 3.1 2.3 2.6 3 2.6h4.2c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.8.6 4.1.1.4 0 .9-.3 1.2l-2.1 1.7z' /></svg>
                </span>
                {profile.mobile}
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.4, delay: 0.16 }}>
                <span className={styles.metaIcon} aria-hidden='true'>
                  <svg viewBox='0 0 24 24' focusable='false'><path d='M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V9h14v10zm-7-8a4 4 0 1 0 4 4h-2a2 2 0 1 1-2-2V11z' /></svg>
                </span>
                {profile.availability}
              </motion.span>
            </div>
            <div className={styles.links}>
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: 0.22 + index * 0.08 }}
                >
                  <span className={styles.linkIcon} aria-hidden='true'>
                    {socialIconByLabel[link.label] ?? <svg viewBox='0 0 24 24' focusable='false'><circle cx='12' cy='12' r='5' /></svg>}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.article>
          <motion.form className={`${styles.card} ${styles.formCard}`} variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
            <label>Name<input required name='name' /></label>
            <label>Email<input required type='email' name='email' /></label>
            <label>Message<textarea required name='message' rows={4} /></label>
            <button type='submit'>Send Message</button>
            {submitted && <p className={styles.success}>Message sent (mock). API integration ready.</p>}
          </motion.form>
        </motion.div>
      </Container>
    </section>
  )
}

