// format date in Brazilian long form (e.g. "20 de julho de 2026")
export function formatDateLongPtBR(date: string) {
	return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
}

// format the date and show only the year
export function getYear(year: string) {
    return new Date(year).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric'
    })
}

// social share links for a given URL + text
export function getShareLinks(url: string, text: string) {
	const encodedUrl = encodeURIComponent(url)
	const encodedText = encodeURIComponent(text)

	return [
		{
			platform: 'facebook' as const,
			label: 'Facebook',
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
		},
		{
			platform: 'x' as const,
			label: 'X',
			href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
		},
		{
			platform: 'linkedin' as const,
			label: 'LinkedIn',
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
		},
		{
			platform: 'whatsapp' as const,
			label: 'WhatsApp',
			href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
		}
	]
}
