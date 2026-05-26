import type { ResumeData } from '../data/resume.data'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MM_TO_PT = 2.83465
const MARGIN_X = 17 * MM_TO_PT
const TOP_Y = PAGE_HEIGHT - 15 * MM_TO_PT
const BOTTOM_Y = 15 * MM_TO_PT
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2
const H1_SIZE = 21.75
const TITLE_SIZE = 9
const CONTACT_SIZE = 7.12
const BODY_SIZE = 7.7
const META_SIZE = 8.1
const HEADING_SIZE = 8.62
const BULLET_INDENT = 12

interface PdfLine {
  text: string
  size: number
  font: 'regular' | 'bold'
  x?: number
  align?: 'left' | 'center' | 'right'
  gapAfter?: number
  rightText?: string
  rightSize?: number
  rightFont?: 'regular' | 'bold'
  ruleBelow?: boolean
}

const cleanText = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const escapePdfText = (text: string) => cleanText(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const getTextWidth = (text: string, size: number) => cleanText(text).length * size * 0.5

const wrapText = (text: string, size: number, width = CONTENT_WIDTH) => {
  const words = cleanText(text).split(' ')
  const lines: string[] = []
  let line = ''

  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (getTextWidth(next, size) <= width) {
      line = next
    } else {
      if (line) lines.push(line)
      line = word
    }
  }

  if (line) lines.push(line)
  return lines
}

const textCommand = ({ text, size, font, x = MARGIN_X, align = 'left', rightText, rightSize = size, rightFont = font }: PdfLine, y: number) => {
  const resolvedX =
    align === 'center'
      ? (PAGE_WIDTH - getTextWidth(text, size)) / 2
      : align === 'right'
        ? PAGE_WIDTH - MARGIN_X - getTextWidth(text, size)
        : x

  const commands = [
    `BT /${font === 'bold' ? 'F2' : 'F1'} ${size} Tf ${resolvedX.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfText(text)}) Tj ET`,
  ]

  if (rightText) {
    const rightX = PAGE_WIDTH - MARGIN_X - getTextWidth(rightText, rightSize)
    commands.push(`BT /${rightFont === 'bold' ? 'F2' : 'F1'} ${rightSize} Tf ${rightX.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfText(rightText)}) Tj ET`)
  }

  return commands.join('\n')
}

const sectionLineCommand = (y: number) => `${MARGIN_X.toFixed(2)} ${y.toFixed(2)} m ${(PAGE_WIDTH - MARGIN_X).toFixed(2)} ${y.toFixed(2)} l S`

const buildResumeLines = (resume: ResumeData): PdfLine[] => {
  const contactLine = resume.contacts.map((contact) => contact.value).join(' | ')
  const lines: PdfLine[] = [
    { text: resume.name.toUpperCase(), size: H1_SIZE, font: 'bold', align: 'center', gapAfter: 5.7 },
    { text: resume.title, size: TITLE_SIZE, font: 'bold', align: 'center', gapAfter: 5.1 },
    ...wrapText(contactLine, CONTACT_SIZE).map((text): PdfLine => ({ text, size: CONTACT_SIZE, font: 'regular', align: 'center', gapAfter: 3.2 })),
    { text: '', size: 1, font: 'regular', gapAfter: 6 },
    { text: 'PROFESSIONAL SUMMARY', size: HEADING_SIZE, font: 'bold', gapAfter: 5.2, ruleBelow: true },
    ...wrapText(resume.summary, BODY_SIZE).map((text): PdfLine => ({ text, size: BODY_SIZE, font: 'regular', gapAfter: 3.35 })),
    { text: '', size: 1, font: 'regular', gapAfter: 2.3 },
    { text: 'TECHNICAL SKILLS', size: HEADING_SIZE, font: 'bold', gapAfter: 5.2, ruleBelow: true },
  ]

  resume.skills.forEach((skill) => {
    lines.push({ text: `${skill.category}: ${skill.items.join(', ')}`, size: BODY_SIZE, font: 'regular', gapAfter: 3.35 })
  })

  lines.push(
    { text: '', size: 1, font: 'regular', gapAfter: 2.3 },
    { text: 'PROFESSIONAL EXPERIENCE', size: HEADING_SIZE, font: 'bold', gapAfter: 5.2, ruleBelow: true },
  )

  resume.experience.forEach((item) => {
    lines.push({ text: item.role, size: META_SIZE, font: 'bold', rightText: item.dateRange, rightSize: 7.5, rightFont: 'bold', gapAfter: 2.8 })
    lines.push({ text: item.location ? `${item.organization}, ${item.location}` : item.organization, size: 7.5, font: 'regular', gapAfter: 2.2 })
    item.bullets.forEach((bullet) => {
      wrapText(`- ${bullet}`, 7.5, CONTENT_WIDTH - BULLET_INDENT).forEach((text) => {
        lines.push({ text, size: 7.5, font: 'regular', x: MARGIN_X + BULLET_INDENT, gapAfter: 2.55 })
      })
    })
  })

  lines.push(
    { text: '', size: 1, font: 'regular', gapAfter: 2.3 },
    { text: 'SELECTED PROJECTS', size: HEADING_SIZE, font: 'bold', gapAfter: 5.2, ruleBelow: true },
  )

  resume.projects.forEach((project) => {
    lines.push({ text: project.title, size: META_SIZE, font: 'bold', gapAfter: 2.8 })
    lines.push({ text: project.techStack, size: 7.5, font: 'bold', gapAfter: 2.2 })
    project.bullets.forEach((bullet) => {
      wrapText(`- ${bullet}`, 7.5, CONTENT_WIDTH - BULLET_INDENT).forEach((text) => {
        lines.push({ text, size: 7.5, font: 'regular', x: MARGIN_X + BULLET_INDENT, gapAfter: 2.55 })
      })
    })
  })

  lines.push(
    { text: '', size: 1, font: 'regular', gapAfter: 2.3 },
    { text: 'EDUCATION', size: HEADING_SIZE, font: 'bold', gapAfter: 5.2, ruleBelow: true },
  )

  resume.education.forEach((item) => {
    lines.push({ text: item.school, size: META_SIZE, font: 'bold', rightText: item.dateRange, rightSize: 7.5, rightFont: 'bold', gapAfter: 2.8 })
    lines.push({ text: item.degree, size: 7.5, font: 'regular', gapAfter: 2.2 })
  })

  lines.push(
    { text: '', size: 1, font: 'regular', gapAfter: 2.3 },
    { text: 'ACHIEVEMENTS', size: HEADING_SIZE, font: 'bold', gapAfter: 5.2, ruleBelow: true },
  )

  resume.achievements.forEach((item) => {
    wrapText(`- ${item}`, 7.5, CONTENT_WIDTH - BULLET_INDENT).forEach((text) => {
      lines.push({ text, size: 7.5, font: 'regular', x: MARGIN_X + BULLET_INDENT, gapAfter: 2.55 })
    })
  })

  lines.push(
    { text: '', size: 1, font: 'regular', gapAfter: 2.3 },
    { text: 'ADDITIONAL INFORMATION', size: HEADING_SIZE, font: 'bold', gapAfter: 5.2, ruleBelow: true },
  )

  resume.additional.forEach((item) => {
    wrapText(`- ${item}`, 7.5, CONTENT_WIDTH - BULLET_INDENT).forEach((text) => {
      lines.push({ text, size: 7.5, font: 'regular', x: MARGIN_X + BULLET_INDENT, gapAfter: 2.55 })
    })
  })

  return lines
}

const buildPdf = (resume: ResumeData) => {
  const pages: string[][] = [[]]
  let y = TOP_Y

  for (const line of buildResumeLines(resume)) {
    const lineHeight = line.size * 0.96 + (line.gapAfter ?? 1)

    if (line.text && y - lineHeight < BOTTOM_Y) {
      pages.push([])
      y = TOP_Y
    }

    if (line.text) {
      pages[pages.length - 1].push(textCommand(line, y))
      if (line.ruleBelow) {
        pages[pages.length - 1].push(sectionLineCommand(y - 3.8))
      }
    }

    y -= lineHeight
  }

  const objects: string[] = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ]

  const pageObjectRefs: string[] = []
  const pageObjects: string[] = []

  pages.forEach((commands, index) => {
    const pageObjectId = 5 + index * 2
    const contentObjectId = pageObjectId + 1
    const stream = `0 G 0.75 w\n${commands.join('\n')}`

    pageObjectRefs.push(`${pageObjectId} 0 R`)
    pageObjects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectId} 0 R >>`)
    pageObjects.push(`<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`)
  })

  objects[1] = `<< /Type /Pages /Kids [${pageObjectRefs.join(' ')}] /Count ${pages.length} >>`
  objects.push(...pageObjects)

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = [0]

  objects.forEach((object, index) => {
    offsets.push(new TextEncoder().encode(pdf).length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefOffset = new TextEncoder().encode(pdf).length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  pdf += offsets.slice(1).map((offset) => `${offset.toString().padStart(10, '0')} 00000 n \n`).join('')
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  return new Blob([pdf], { type: 'application/pdf' })
}

export const downloadResumePdf = (resume: ResumeData) => {
  const url = URL.createObjectURL(buildPdf(resume))
  const link = document.createElement('a')
  link.href = url
  link.download = `${resume.name.replace(/\s+/g, '-')}-Resume.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
