
let ul = document.querySelector('ul');
let add = document.querySelector('form button');
add.addEventListener('click', e => {
    // 預設值
    e.preventDefault();

    // 定義變數
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;

    // 篩選變數
    if (todoText === '') {
        alert('Please Enter some Text.');
        return;
    }else if ((todoMonth > 12) || (todoMonth <= 0) || (todoMonth === '')){
        alert('輸入正確月份');
        return;
    }else if ((todoDate > 31) || (todoDate <= 0) || (todoDate === '')) {
        alert('輸入正確日期');
        return;
    }

    // 新增 li
    let list = document.createElement('li');
    list.classList.add('todo-answer');

    // 新增 p 段落
    let answer = document.createElement('p');
    answer.classList.add('answer');
    answer.innerText = todoText + ' ' + todoMonth + '/' + todoDate;
    
    // 加入 ul > li > p
    ul.appendChild(list);
    list.appendChild(answer);

    //  新增 確認鍵
    let check = document.createElement('button');
    check.classList.add('check');
    check.innerHTML = '<i class="fa-solid fa-check"></i>';
    check.addEventListener('click', e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle('done');
    })

    // 新增 垃圾桶
    let trash = document.createElement('button');
    trash.classList.add('trash');
    trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trash.addEventListener('click', e => {
        let todoItem = e.target.parentElement;
        // 動畫結束時 remove
        todoItem.addEventListener('animationend', () => {
            
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem('Data'));
            myListArray.forEach((item, index) => {
                if ((item.todoText + ' ' + item.todoMonth + '/' + item.todoDate)  == text) {
                    myListArray.splice(index, 1);
                    localStorage.setItem('Data', JSON.stringify(myListArray));
                }
            })

            todoItem.remove();
        })
        // 垃圾桶動畫
        todoItem.style.animation = 'scaleDown 0.3s forwards';
    })

    // 加入列表
    list.appendChild(check);
    list.appendChild(trash);

    // li 動畫
    list.style.animation = 'scaleUp 0.5s forwards';


    // 加入 localStorage 
    let todoData = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate,
    }
    let myList = localStorage.getItem('Data');
    if (myList == null) {
        localStorage.setItem('Data', JSON.stringify([todoData]));
    } else {
        let todoDataArray = JSON.parse(myList);
        todoDataArray.push(todoData);
        localStorage.setItem('Data', JSON.stringify(todoDataArray));
    }
    console.log(JSON.parse(localStorage.getItem('Data')));



    // 每次輸入完回歸空值
    form.children[0].value = '';
    form.children[1].value = '';
    form.children[2].value = '';
})












let myData = localStorage.getItem('Data');
if (myData !== null) {
    let myDataArray = JSON.parse(myData);
    myDataArray.forEach(item => {


    // 新增 li
    let list = document.createElement('li');
    list.classList.add('todo-answer');

    // 新增 p 段落
    let answer = document.createElement('p');
    answer.classList.add('answer');
    answer.innerText = item.todoText + ' ' + item.todoMonth + '/' + item.todoDate;
    
    // 加入 ul > li > p
    ul.appendChild(list);
    list.appendChild(answer);

    //  新增 確認鍵
    let check = document.createElement('button');
    check.classList.add('check');
    check.innerHTML = '<i class="fa-solid fa-check"></i>';
    check.addEventListener('click', e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle('done');
    })

    // 新增 垃圾桶
    let trash = document.createElement('button');
    trash.classList.add('trash');
    trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trash.addEventListener('click', e => {
        let todoItem = e.target.parentElement;
        // 動畫結束時 remove
        todoItem.addEventListener('animationend', () => {

            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem('Data'));
            myListArray.forEach((item, index) => {
                if ((item.todoText + ' ' + item.todoMonth + '/' + item.todoDate)  == text) {
                    myListArray.splice(index, 1);
                    localStorage.setItem('Data', JSON.stringify(myListArray));
                }
            })

            todoItem.remove();
        })
        // 垃圾桶動畫
        todoItem.style.animation = 'scaleDown 0.3s forwards';
    })

    // 加入列表
    list.appendChild(check);
    list.appendChild(trash);
    })
}