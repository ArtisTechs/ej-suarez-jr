import emailjs from '@emailjs/browser'

export type ContactEmailPayload = {
  fromName: string
  fromEmail: string
  message: string
}

type EmailJsConfig = {
  serviceId: string
  templateId: string
  publicKey: string
  templateToEmail?: string
}

const getEmailJsConfig = (): EmailJsConfig => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
  const templateToEmail = import.meta.env.VITE_EMAILJS_TEMPLATE_TO_EMAIL?.trim()

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'Email service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.',
    )
  }

  return { serviceId, templateId, publicKey, templateToEmail }
}

export const sendContactEmail = async (payload: ContactEmailPayload): Promise<void> => {
  const { serviceId, templateId, publicKey, templateToEmail } = getEmailJsConfig()

  const templateParams: Record<string, string> = {
    from_name: payload.fromName,
    from_email: payload.fromEmail,
    message: payload.message,
  }

  if (templateToEmail) {
    templateParams.to_email = templateToEmail
  }

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey)
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'text' in error) {
      const text = typeof error.text === 'string' ? error.text : ''
      throw new Error(text || 'Unable to send your message right now. Please try again.')
    }

    throw new Error('Unable to send your message right now. Please try again.')
  }
}
