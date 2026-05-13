import { motion } from 'framer-motion'
import { Container } from '../../common/Container/Container'
import { SectionHeader } from '../../common/SectionHeader/SectionHeader'
import type { ServiceItem } from '../../../types/portfolio.types'
import { SECTION_IDS } from '../../../utils/constants'
import styles from './ServicesSection.module.css'

const serviceIcon: Record<string, string> = {
  'Web App Development': 'WEB',
  'Mobile App Development': 'APP',
  'Backend API Development': 'API',
  'IoT Prototyping': 'IOT',
  'Thesis / Capstone Assistance': 'CAP',
  'UI Implementation': 'UI',
}

export const ServicesSection = ({ services }: { services: ServiceItem[] }) => (
  <section id={SECTION_IDS.services} className={styles.section}><Container><SectionHeader title='What I Do' subtitle='Services' /><motion.div className={styles.grid} initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>{services.map((service) => <motion.article key={service.title} className={styles.card} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}><h3><span className={styles.icon}>{serviceIcon[service.title] ?? 'SRV'}</span>{service.title}</h3><p>{service.description}</p></motion.article>)}</motion.div></Container></section>
)

