let users = [
    {
        id: 1,
        name: "Ali",
        lastname: "Akbari",
        age: 27
    },
];

$.each(users, function (i, user) {
    appendToUsrTable(user);
});

$("form").submit(function (e) {
    e.preventDefault();
});

$("form#addUser").submit(function () {
    let user = {};
    let nameInput = $('input[name="name"]').val().trim();
    let lastnameInput = $('input[name="lastname"]').val().trim();
    let ageInput = $('input[name="age"]').val().trim();
    if (nameInput && lastnameInput && ageInput) {
        $(this).serializeArray().map(function (data) {
            user[data.name] = data.value;
        });
        let lastUser = users[Object.keys(users).sort().pop()];
        user.id = lastUser.id + 1;

        addUser(user);
    } else {
        alert("All fields must have a valid value.");
    }
});

function addUser(user) {
    users.push(user);
    appendToUsrTable(user);
}

function editUser(id) {
    users.forEach(function (user, i) {
        if (user.id == id) {
            $(".modal-body").empty().append(`
                  <form id="updateUser" action="">
                      <label for="name">Name</label>
                      <input class="form-control" type="text" name="name" value="${user.name}"/>
                      <label for="lastname">LastName</label>
                      <input class="form-control" type="text" name="lastname" value="${user.lastname}"/>
                      <label for="age">Age</label>
                      <input class="form-control" type="number" name="age" value="${user.age}" min=10 max=100/>
              `);
            $(".modal-footer").empty().append(`
                      <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </form>
              `);
        }
    });
}

function deleteUser(id) {
    let action = confirm("Are you sure you want to delete this user?");
    users.forEach(function (user, i) {
        if (user.id == id && action != false) {
            users.splice(i, 1);
            $("#userTable #user-" + user.id).remove();
        }
    });
}

function updateUser(id) {
    let user = {};
    user.id = id;
    users.forEach(function (user, i) {
        if (user.id == id) {
            $("#updateUser").children("input").each(function () {
                let value = $(this).val();
                let attr = $(this).attr("name");
                if (attr == "name") {
                    user.name = value;
                } else if (attr == "lastname") {
                    user.lastname = value;
                } else if (attr == "age") {
                    user.age = value;
                }
            });
            users.splice(i, 1);
            users.splice(user.id - 1, 0, user);
            $("#userTable #user-" + user.id).children(".userData").each(function () {
                let attr = $(this).attr("name");
                if (attr == "name") {
                    $(this).text(user.name);
                } else if (attr == "lastname") {
                    $(this).text(user.lastname);
                } else {
                    $(this).text(user.age);
                }
            });
            
        }
    });
}



function appendToUsrTable(user) {
    $("#userTable > tbody:last-child").append(`
          <tr id="user-${user.id}">
              <td class="userData" name="name">${user.name}</td>
              '<td class="userData" name="lastname">${user.lastname}</td>
              '<td id="tdAge" class="userData" name="age">${user.age}</td>
              '<td align="center">
                  <button class="btn btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
              </td>
              <td align="center">
                  <button class="btn btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
              </td>
          </tr>
      `);
}
