import { postComment, commentsApi } from './api.js';
import { createCommentElement, isLike, protector } from './utils.js';
('use strict')
// const listElement = document.getElementById('list')
const nameInputElement = document.getElementById('name-input')
const textInputElement = document.getElementById('text-input')
const buttonElement = document.getElementById('add-button')
const personalKey = 'artem-nadtocheev'

const initComment = () => {
	const commentElements = document.querySelectorAll('.comment')
	commentElements.forEach(commentElement => {
		commentElement.addEventListener('click', () => {
			const authorName = commentElement.querySelector(
				'.comment-header > div:first-child'
			).textContent
			const commentText =
				commentElement.querySelector('.comment-text').textContent
			textInputElement.value = `> ${commentText.trim()}\n${authorName.trim()},`
			textInputElement.focus()
		})
	})
}

const initLikes = () => {
	document.querySelectorAll('.like-button').forEach(button => {
		button.addEventListener('click', event => {
			event.stopPropagation()
            isLike(button);
		})
	})
}

buttonElement.addEventListener('click', () => {
	nameInputElement.classList.remove('error')
	textInputElement.classList.remove('error')
	if (nameInputElement.value.trim() === '') {
		nameInputElement.classList.add('error')
		return
	} else if (textInputElement.value.trim() === '') {
		textInputElement.classList.add('error')
		return
	}
	const escapedName = protector(nameInputElement.value)
	const escapedText = protector(textInputElement.value)
	addComment(escapedName, escapedText)
	nameInputElement.value = ''
	textInputElement.value = ''
})

function fetchComments() {
	document.getElementById('loadingIndicator').style.display = 'block'

	if (!navigator.onLine) {
		alert('Интернет пропал. Попробуй чуть позже.')
		document.getElementById('loadingIndicator').style.display = 'none'
		return
	}
    commentsApi(personalKey)
		.then(data => {
			displayComments(data.comments)
		})
		.catch(error => {
			alert('Произошла ошибка соединения. Проверь интернет соединение!')
		})
		.finally(() => {
			document.getElementById('loadingIndicator').style.display = 'none'
		})
}

function displayComments(comments) {
	const listElement = document.getElementById('list')
	listElement.innerHTML = ''
	comments.forEach(comment => {
		const commentElement = createCommentElement(comment);
		listElement.appendChild(commentElement);
	})
	initLikes()
	initComment()
}

function addComment(name, text) {
	buttonElement.disabled = true
	buttonElement.textContent = 'UPDATING...'
	if (!navigator.onLine) {
		alert('Интернет пропал. Попробуй позже.')
		resetButton()
		return
	}
	postComment(name, text, personalKey)
		.then(data => {
			fetchComments()
			nameInputElement.value = ''
			textInputElement.value = ''
		})
		.catch(error => {
			alert(error.message)
		})
		.finally(() => {
			resetButton()
		})
}

function resetButton() {
	buttonElement.disabled = false
	buttonElement.textContent = 'Написать'
}

document.addEventListener('DOMContentLoaded', event => {
	fetchComments()
})

console.log('It works!')
