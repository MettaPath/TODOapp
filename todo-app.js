(function () {

    let arrayLocal = [];

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control', 'mr-3');
        input.placeholder = 'Enter the name of the new case';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Add new case';
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        button.setAttribute('disabled', 'disabled');

        input.addEventListener('input', enabledBtn);
        function enabledBtn() {
            if (input.value.length > 0) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
            }
        };

        return {
            form,
            input,
            button
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    };

    function createTodoItem(nameOfCase) {
        let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

        let idRandom = Math.floor(Math.random() * 1000);
        item.id = idRandom;


    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = nameOfCase;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success', 'mr-2');
    doneButton.textContent = 'Done';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';


    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
        item,
        doneButton,
        deleteButton,
        buttonGroup,
    }
}
    function changeStatus(arr, item) {
        arr.map(object => {
            if (object.id === item.id && object.done === false) {
                object.done = true;
            } else if (object.id === item.id && object.done === true){
                object.done = false;
            }
        });
}
    function finishTodoItem(item, btn) {
        btn.addEventListener('click', function () {
            arrayLocal = JSON.parse(localStorage.getItem(key));
            changeStatus(arrayLocal, item);
            localStorage.setItem(key, JSON.stringify(arrayLocal));
        item.classList.toggle('list-group-item-success');
        });
    }
    function deleteTodoItem(item, btn) {
        btn.addEventListener('click', function () {
            if (confirm('Are you sure?')) {
                item.remove();
                arrayLocal = JSON.parse(localStorage.getItem(key));
                const newItems = arrayLocal.filter(object => object.id !== item.id);
                localStorage.setItem(key, JSON.stringify(newItems));
            }
        });
    }
    function createTodoApp(container, title = 'Todo list', key, deafultItems = []) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

      const storageArr = JSON.parse(localStorage.getItem(key));
      if (localStorage.getItem(key) === null || storageArr.length === 0) {
        console.log(localStorage.getItem(key) !== null);
        for (let i of deafultItems) {
          let defItem = createTodoItem(i.name);
          todoList.append(defItem.item);
          if (i.done === true) {
            defItem.item.classList.toggle('list-group-item-success');
          }
          defItem.doneButton.addEventListener('click', function () {
            defItem.item.classList.toggle('list-group-item-success');
          });
          defItem.deleteButton.addEventListener('click', function () {
            if (confirm('Are you sure?')) {
              defItem.item.remove();
            }
          });
        }
      }
        if (localStorage.getItem(key)) {
            arrayLocal = JSON.parse(localStorage.getItem(key));
            for (let object of arrayLocal) {
                let todoItem = createTodoItem(todoItemForm.input.value);
                todoItem.item.textContent = object.name;
                todoItem.item.id = object.id;
                if (object.done === true) {
                todoItem.item.classList.add('list-group-item-success');
                } else {
                todoItem.item.classList.remove('list-group-item-success');
                }
                finishTodoItem(todoItem.item, todoItem.doneButton);
                deleteTodoItem(todoItem.item, todoItem.deleteButton);
                todoList.append(todoItem.item);
                todoItem.item.append(todoItem.buttonGroup);
            }
        }

        todoItemForm.form.addEventListener('submit', function (e) {

            e.preventDefault();
            if (!todoItemForm.input.value) {
                return;
            };
            let todoItem = createTodoItem(todoItemForm.input.value);

            finishTodoItem(todoItem.item, todoItem.doneButton);

            deleteTodoItem(todoItem.item, todoItem.deleteButton);

            let LocStorageData = localStorage.getItem(key);

            if (LocStorageData === null) {
                arrayLocal = [];
            } else {
                arrayLocal = JSON.parse(LocStorageData);
            }

            function createObjForArr() {
                const itemObj = {};
                itemObj.name = todoItemForm.input.value;
                itemObj.done = false;
                itemObj.id = todoItem.item.id;
                arrayLocal.push(itemObj);
            }
            createObjForArr();
            localStorage.setItem(key, JSON.stringify(arrayLocal));

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
            todoItemForm.button.setAttribute('disabled', 'disabled');
        });
    }
    window.createTodoApp = createTodoApp;
})();
