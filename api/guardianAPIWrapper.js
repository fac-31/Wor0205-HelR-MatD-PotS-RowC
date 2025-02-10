export async function readFromGuardian({ topic }) {
  try {
    const params = new URLSearchParams({
      q: topic,
      'from-date': '2014-01-01',
      'api-key': process.env.GUARDIAN_API_KEY,
    })

    const url = `https://content.guardianapis.com/search?${params}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Guardian API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Guardian API error:', error)
    throw error
  }
}
