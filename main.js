//https://docs.google.com/document/d/1ma8TwDGabJjIQK2LrJgVqKBrmGd56QGQyNa2WZ0_DwQ/edit
//https://ada-tp-js-2.surge.sh/
//https://tp-js-2-api-wjfqxquokl.now.sh/users

const tableBody = document.getElementById('body');
const newEmployee = document.getElementById('new_employee');
const modal = document.getElementById('modal');

let name = '';
let email = '';
let address = '';
let phone = '';


const printUsers = (result) => {
  let acumuladora = "";
  result.forEach(element => {
    acumuladora += `<tr class="large">
      <td>${element.fullname}</td>
      <td>${element.email}</td>
      <td>${element.address}</td>
      <td>${element.phone}</td>
      <td class="actions">
        <i class="fa fa-edit pencil" id="edit-${element.id}"></i>
        <i class="fa fa-trash trash" id="remove${element.id}"></i>
      </td>
    </tr>`
  });

  tableBody.innerHTML = `
    <tr class="small"> </tr>
    ${acumuladora}
    <tr class="small"> </tr>
    `;
};


const getUsers = () => {
  fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
    .then(data => data.json())
    .then(result => {
      printUsers(result)

    const editTool = document.getElementsByClassName("pencil");
    const removeTool = document.getElementsByClassName("trash");

    for (let i = 0; i <editTool.length; i++) {
      editTool[i].onclick = () => {
        const edit = editTool[i].id
        result.forEach(element => {
          if (element.id == edit.split('-')[1]) {
            modal.classList.remove('nomostrar')
            modalNewEmployee(element.fullname, element.email, element.address, element.phone)

            const save = document.getElementById('edit')

              save.onclick = () => {
                const name = document.getElementById("employee_name").value
                const email = document.getElementById("employee_email").value
                const address = document.getElementById("employee_address").value
                const phone = document.getElementById("employee_phone").value
                const newEmployee = {
                  fullname: name,
                  email: email,
                  address: address,
                  phone: phone,
                };


                fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${element.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newEmployee),
                })
                  .then(data => data.json())
                  .then(result => {
                    modal.classList.add('nomostrar')
                    getUsers();
                })
              }
            }
        })
      }
    }
    for (let i = 0; i < removeTool.length; i++) {
      removeTool[i].onclick = () => {
        const remove = removeTool[i].id
        fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${remove}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
          .then(dataDelete => dataDelete.json())
          .then(resultDelete => {
            fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
              .then(infoDelete => infoDelete.json())
              .then(resultadoDelete => {
                getUsers()
              })
          })
      }
    }
  })
}


getUsers();


const empleadoElegido = document.getElementById("filter");
empleadoElegido.onkeypress = e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users?search=${empleadoElegido.value}`)
      .then(data => data.json())
      .then(result => {
        printUsers(result)})
  }
}

const modalNewEmployee = (name = "", email = "", address = "", phone = "") => {
  modal.innerHTML = `
    <div>
      <h6>Add Employee</h6>
      <hr>
    </div>
    <form action="" method="get" class="modal-form">
      <label>Name</label><br>
        <input type="text" id="employee_name" maxlength="50" value=${name}><br>
      <label>Email</label><br>
        <input type="text" id="employee_email" value=${email}><br>
      <label>Address</label><br>
        <input type="text" name="Adress" id="employee_address" maxlength="60" rows="3" value=${address}><br> 
      <label>Phone</label><br>
        <input type="text" id="employee_phone" value=${phone}><br>
    </form>
    <div class="div-button">
      <button id="cancel">Cancel</button>
        ${name ? '<button id="edit">Save</button></div>' : '<button id="createNewEmployee">Add</button></div>'}
    `
    const cancel = document.getElementById("cancel");
      cancel.onclick = () => {
      modal.classList.add("nomostrar");
    }; 
};


newEmployee.onclick = () => {
  modalNewEmployee();
  modal.classList.remove("nomostrar");

  const crearEmpleado = document.getElementById("createNewEmployee")
  crearEmpleado.onclick = () => {      
    const fullnameNew = document.getElementById("employee_name").value;
    const emailNew = document.getElementById("employee_email").value;
    const addressNew = document.getElementById("employee_address").value;
    const phoneNew = document.getElementById("employee_phone").value;
    const createdEmployee = {
      fullname: fullnameNew,
      email: emailNew,
      address: addressNew,
      phone: phoneNew,
    }     
    
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createdEmployee)
      })
      .then(data => data.json())
      .then(result => {
    
      modal.classList.add("nomostrar")
      getUsers();
    })
  }     
};

