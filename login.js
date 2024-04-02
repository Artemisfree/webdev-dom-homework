import { loginUser, setToken, token, userName } from "./api.js";
import { initializeComments } from './comment.js'

export const renderLogin = () => {
    const appElement = document.getElementById('app')
    const loginFormHTML = `
            <div id="login-form-container">
                <form id="login-form" class="login-form">
                    <input id="login-input" type="text" class="add-form-text" placeholder="Логин"/>
                    <input id="password-input" type="password" class="add-form-text" placeholder="Пароль"/>
                    <div class="add-form-row">
                        <button id="login-button" class="add-form-button">Войти</button>
                    </div>
                    <div id="error-message" style="color: red;"></div>
                </form>
            </div>`

	appElement.innerHTML = loginFormHTML

	const buttonElement = document.getElementById('login-button')
	const loginInputElement = document.getElementById('login-input')
	const passwordInputElement = document.getElementById('password-input')
    const errorMessageElement = document.getElementById('error-message')
    const loginForm = document.getElementById('login-form')

	buttonElement.addEventListener('click', event => {
		event.preventDefault()
		loginUser(loginInputElement.value, passwordInputElement.value).then(
			responseData => {
				setToken(responseData.user.token, responseData.user.name)
                loginForm.reset();
                hideLoginFormAndShowAddForm()
			}
        ).catch(error => {
            errorMessageElement.innerText = "Неверный логин или пароль. Попробуйте снова.";
            loginForm.reset();
        });
	})
};

const hideLoginFormAndShowAddForm = () => {
	const loginFormContainer = document.getElementById('login-form-container')
	if (loginFormContainer) {
		loginFormContainer.style.display = 'none'
	}
	const addForm = document.querySelector('.add-form')
    const addAll = document.querySelector('.comments')
	if (addForm) {
		addForm.style.display = 'flex'
        addAll.style.display = 'flex'
	}
    initializeComments();
}