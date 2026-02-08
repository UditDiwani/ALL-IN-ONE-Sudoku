const API_URL = "http://127.0.0.1:3000/api";

// Check if user is logged in
// if (!localStorage.getItem("userId")) {
//   window.location.href = "./UserSetUp.html";
// }

let puzzleref;
let history = [];
let hist_pointer = -1;
const input_buttons = document.querySelectorAll(".input_buttons button");
let player;
let seconds=0;
let mistakes_div=document.querySelector('.Mistakes');
setInterval(() => {
    seconds+=1;
    let minutes=Math.floor(seconds/60);
    let hours=Math.floor(minutes/60);
    document.querySelector('.Timer').textContent=`${hours} : ${minutes} : ${seconds%60}`
}, 1000);
function selectBox(button){
    if( button.style.border=="3px solid rgb(0, 0, 0)"){
        button.style.border = "3px solid rgb(255, 0, 0)";
    }
    else{
        button.style.border="3px solid rgb(0, 0, 0)";
    }
    let index=cells2.indexOf(button);
    let tr_index=Math.floor(index/9);
    let td_index=index%9;
    document.querySelectorAll(`td:nth-child(${td_index+1}) button`).forEach(ele => {ele.style.backgroundColor="#2f9d96ff"});
    document.querySelectorAll(`tr:nth-child(${tr_index+1}) td button`).forEach(ele => {ele.style.backgroundColor="#2f9d96ff"});

}
document.querySelectorAll('.cell').forEach(btn => {
    btn.addEventListener('click', function() {
        turnAllBlack();
        HightlightAllNums(btn);
        selectBox(btn);

    });
});

let cells2=Array.from(document.querySelectorAll('.cell'));

function turnAllBlack(){
    document.querySelectorAll('.cell').forEach(btn =>{
        btn.style.border = "3px solid rgb(0, 0, 0)";
        btn.style.backgroundColor="#00ffee";
    })
    
}
let mistakes=0;
input_buttons.forEach(btn => {
    let button_ref;
    btn.addEventListener('click',function(){
        HightlightAllNums(btn);
        document.querySelectorAll('.cell').forEach(btn1 =>{
            if(btn1.style.border=="3px solid rgb(255, 0, 0)"){
                button_ref=btn1;
                if(btn.textContent == "↶"){
                    console.log("Undo");
                    Revert();   
                }
                
                else{
                    if(btn1.style.fontWeight!="900"){
                        if(btn1.textContent=='' || history.some(subarray => subarray.includes(btn1))==false){
                            history.push([btn1,btn1.textContent]);
                            hist_pointer=hist_pointer+1;
    
                        }
                        btn1.textContent = `${btn.childNodes[1].nodeValue}`;
                        history.push([btn1,btn1.textContent]);
                        hist_pointer=hist_pointer+1;
                    }
                    if(history[hist_pointer][0]===history[hist_pointer-1][0] && history[hist_pointer][1]===history[hist_pointer-1][1]){
                        console.log('not appended');
                        console.log('history : ',history)
                        history.pop();
                        hist_pointer-=1;
                    }
                }
            }
            
        });
        validateBoard();
        if(button_ref.style.color=="rgb(255, 0, 0)"){
            mistakes+=1;
        }
        if(mistakes>2){
            deleteProgress();
        }
        mistakes_div.childNodes[0].textContent=`Mistakes : ${mistakes}`;
    })

});

let board=[];
window.onload = function(){
    loadSudoku();
}
window.onclose = function(){
    SaveProgress();
}
function pattern(r,c){
    return (3 * (r%3) + Math.floor(r/3) + c ) % 9
}
function shuffle(list_array){
    let list = [];
    list_array.forEach(ele=>{
        list.push(ele);
    });
    for(let i=list.length-1;i>0;i--){
        j = Math.floor(Math.random() *(i+1));
        let temp = list[i];
        list[i]=list[j];
        list[j]=temp;
    }
    return list
}
function generateBoard(rows1,cols1,Nums){
    let board1 = [];
    rows1.forEach(r => {
        let current_row =[];
        cols1.forEach(c => {
            let index = pattern(r,c);
            let value = Nums[index];
            current_row.push(value);
        });
        board1.push(current_row);
    });
    console.log(board1);
    return board1;
}
function validateBoard(){
    const inp_button_counter = {
        "1":0,
        "2":0,
        "3":0,
        "4":0,
        "5":0,
        "6":0,
        "7":0,
        "8":0,
        "9":0
    }
    let inp_child = document.querySelectorAll(".input_buttons button .num");
    let cells1 = document.querySelectorAll('.cell');
    let cell_pointer1 = 0;
    let count=0;
    for(let i=0;i<9;i++){
        inp_child[`${i}`].textContent = 9;
        inp_child[`${i}`].style.fontWeight = "900";
    }
    
    for(let r=0;r<9;r++){
        for(let c =0;c<9;c++){
            if(cells1[cell_pointer1].textContent != `${puzzleref[r][c]}`){
                cells1[cell_pointer1].style.color="rgb(255, 0, 0)";
            }
            else{
                cells1[cell_pointer1].style.color="rgb(0, 0, 0)";
                if(cells1[cell_pointer1].textContent!=""){
                    let number=Number(cells1[cell_pointer1].textContent);
                    inp_button_counter[`${number}`]+=1;
                    
                    inp_child[`${number-1}`].textContent = 9 - inp_button_counter[`${number}`];
                    let child_count = Number(inp_child[`${number-1}`].textContent);
                    let child_color = child_count<4 ? "green" : child_count<7 ? "yellow" : "red";
                    inp_child[`${number-1}`].style.color=child_color;  
                    count+=1;
                }
            }
            cell_pointer1+=1;
        }
    }
    for(let i=0;i<inp_child.length;i++){
        if(inp_child[i].textContent==0){
            if(inp_child[i].parentElement.style.opacity!=0.5){
                inp_child[i].parentElement.style.backgroundImage="radial-gradient(circle, violet, red, blue, violet)";
                inp_child[i].parentElement.style.animation="shine 2s linear";
                setTimeout(() => {
                    inp_child[i].parentElement.style.backgroundImage="radial-gradient(circle, violet, violet, violet)";
                    inp_child[i].parentElement.style.opacity=0.5;
                    inp_child[i].parentElement.style.animation="";
                    
                }, 1500);
            }
        }
        else{
            inp_child[i].parentElement.style.opacity=1;
        }
    }
    


    if(count==81){
        GenerateConfetti();
    }
}

function Revert(){
    console.log(history);
    console.log(hist_pointer);
    hist_pointer =hist_pointer-1;

    if(hist_pointer>=0){
        history.pop();
        history[hist_pointer][0].textContent=`${history[hist_pointer][1]}`;
        if(history[hist_pointer][1]==''){
            history.pop();
            hist_pointer=hist_pointer-1;
        }
    }
    else{
        hist_pointer=-1;
    }
}

function HightlightAllNums(cell_ref){
    let buttons=document.querySelectorAll(".cell");
    buttons.forEach(button=>{
        if(button.textContent==cell_ref.textContent && button.textContent!=""){
            button.style.backgroundColor="rgba(255, 128, 0, 1)"
        }
        else{
            button.style.backgroundColor="#00ffee"
        }
    })
}

function GenerateConfetti(){
    for(let i=0;i<50;i++){
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = Math.random() * 10 + "px"; 
        confetti.style.backgroundColor=RandomColor();
        document.body.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}
function RandomColor(){
    const colors = ["#99ff00ff", "#ff0000ff", "#32CD32", "#1ee5ffff", "#FF1493"];
    return colors[Math.floor(Math.random()*colors.length)]
}

function GenerateNewBoard(){
    let base = 3;
    let rBase = [0,1,2];
    let rows = [];
    let cols = [];

    let shuffled_row_blocks = shuffle(rBase);
    shuffled_row_blocks.forEach(g =>{
        let shuffle_within_block = shuffle(rBase);
        shuffle_within_block.forEach(r =>{
            let row_index= (g*base) + r;
            rows.push(row_index);
        })
    });
    let shuffled_col_blocks = shuffle(rBase);

    shuffled_col_blocks.forEach(g =>{
        let shuffle_within_block1 = shuffle(rBase);
        shuffle_within_block1.forEach(c =>{
            let cols_index= (g*base) + c;
            cols.push(cols_index);
        })
    });
    let nums = [1,2,3,4,5,6,7,8,9];
    let nums1= shuffle(nums);
    board = generateBoard(rows,cols,nums1);
    let boardCopy =[];
    
    let random_positions=[];
    for(let i = 0 ; i<board.length;i++){
        random_positions[i]=[];
        for(let j=0;j<board[0].length;j++){
            let choice = Math.random();
            if(choice<0.67){
                random_positions[i][j]=0;
            }
            else{
                random_positions[i][j]=1;
            }
        }
    }
    for(let r=0;r<board.length;r++){
        boardCopy[r]=[];
        for(let c=0;c<board[0].length;c++){
            if(random_positions[r][c] == 1){
                boardCopy[r][c]=board[r][c];
            }
            else{
                boardCopy[r][c]=-1;
            }
        }
    }
    return [board,boardCopy,random_positions];
}

async function loadSudoku() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("User ID not found. Redirecting to login.");
    window.location.href = "./UserSetUp.html";
    return;
  }
  try {
    const res = await fetch(`${API_URL}/sudoku/load/${userId}`);
    if (!res.ok) {
      throw new Error(`Failed to load sudoku: ${res.status}`);
    }
    const sudoku = await res.json();
    player=sudoku;
    if (sudoku && sudoku.board && sudoku.board.length > 0) {
    RenderBoard(sudoku.board,sudoku.defaultindeces);
    seconds=sudoku.elapsedTime;
    puzzleref=sudoku.puzzle;
    validateBoard();
  } else {
    let puzzleReference=GenerateNewBoard();
    let puzzle=puzzleReference[0];
    let board = puzzleReference[1];
    let defaultindeces = puzzleReference[2];
    
    await fetch(`${API_URL}/sudoku/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId:userId, puzzle:puzzle, defaultindeces:defaultindeces, board:board, elapsedTime:0, isCompleted:false })
    });
    player = { puzzle, defaultindeces, board, elapsedTime: 0, isCompleted: false };
    puzzleref=puzzle;
    RenderBoard(board,defaultindeces);
    validateBoard();
  }
  } catch (error) {
    console.error("Error loading sudoku:", error);
    alert("Failed to load game. Please try again.");
    window.location.href = "./UserSetUp.html";
  }
}

function RenderBoard(board,defaultindeces){
    let cells=document.querySelectorAll('.cell');
    let cell_pointer=0;
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            if(board[i][j]!=-1){
                cells[cell_pointer].textContent=board[i][j];
            }
            if(defaultindeces[i][j]==1){
                cells[cell_pointer].style.fontWeight="900";
            }
            cell_pointer+=1;
        }
    }

}

async function SaveProgress(){
    let curr_board=[];
    let cells=document.querySelectorAll('.cell');
    let cell_pointer=0;
    for(let i = 0 ;i<=8;i++){
        curr_board[i]=[];
        for(let j=0;j<=8;j++){
            if(cells[cell_pointer].textContent!=''){
                curr_board[i][j]=Number(cells[cell_pointer].textContent);
            }
            else{
                curr_board[i][j]=-1;
            }
            cell_pointer+=1;
        }
    }
    const userId = localStorage.getItem("userId");
    try {
        const response = await fetch(`${API_URL}/sudoku/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId:userId, puzzle:player.puzzle, defaultindeces:player.defaultindeces, board:curr_board, elapsedTime:seconds, isCompleted:false })
        });
        const data = await response.json();
        if (!response.ok) {
            console.error("Save error:", data);
        } else {
            console.log("Progress saved successfully");
        }
    } catch (error) {
        console.error("Save failed:", error);
    }
}

async function deleteProgress(){
    document.querySelectorAll('button, input').forEach(el => el.disabled = true);
    const overlay = document.getElementById('gameOverOverlay');
    overlay.classList.add('active');
    const userId = localStorage.getItem("userId");
    console.log(userId);
    try {
        const res = await fetch(`${API_URL}/sudoku/delete/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (res.ok) {
        localStorage.removeItem("userId");
        window.location.href = "http://127.0.0.1:5500/FrontEnd/UserSetUp.html"; // redirect to login or home
        } else {
        alert(data.message || "Error deleting account.");
        }
    } catch (error) {
        console.error(error);
        alert("Server error while deleting account.");
    }
}

document.querySelector('.Save').addEventListener('click',function(){
    SaveProgress();
})

document.getElementById('restartBtn').addEventListener('click', () => {
   window.location.replace("http://127.0.0.1:5500/FrontEnd/UserSetUp.html");
});