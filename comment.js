export function commentData(commentElement) {
	const authorName = commentElement.querySelector('.comment-header > div:first-child').textContent;
	const commentText = commentElement.querySelector('.comment-text').textContent;

    return {
        authorName: authorName.trim(),
        commentText: commentText.trim(),
    }
}

export function escapeAndAddComment(nameInputElement, textInputElement, protector, addComment) {
	const escapedName = protector(nameInputElement.value)
	const escapedText = protector(textInputElement.value)
	addComment(escapedName, escapedText)
	nameInputElement.value = ''
	textInputElement.value = ''
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
    `
	return commentElement
}