import { commentData } from './comment.js'
import { isLike } from './buttons.js'

export const initComment = (textInputElement) => {
	const commentElements = document.querySelectorAll('.comment')
	commentElements.forEach(commentElement => {
		commentElement.addEventListener('click', () => {
			const { authorName, commentText } = commentData(commentElement)
			textInputElement.value = `> ${commentText}\n${authorName},`
			textInputElement.focus()
		})
	})
}

export const initLikes = () => {
	document.querySelectorAll('.like-button').forEach(button => {
		button.addEventListener('click', event => {
			event.stopPropagation()
			isLike(button)
		})
	})
}
