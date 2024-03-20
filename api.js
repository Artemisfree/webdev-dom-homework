export const personalKey = 'artem-nadtocheev'
const endpoint = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`

export function postComment(name, text) {
	return fetch(endpoint, {
		method: 'POST',
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
	return fetch(endpoint).then(response => {
		if (!response.ok) {
			throw new Error('Комменты не грузятся. Попробуй позже.')
		}
		return response.json()
	})
}
