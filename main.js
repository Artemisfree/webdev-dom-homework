import { postComment, commentsApi } from './api.js';
import { protector } from './utils.js';
import { showLoading, hideLoading, checkOnlineStatus } from './internetStatus.js';
import { commentData, createCommentElement, escapeAndAddComment } from './comment.js'
import { resetButton, isLike, addButtonClick } from './buttons.js'
import { initLikes, initComment } from './handlers.js';
('use strict')

// const listElement = document.getElementById('list')

const nameInputElement = document.getElementById('name-input')
const textInputElement = document.getElementById('text-input')
const buttonElement = document.getElementById('add-button')
const personalKey = 'artem-nadtocheev'



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
    escapeAndAddComment(
			nameInputElement,
			textInputElement,
			protector,
			addComment
		)
})

function fetchComments() {
	showLoading();

	if (!checkOnlineStatus()) {
		hideLoading();
		return;
	}
	commentsApi(personalKey)
		.then(data => {
			displayComments(data.comments)
		})
		.catch(error => {
			alert('Произошла ошибка соединения. Проверь интернет соединение!')
		})
		.finally(() => {
			hideLoading();
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
	initComment(textInputElement)
}

function addComment(name, text) {
	buttonElement.disabled = true
	buttonElement.textContent = 'UPDATING...'
	if (!checkOnlineStatus()) {
		resetButton(buttonElement)
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
			resetButton(buttonElement)
		})
}

document.addEventListener('DOMContentLoaded', event => {
	fetchComments()
})

console.log('It works!')
