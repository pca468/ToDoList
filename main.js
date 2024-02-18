// 유저가 값을 입력한다.
// + 번튼을 클릭하면, 할 일이 추가된다.
// delete 번튼을 클릭하면 할 일이 삭제된다.
// check버튼을 누르면, 할 일이 끝나면서 밑줄을 친다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
console.log(taskInput)
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode ='all'
let filterList = []

let horizontalUnderLine = document.getElementById("under-line");

taskInput.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        addTask(event);
    }
});

tabs.forEach((menu => 
    menu.addEventListener("click", (e) => horizontalIndicator(e)))
    );

function horizontalIndicator (e) {
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderLine.style.top = 
    e.currentTarget.offsetTop + (e.currentTarget.offsetHeight -4) +"px";
}


addButton.addEventListener("click",addTask)

for(let i = 1;i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    })
}
console.log(tabs);

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete : false,
    };

    taskList.push(task);
    taskInput.value = ""
    render();
}

function render() {
    // 1. 내가 선택한 탭에 따라서
    let list = []
    if(mode === "all"){
        list = taskList;
    } else if (mode === "ongoing" || mode === "done"){
        list = filterList
    } 
        // done filterList
    // 2. 리스트를 달리 보여준다.
    // all taskList
    // ongoing, done filterList
    let resultHTML = "";
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class= "task-done">${list[i].taskContent}</div>
            <div>
                <button onclick= "toggleComplete('${list[i].id}')">Check</button>
                <button onclick= "deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick= "toggleComplete('${list[i].id}')">Check</button>
            <button onclick= "deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
    }
        }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id) {
    // for(let i =0; i < taskList.length; i++){
    //     if(taskList[i].id == id) {
    //         taskList.splice(i,1)
    //         filterList = filterList.filter(task => task.id !== id);
    //         break;
    //     }
    //     render();
    // }
    filterList = filterList.filter(task => task.id !== id);
    render();
    console.log("삭제하자", id)
    console.log(taskList)
}

function filter(event){
    mode = event.target.id
    filterList = []

    if(mode === "all"){
        // 전체 리스트를 보여준다.
        render();

    } else if(mode === "ongoing"){
        // 진행중인 아이템을 보여준다.
        // task.isComplete = false
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
        console.log("진행중", filterList)
        
    } else if(mode === "done"){
        // 끝나는 케이스
        // task.isComplete = true
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
};
