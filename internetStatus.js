export function showLoading() {
	document.getElementById('loadingIndicator').style.display = 'block'
}

export function hideLoading() {
	document.getElementById('loadingIndicator').style.display = 'none'
}

export function checkOnlineStatus() {
	if (!navigator.onLine) {
		alert('Интернет пропал. Попробуй чуть позже.')
		return false
	}
	return true
}
