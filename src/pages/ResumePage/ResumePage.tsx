import { ExperienceItem } from '../../components/resume/ExperienceItem'
import { ProjectItem } from '../../components/resume/ProjectItem'
import { ResumeHeader } from '../../components/resume/ResumeHeader'
import { ResumeSection } from '../../components/resume/ResumeSection'
import { SkillsGroup } from '../../components/resume/SkillsGroup'
import { resumeData } from '../../data/resume.data'
import { getAppUrl } from '../../utils/routing'
import styles from './ResumePage.module.css'

const downloadResume = () => {
  window.print()
}

export const ResumePage = () => (
  <main className={styles.resumePage}>
    <header className={styles.toolbar}>
      <a className={styles.toolbarButton} href={getAppUrl('/')}>Return Home</a>
      <button className={styles.toolbarButton} type='button' onClick={downloadResume}>Download Resume</button>
    </header>

    <article className={styles.sheet} aria-label='ATS friendly resume'>
      <ResumeHeader name={resumeData.name} title={resumeData.title} contacts={resumeData.contacts} />

      <ResumeSection title='Professional Summary'>
        <p>{resumeData.summary}</p>
      </ResumeSection>

      <ResumeSection title='Technical Skills'>
        <div className={styles.skillList}>
          {resumeData.skills.map((skill) => <SkillsGroup key={skill.category} category={skill.category} items={skill.items} />)}
        </div>
      </ResumeSection>

      <ResumeSection title='Professional Experience'>
        {resumeData.experience.map((item) => <ExperienceItem key={`${item.role}-${item.organization}`} item={item} />)}
      </ResumeSection>

      <ResumeSection title='Selected Projects'>
        {resumeData.projects.map((project) => <ProjectItem key={project.title} item={project} />)}
      </ResumeSection>

      <ResumeSection title='Education'>
        {resumeData.education.map((item) => (
          <div className={styles.educationItem} key={item.school}>
            <div>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
            </div>
            <span>{item.dateRange}</span>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title='Achievements'>
        <ul>
          {resumeData.achievements.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </ResumeSection>

      <ResumeSection title='Additional Information'>
        <ul>
          {resumeData.additional.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </ResumeSection>
    </article>
  </main>
)
