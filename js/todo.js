const todo = document.querySelector("#todo")
let todoList = [
    {
        idx: 0,
        name: '일어나기'
    },
    {
        idx: 1,
        name: '커피 마시기'
    }
]
todo.innerHTML = todoList.map((todo) => {
    return `<li class="item" draggable="true" idx=${todo.idx}>${todo.name}</li>`
})

const liItems = document.getElementsByClassName("item")

for(let item of liItems) {
    item.ondragstart = dragStart
    item.ondragover = dragOver
    item.ondrop = drop
}

let curIdx = null

function dragStart (e) {
    console.log('드래그 시작');
    curIdx = Number(this.getAttribute("idx"))           
    console.log('data', this.innerHTML)
    e.dataTransfer.setData('data', this.innerHTML);
    e.dataTransfer.dropEffect = 'copy';
}

function dragOver(e) {
    e.preventDefault(); // 필수
    console.log('무언가 위에 올려져 있습니다');
    e.dataTransfer.dropEffect = 'move';
};
function drop(e) {
    console.log('e', e)
    console.log('무언가 드롭되었습니다.');
    console.log('this.innerHTML', this.innerHTML)

    let droppedIdx = Number(this.getAttribute("idx"))           
    if(curIdx === droppedIdx) {
        alert('같은 데이터')
    }
    else {
        let temp = todoList[droppedIdx]
        console.log('temp', temp)
        todoList[droppedIdx] = todoList[curIdx]
        console.log('temp', temp)
        todoList[curIdx] = temp
        console.log('todoList', todoList)
        todo.innerHTML = todoList.map((todo) => {
            return `<li class="item" draggable="true" idx=${todo.idx}>${todo.name}</li>`
        })
        todoList.forEach((val, idx) => val.idx = idx)
        const liItems = document.getElementsByClassName("item")

        for(let item of liItems) {
            item.ondragstart = dragStart
            item.ondragover = dragOver
            item.ondrop = drop
        }

        curIdx = null                            
    }
    // alert(e.dataTransfer.getData('data'));
}
