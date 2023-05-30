const userName = document.querySelector('.username-input')
const email = document.querySelector('.email-input')
const password = document.querySelector('.password-input')
const rePassword = document.querySelector('.re-password-input')
const gender = document.querySelector('.gender')
const age = document.querySelector('.birthday')
const singBtn = document.querySelector('.submit')
const cancelBtn = document.querySelector('.cancel')

const usernameErr = document.querySelector('.username-error')
const emailErr = document.querySelector('.emial-error')
const passwordErr = document.querySelector('.password-error')
const rePasswordErr = document.querySelector('.re-password-error')
const genderErr = document.querySelector('.gender-error')
const ageErr = document.querySelector('.birthday-error')

const imgSet = document.querySelector('.icon-img')
const ulList = document.querySelector('.list')
const listBox = document.querySelector('.user-list')

const userList = []
let count = 0

const checkUser = () => {
	if (userName.value === '') {
		usernameErr.classList.add('error-inh')
	} else if (userList.includes(userName.value)) {
		usernameErr.classList.add('error-inh')
		usernameErr.textContent = 'Username is alredy taken'
	} else if (userName.value !== '' && !userList.includes(userName.value)) {
		usernameErr.classList.remove('error-inh')
	}
}

const closeList = () => {
	if(userList.length === 0){
		listBox.classList.remove('user-vis')

	}
	
}

const checkUserList = () => {
	if (userList.length >= 5) {
		listBox.style.overflowY = 'scroll'
		listBox.style.width = '26em'
	} else {
		listBox.style.overflowY = 'hidden'
		listBox.style.width = '25em'
	}
}

const checkAge = () => {
	if (age.value === '') {
		ageErr.classList.add('error-inh')
	} else {
		ageErr.classList.remove('error-inh')
	}
}

const checkEmail = () => {
	let mail = email.value

	const emailReg =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (mail !== '' && mail.match(emailReg)) {
		emailErr.classList.remove('error-inh')
	} else {
		emailErr.classList.add('error-inh')
	}
}

const checkPassword = () => {
	const number = /[0-9]/g
	const uppLetters = /[A-Z]/g
	const specialNum = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/g
	const matchNum = password.value.match(number)
	const matchLett = password.value.match(uppLetters)
	const matchSpecial = password.value.match(specialNum)
	const passLength = password.value.length

	if (passLength > 6 && matchNum && matchLett && matchSpecial) {
		passwordErr.classList.add('error-inh')
		passwordErr.textContent = 'Pasword is Giga Chad'
	} else if (
		(passLength > 6 && matchNum && matchLett) ||
		(passLength > 6 && matchNum && matchSpecial) ||
		(passLength > 6 && matchLett && matchSpecial)
	) {
		passwordErr.classList.add('error-inh')
		passwordErr.textContent = 'Pasword is Stronk'
	} else if ((passLength > 6 && matchNum) || (passLength > 6 && matchLett) || (passLength > 6 && matchSpecial)) {
		passwordErr.classList.add('error-inh')
		passwordErr.textContent = 'Pasword is MIDioker'
	} else if (passLength > 6) {
		passwordErr.classList.add('error-inh')
		passwordErr.textContent = 'Pasword is week'
	} else if (passLength > 1 && passLength < 5) {
		passwordErr.classList.add('error-inh')
		passwordErr.textContent = 'Pasword is too $hort'
	} else {
		passwordErr.classList.add('error-inh')
		passwordErr.textContent = 'Add a password!'
	}
}

const checkPassIsTheSame = () => {
	console.log(rePassword.value)
	console.log(password.value)
	if (password.value === rePassword.value) {
		rePasswordErr.classList.add('error-inh')
		rePasswordErr.textContent = "Password's  match!"
	} else {
		rePasswordErr.classList.add('error-inh')
	}
}

const setImg = () => {
	if (gender.value == 0) {
		genderErr.classList.add('error-inh')
	} else if (gender.value == 1) {
		genderErr.classList.remove('error-inh')
		return './img/male-user.png'
	} else if (gender.value == 2) {
		genderErr.classList.remove('error-inh')
		return './img/female-user.png'
	}
}

const handleBirthday = () => {
	const userInput = age.value
	const userDate = new Date(userInput)
	let month = Date.now() - userDate.getTime()
	let uAge = new Date(month)
	let year = uAge.getUTCFullYear()
	let calc = Math.abs(year - 1970)

	return calc
}

const handleCancel = () => {
	userName.value = ''
	email.value = ''
	password.value = ''
	rePassword.value = ''
	gender.value = 0
	age.value = 0
	usernameErr.classList.remove('error-inh')
	emailErr.classList.remove('error-inh')
	passwordErr.classList.remove('error-inh')
	rePasswordErr.classList.remove('error-inh')
	genderErr.classList.remove('error-inh')
}


const userTemp = (params) => {
	
	return` <img src="${setImg()}" alt="user icon" class="icon-img">
    <div class="tools"><i class="fa-solid fa-xmark"></i></div>
    <p class="user-data user-username"><b>User:</b>${userName.value}</p>
    <p class="user-data user-emial"><b>E-mail:</b>${email.value}</p>
    <p class="user-data user-password"><b>Password:</b>${password.value}</p>
    <p class="user-data user-age"><b>Age:</b> ${handleBirthday()}</p>`
	
}



const remove = (params) => {
	const xRemove = document.querySelectorAll('.fa-xmark')
	
	xRemove.forEach(el => {

		const elementID = el.parentElement.closest('.user-box').id

		console.log(elementID);
		el.addEventListener('click', () => {
			el.parentElement.parentElement.remove()
				const index = userList.indexOf(elementID)
		        const x = userList.splice(index, 1)

			closeList()
		})		
	})		
}




const createUser = () => {
	let newLi = document.createElement('li')
	ulList.appendChild(newLi)
	let userBox = document.createElement('div')
	userBox.id = '' + count++
	userBox.classList.add('user-box')
	newLi.appendChild(userBox)
	

	userBox.insertAdjacentHTML("beforeend", userTemp())


	userList.push(userBox.id)
	remove()
	

}

const handleAccountCreation = params => {
	checkUser()
	setImg()
	checkEmail()
	checkPassword()
	checkAge()

	if (
		userName.value !== '' &&
		email.value !== '' &&
		password.value.length >= 5 &&
		rePassword.value !== '' &&
		gender.value !== 0 &&
		!userList.includes(userName.value)
	) {
		createUser()
		listBox.classList.add('user-vis')
		checkUserList()
	}
}

singBtn.addEventListener('click', handleAccountCreation)
cancelBtn.addEventListener('click', handleCancel)
email.addEventListener('keyup', checkEmail)
password.addEventListener('keyup', checkPassword)
rePassword.addEventListener('keyup', checkPassIsTheSame)
gender.addEventListener('select', setImg)
userName.addEventListener('keyup', checkUser)
gender.addEventListener('change', setImg)
age.addEventListener('change', checkAge)


