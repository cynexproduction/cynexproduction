import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/api/public/contact')({
  POST: async ({ request }) => {
    const body = await request.json()
    console.log('Contact form submission:', body)
    return json({ success: true, message: 'Message sent successfully' })
  },
})
