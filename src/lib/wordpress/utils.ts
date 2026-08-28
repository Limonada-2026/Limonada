// named entities WordPress produces through wptexturize and friends
const namedEntities: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' ',
	hellip: '…',
	ndash: '–',
	mdash: '—',
	lsquo: '‘',
	rsquo: '’',
	ldquo: '“',
	rdquo: '”'
}

// turns the HTML entities WordPress returns back into plain characters
export function decodeEntities(value: string) {
	return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {

		if (entity.startsWith('#')) {
			const isHex = entity[1] === 'x' || entity[1] === 'X'
			const code = parseInt(isHex ? entity.slice(2) : entity.slice(1), isHex ? 16 : 10)

			// malformed entities stay as they are rather than blowing up
			if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return match

			return String.fromCodePoint(code)
		}

		return namedEntities[entity.toLowerCase()] ?? match
	})
}

// WordPress wraps excerpts in markup, but the site uses them as plain text
export function stripTags(value: string) {
	return value.replace(/<[^>]*>/g, '')
}

// excerpts come back as filtered HTML, so clean them up before rendering
export function toPlainText(value?: string | null) {
	if (!value) return ''
	return decodeEntities(stripTags(value)).replace(/\s+/g, ' ').trim()
}

// the site formats dates itself and expects a plain YYYY-MM-DD string
export function toDateOnly(value?: string | null) {
	if (!value) return ''
	return value.slice(0, 10)
}

// the narrative sections are single textareas holding one paragraph per line
export function toParagraphs(value?: string | null) {
	if (!value) return []

	return value
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean)
}
