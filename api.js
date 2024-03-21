export const personalKey = 'artem-nadtocheev'
const commentsUrl = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`
const userUrl = `https://wedev-api.sky.pro/api/user/login`
export let token;

export const setToken = (newToken) => {
    token = newToken;
}

export function postComment(name, text) {
	return fetch(commentsUrl, {
		method: 'POST',
        headers: { authorization: `Bearer ${token}` },
		body: JSON.stringify({ name, text }),
	}).then(response => {
		if (!response.ok) {
			if (response.status >= 500) {
				throw new Error('Ошибка сервера. Попробуй позже.')
			} else if (response.status === 400) {
				throw new Error('Некорректный запрос. Проверь введенные данные.')
			} else {
				throw new Error('Неизвестная ошибка. Попробуй позже.')
			}
		}
		return response.json()
	})
}

export function commentsApi() {
	return fetch(commentsUrl).then(response => {
		if (!response.ok) {
			throw new Error('Комменты не грузятся. Попробуй позже.')
		}
		return response.json()
	})
}

export function loginUser(login, password) {
	return fetch(userUrl, {
		method: 'POST',
		body: JSON.stringify({ login, password }),
	}).then(response => {
		if (!response.ok) {
			if (response.status >= 500) {
				throw new Error('Ошибка сервера. Попробуй позже.')
			} else if (response.status === 400) {
				throw new Error('Некорректный запрос. Проверь введенные данные.')
			} else {
				throw new Error('Неизвестная ошибка. Попробуй позже.')
			}
		}
		return response.json()
	})
}

export function isUserAuth() {
    return token !== undefined && token !== '';
}