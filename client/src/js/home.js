const modalLogin = document.getElementById('modalLogin');
const modalSignUp = document.getElementById('modalSignUp');
const closeBtn = document.querySelectorAll('.btn-close');
const signUpBtn = document.querySelector('#signup');
const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', e => {
	modalLogin.style.visibility = "visible";
});

signUpBtn.addEventListener('click', e => {
	modalSignUp.style.visibility = "visible";
});

// closeBtn.addEventListener('click', e => {
// 	modalSignUp.style.visibility = "hidden";
// });

closeBtn.forEach(element => {
	element.addEventListener('click', e => {
	modalSignUp.style.visibility = "hidden";
	modalLogin.style.visibility = "hidden";
});
});