export function isLike(button) {
	const likesCounter = button.previousElementSibling
	let currentLikes = parseInt(likesCounter.textContent)
	if (!isNaN(currentLikes)) {
		if (button.classList.contains('-active-like')) {
			button.classList.remove('-active-like')
			currentLikes -= 1
		} else {
			button.classList.add('-active-like')
			currentLikes += 1
		}
		likesCounter.textContent = currentLikes
	} else {
		console.error('Current likes value is NaN')
	}
}

export function resetButton(buttonElement) {
	buttonElement.disabled = false
	buttonElement.textContent = 'Написать'
}
