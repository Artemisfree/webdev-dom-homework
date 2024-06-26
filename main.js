('use strict');
import { commentsApi } from './api.js'
import { showLoading, hideLoading, checkOnlineStatus } from './internetStatus.js'
import { displayComments, initializeComments } from './comment.js'
import { initAuth } from './auth.js';

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
    initAuth();
})

console.log('It works!')
