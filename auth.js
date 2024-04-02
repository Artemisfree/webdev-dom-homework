import { isUserAuth } from './api.js'
import { renderLogin } from './login.js'

export function initAuth() {
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
			authMessage.innerHTML =
				'Чтобы добавить комментарий, <a href="login.html">авторизуйтесь</a>.'
			authMessage.querySelector('a').addEventListener('click', e => {
				addAll.style.display = 'none'
				e.preventDefault()
				renderLogin()
				authMessage.remove()
			})
			addForm.parentNode.appendChild(authMessage)
		}
	}
}
