function selectBox(button){
    if( button.style.border=="3px solid rgb(0, 0, 0)"){
        button.style.border = "3px solid rgb(255, 0, 0)";
    }
    else{
        button.style.border="3px solid rgb(0, 0, 0)";
    }
}


document.querySelectorAll('.cell').forEach(btn => {
    btn.addEventListener('click', function() {
        turnAllBlack();
        selectBox(this);
        HightlightAllNums(this);

    });
});

function turnAllBlack(){
    document.querySelectorAll('.cell').forEach(btn =>{
        btn.style.border = "3px solid rgb(0, 0, 0)";
    })
}
let history = [];
let hist_pointer = -1;
const input_buttons = document.querySelectorAll(".input_buttons button");
input_buttons.forEach(btn => {
    btn.addEventListener('click',function(){
        
        document.querySelectorAll('.cell').forEach(btn1 =>{
            if(btn1.style.border=="3px solid rgb(255, 0, 0)"){
                if(btn.textContent == "↶"){
                    Revert();   
                }
                    
                else{
                    if(btn1.style.fontWeight!="900"){
                        if(btn1.textContent==''){
                            history.push([btn1,btn1.textContent]);
                            hist_pointer=hist_pointer+1;
    
                        }
                        btn1.textContent = `${btn.childNodes[1].nodeValue}`;
                        history.push([btn1,btn1.textContent]);
                        hist_pointer=hist_pointer+1;
                    }
                }
            }
        })
        validateBoard();
        
    })

});
let board=[];
window.onload = function(){
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
    let cells = document.querySelectorAll('.cell');
    let cell_pointer =0;
    let random_positions=[];
    for(let i = 0 ; i<cells.length;i++){
        let choice = Math.random();
        if(choice<0.67){
            random_positions.push(0);
        }
        else{
            random_positions.push(1);
        }
    }
    for(let r=0;r<board.length;r++){
        for(let c=0;c<board[0].length;c++){
            if(random_positions[cell_pointer] == 1){
                cells[cell_pointer].textContent = board[r][c];
                cells[cell_pointer].style.fontWeight = "900";
                cells[cell_pointer].style.color="rgb(0, 0, 0)";
            }
            cell_pointer+=1;
        }
    }
    validateBoard();
    
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
    }
    for(let r=0;r<9;r++){
        for(let c =0;c<9;c++){
            if(cells1[cell_pointer1].textContent != `${board[r][c]}` && cells1[cell_pointer1].textContent != "" ){
                cells1[cell_pointer1].style.color="rgb(255, 0, 0)";
            }
            else{
                cells1[cell_pointer1].style.color="rgb(0, 0, 0)";
                if(cells1[cell_pointer1].textContent!=""){
                    let number=Number(cells1[cell_pointer1].textContent);
                    inp_button_counter[`${number}`]+=1;
                    
                    inp_child[`${number-1}`].textContent = 9 - inp_button_counter[`${number}`];
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
                inp_child[i].parentElement.style.animation="shine 1s linear";
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
    for(let i=0;i<30;i++){
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

