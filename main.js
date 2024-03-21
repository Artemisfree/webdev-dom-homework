;('use strict')
import { commentsApi, isUserAuth } from './api.js'
import { showLoading, hideLoading, checkOnlineStatus } from './internetStatus.js'
import { displayComments, initializeComments } from './comment.js'
import { renderLogin } from './login.js'

export function fetchComments() {
	showLoading()

	if (!checkOnlineStatus()) {
		hideLoading()
		return
	}
	commentsApi()
		.then(data => {
			displayComments(data.comments)
		})
		.catch(error => {
			alert('Произошла ошибка соединения. Проверь интернет соединение!')
		})
		.finally(() => {
			hideLoading()
		})
}

document.addEventListener('DOMContentLoaded', event => {
	fetchComments();
	initializeComments();


    const addForm = document.querySelector('.add-form')
	const loginLink = document.querySelector('a[href="login.html"]')
    const addAll = document.querySelector('.comments')
    if (!isUserAuth()) {
		addForm.style.display = 'none'
		if (loginLink) {
			loginLink.addEventListener('click', e => {
				e.preventDefault()
				renderLogin()
				loginLink.remove()
			})
		} else {
			const authMessage = document.createElement('p')
			authMessage.innerHTML = 'Чтобы добавить комментарий, <a href="login.html">авторизуйтесь</a>.'
			authMessage.querySelector('a').addEventListener('click', e => {
				addAll.style.display = 'none'
                e.preventDefault()
				renderLogin()
				authMessage.remove()
			})
			addForm.parentNode.appendChild(authMessage)
		}
	}
})

console.log('It works!')
