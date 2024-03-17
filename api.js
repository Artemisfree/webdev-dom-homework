export const personalKey = 'artem-nadtocheev'

export function postComment(name, text, personalKey) {
	return fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
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

export function commentsApi(personalKey) {
	return fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`).then(
		response => {
			if (!response.ok) {
				throw new Error('Комменты не грузятся. Попробуй позже.')
			}
			return response.json()
		}
	)
}
