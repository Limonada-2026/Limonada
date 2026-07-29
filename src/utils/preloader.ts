export const PRELOADER_HOME_DROP = 'preloader:home-drop'

export function dispatchPreloaderHomeDrop() {
	document.documentElement.dataset.preloaderHomeDrop = 'true'
	window.dispatchEvent(new CustomEvent(PRELOADER_HOME_DROP))
}

export function hasPreloaderHomeDropped() {
	return document.documentElement.dataset.preloaderHomeDrop === 'true'
}

export function isPreloaderActive() {
	const preloader = document.querySelector<HTMLElement>('[data-preloader]')
	if (!preloader || preloader.dataset.preloaderDone === 'true') return false

	const style = getComputedStyle(preloader)
	return style.visibility !== 'hidden' && style.opacity !== '0'
}
