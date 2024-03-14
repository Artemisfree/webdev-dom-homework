export function protector(str) {
	return str.replace(/[&<>"']/g, function (match) {
		switch (match) {
			case '&':
				return '&amp;'
			case '<':
				return '&lt;'
			case '>':
				return '&gt;'
			case '"':
				return '&quot;'
			case "'":
				return '&#39;'
		}
	})
}


export function createCommentElement(comment) {
	const commentElement = document.createElement('li')
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
    `;
    return commentElement;
}


export function isLike(button) {
    const likesCounter = button.previousElementSibling;
    let currentLikes = parseInt(likesCounter.textContent);
    if (!isNaN(currentLikes)) {
    	if (button.classList.contains('-active-like')) {
    		button.classList.remove('-active-like');
    		currentLikes -= 1;
    	} else {
    		button.classList.add('-active-like');
    		currentLikes += 1;
    	}
    	likesCounter.textContent = currentLikes
    } else {
    	console.error('Current likes value is NaN');
    }
}