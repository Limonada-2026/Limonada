// types
type JsonLdProps = {
	data: object
}

// schema.org data as a plain script tag, so it ships in the server HTML. next/script
// only injects inline scripts in the browser, after hydration, where crawlers that
// skip JavaScript never see them. "<" is escaped so text coming from WordPress can
// never close the tag early.
export default function JsonLd({ data }: JsonLdProps) {
	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
		/>
	)
}
