// types
interface IconsProps {
    className?: string
}

export const ChevronDown = ({ className }: IconsProps) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className}><path d='m6 9 6 6 6-6'/></svg>
)

export const ChevronLeft = ({ className }: IconsProps) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' className={className}><path d='m15 18-6-6 6-6'/></svg>
)

export const ChevronRight = ({ className }: IconsProps) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' className={className}><path d='m9 18 6-6-6-6'/></svg>
)

export const Hamburger = ({ className }: IconsProps) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className}><path d='M4 5h16'/><path d='M4 12h16'/><path d='M4 19h16'/></svg>
)

export const Clock = ({ className }: IconsProps) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className}><circle cx='12' cy='12' r='10'/><path d='M12 6v6l4 2'/></svg>
)

export const Close = ({ className }: IconsProps) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className}><path d='M18 6 6 18'/><path d='m6 6 12 12'/></svg>
)

export const Facebook = ({ className }: IconsProps) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden>
		<path d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z'/>
	</svg>
)

export const X = ({ className }: IconsProps) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden>
		<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
	</svg>
)

export const Linkedin = ({ className }: IconsProps) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden>
		<path d='M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z'/>
	</svg>
)

export const Whatsapp = ({ className }: IconsProps) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden>
		<path d='M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24zm4.52 10.4c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.49 1.07 2.49.71 2.94.66.45-.05 1.45-.59 1.65-1.16.21-.57.21-1.06.14-1.16-.05-.1-.22-.16-.47-.28z'/>
	</svg>
)