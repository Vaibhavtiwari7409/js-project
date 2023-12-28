const userNameTextField = document.getElementById('username')
const addUserBtn = document.getElementById('addUser')
// data set
const recordsDisplay = document.getElementById('records')

// 
let edit_id = null;

//store data object
let userArray = []

//localstorage data get
let objstr = localStorage.getItem('users')
//console.log(objstr)

if (objstr != null) {
	userArray = JSON.parse(objstr) //string convert object
}
// console.log(userArray)
displayData()




addUserBtn.onclick = () => {
	const name = userNameTextField.value
	//alert(name)
	if (edit_id != null) {
		userArray.splice(edit_id, 1, {
			'name': name
		})
		edit_id = null;
	}
	else {
		// data push object
		userArray.push({ 'name': name })
		// console.log(userArray)
	}

	saveData(userArray)
	userNameTextField.value = ''

}
function saveData(userArray) {
	let str = JSON.stringify(userArray) //string
	//console.log(str)
	localStorage.setItem('users', str)  //string formate
	displayData()
}


function displayData() {
	let data = ''
	userArray.forEach((user, i) => {
		// console.log(i)
		data += `<tr>
		     <td>${i + 1}</td>
		     <td>${user.name}</td>
		     <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i>
			  <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
		     </tr>`;
	})
	// console.log(data)
	recordsDisplay.innerHTML = data;

}

function EditInfo(id) {
	// alert(id)
	edit_id = id
	userNameTextField.value = userArray[id].name
}

function DeleteInfo(id) {
	userArray.splice(id, 1)
	saveData(userArray)
}