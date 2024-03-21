import { initLikes, initComment } from './handlers.js'
import { resetButton } from './buttons.js'
import { postComment } from './api.js'
import { checkOnlineStatus } from './internetStatus.js'
import { protector } from './utils.js'
import { fetchComments } from './main.js'

export function commentData(commentElement) {
	const authorName = commentElement.querySelector(
		'.comment-header > div:first-child'
	).textContent
	const commentText = commentElement.querySelector('.comment-text').textContent

	return {
		authorName: authorName.trim(),
		commentText: commentText.trim(),
	}
}

export function escapeAndAddComment(
	nameInputElement,
	textInputElement,
	protector,
	addComment
) {
	const escapedName = protector(nameInputElement.value)
	const escapedText = protector(textInputElement.value)
	addComment(escapedName, escapedText)
	nameInputElement.value = ''
	textInputElement.value = ''
}

export function createCommentElement(comment) {
	const commentElement = document.createElement('li');
	commentElement.className = 'comment'
	commentElement.innerHTML = `
        <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${new Date(comment.date).toLocaleString()}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">${comment.text}</div>
        </div>
        <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${
							comment.isLiked ? '-active-like' : ''
						}"></button>
            </div>
        </div>
    `
	return commentElement
}

export function displayComments(comments) {
	const textInputElement = document.getElementById('text-input')
	const listElement = document.getElementById('list')
	listElement.innerHTML = ''
	comments.forEach(comment => {
		const commentElement = createCommentElement(comment)
		listElement.appendChild(commentElement)
	})
	initLikes()
	initComment(textInputElement)
}

export function addComment(name, text) {
	const nameInputElement = document.getElementById('name-input')
	const textInputElement = document.getElementById('text-input')
	const buttonElement = document.getElementById('add-button')
	buttonElement.disabled = true
	buttonElement.textContent = 'UPDATING...'
	if (!checkOnlineStatus()) {
		resetButton(buttonElement)
		return
	}
	postComment(name, text)
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

export function initializeComments() {
    const buttonElement = document.getElementById('add-button')
    const nameInputElement = document.getElementById('name-input')
    const textInputElement = document.getElementById('text-input')
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
}