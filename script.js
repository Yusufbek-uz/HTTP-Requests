const btn = document.getElementById("btn");
const name = document.getElementById("name");
const num = document.getElementById("number");
const age = document.getElementById("age");
const box = document.getElementById("todo");
let editMode = false;
let editId = null;


async function fetchU() {
    const response = await fetch('https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/user');
    const data = await response.json();
    display(data);
    console.log(data);
}

async function deleteUser(id) {
    try {
        const response = await fetch(`https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/user/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`User with ID ${id} deleted`);
            fetchU();
        } else {
            console.error(`Failed to delete user with ID ${id}`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

async function addUser(name, tel) {
    try {
        const response = await fetch('https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                tel: tel,
                age: age.value,
            }),
        });

        if (response.ok) {
            const newUser = await response.json();
            console.log('New user added:', newUser);
            fetchU(); // Refresh the list after adding
        } else {
            console.error('Failed to add user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

async function editUser(id, name, tel) {
    try {
        const response = await fetch(`https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                tel: tel,
            }),
        });

        if (response.ok) {
            console.log(`User with ID ${id} updated`);
            fetchU();
        } else {
            console.error('Failed to update user with ID', id);
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

function display(data) {
    const cont = document.getElementById('todu');
    cont.innerHTML = '';
    data.forEach(e => {
        const box = document.createElement('div');
        box.className = 'todo';

        function formatPhoneNumber(phoneNumber) {
            const phoneStr = phoneNumber.toString();
            return phoneStr.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');
        }
        const formattedNumber = formatPhoneNumber(e.tel);

        box.innerHTML = `
            <div class="todu">
                <img src="./img/Ellipse 21.png" alt="profil">
                <p id="p">Age: ${e.age}</p>
                <div class="todu-all">
                    <div class="names">
                        <h1>${e.name}</h1>
                        <h3>+998 ${formattedNumber}</h3>
                        <a href="${e.git}">GitHub: Git</a>
                    </div>
                    <div class="edits">
                        <button class="edit" data-id="${e.id}" data-name="${e.name}" data-tel="${e.tel}">
                            <i class="fa-solid fa-pen-to-square" style="color: green;"></i>
                        </button>
                        <button class="delete" data-id="${e.id}">
                            <i class="fa-solid fa-delete-left" style="color: red;"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        cont.appendChild(box);
    });

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            deleteUser(id);
        });
    });

    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const userName = button.getAttribute('data-name');
            const userTel = button.getAttribute('data-tel');

            name.value = userName;
            num.value = userTel;
            editMode = true;
            editId = id;
            btn.textContent = 'Save';
        });
    });
}

btn.addEventListener('click', () => {
    const userName = name.value.trim();
    const userTel = num.value.trim();

    if (userName && userTel) {
        if (editMode) {
            editUser(editId, userName, userTel);
            editMode = false;
            editId = null;
            age = null
            btn.textContent = 'Add';
        } else {
            addUser(userName, userTel);
        }
        name.value = '';
        num.value = '';
    } else {
        alert('Iltimos malumot qiriting !!');
    }
});

fetchU();