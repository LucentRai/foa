const modalLogin = document.getElementById('modalLogin');
const modalSignUp = document.getElementById('modalSignUp');
const closeBtn = document.querySelectorAll('.btn-close');
const signUpBtn = document.getElementById('signup');
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logoutBtn');

/****************	FOR LOGIN AND SIGN UP MODAL *****************/
if(loginBtn && signUpBtn && closeBtn){
	loginBtn.addEventListener('click', e => {
		modalLogin.style.visibility = "visible";
	});
	
	signUpBtn.addEventListener('click', e => {
		modalSignUp.style.visibility = "visible";
	});
	
	closeBtn.forEach(element => {
		element.addEventListener('click', e => {
			modalSignUp.style.visibility = "hidden";
			modalLogin.style.visibility = "hidden";
		});
	});

	document.querySelector('#loginForm').addEventListener('submit', e => {
		e.preventDefault();
		const email = document.getElementById('loginEmail').value;
		const password = document.getElementById('loginPassword').value;
		login(email, password);
	});

	function showAlert(type, msg){
		hideAlert();
		const markup = `<div class="alert alert--${type}">${msg}</div>`;
		document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
		window.setTimeout(hideAlert, 5000);
	};

	function hideAlert(){
		const el = document.querySelector('.alert');
		if(el){
			el.parentElement.removeChild(el);
		}
	}
}

if(logoutBtn){
	logoutBtn.addEventListener('click', e => {
		logout();
	});
}

/**********************LOGIN FUNCTIONALITY **********************/
async function login(email, password) {
	try {
		const res = await axios({
			method: 'POST',
			url: 'http://localhost:8000/api/user/login',
			data: {
				email,
				password
			}
		});

		if(res.data.status === 'success'){
			location.assign('/');
		}
	}
	catch(err) {
		showAlert('error', error.response.data.message);
	}
}

async function logout(){
	try{
		const result = await axios({
			method: 'POST',
			url: 'http://localhost:8000/api/user/logout'
		});

		if(result.data.status === 'success'){
			location.reload(true); // if true is not passed browser may load the cache instead of reloading from server
		}
	}
	catch(error){
		showAlert('error', 'Error logging out. Try Again');
	}
};