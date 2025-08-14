// bases
let turnO = true;  //PlayerX, PlayerO
let count = 0;
let xSeq = [];
let oSeq = [];

let winningNum = [
     [0,1,2],
     [0,4,8],
     [0,3,6],
     [1,4,7],
     [2,4,6],
     [2,5,8],
     [3,4,5],
     [6,7,8],
   
];

// Accessing elements from html
let stbtn = document.querySelector("#st");
let rstbtn = document.querySelector("#rst");
const boxes = document.querySelectorAll(".box");
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");


// Game start function
stbtn.addEventListener("click", ()=>{
     flash(stbtn);
     
     startGame(turnO);
     count = 1;
     
     
});


// filling the boxes

function startGame(turnO){

     boxes.forEach(box => {
     box.addEventListener("click", (event)=> {
          // To check which btn is clicked
          let x = event.target.id;
          // console.log(x);

          if(turnO == true){
               box.textContent = "X";
               addSeq("x", x);
               turnO = false;
               
          } else {
               box.textContent = "O";
               addSeq("o", x);
               turnO = true;
               
          }
          
          box.disabled = true;   // ensure btn clicked only once
          
          
     })
})
}

// Game Restart function

rstbtn.addEventListener("click", function()  {
     xSeq = [];
     oSeq = [];
     turnO = true;
    
     boxes.forEach(box => {
          box.innerText = "";
          box.disabled = false;
     });
     h2.innerText = "";
     h3.innerHTML = "";
});


// to add values in xSeq or oSeq -- values are added in the form of string 
function addSeq(type, value){
     if(type == "x"){
         xSeq.push(value);
     //     console.log("x=", xSeq);
         check();
         
     } else {
          oSeq.push(value);
          // console.log("o=",oSeq)
          check();
     }
    
}

// 
function check(){
     if(xSeq.length >= 3){
        compare(xSeq);
     //    console.log("x checked");
     }
     if(oSeq.length >= 3){
          compare(oSeq);
          // console.log("o checked");
     }
}

function compare(targetArr){
     
     let res;
     for(seq of winningNum){
       res = seq.every(val => targetArr.map(Number).includes(val));   // need to convert targetArr to number or seq to string
       
       if(res == true) break;     // if true, break the loop 
     }

     if(res == true && targetArr == xSeq){
          h2.innerText = "X wins!";
          h3.innerText = "Restart the game";
          disable();
     } else if(res == true && targetArr == oSeq){
          h2.innerText = "O wins!"
          h3.innerText = "Restart the game";
          disable();
     } 

     
     if (res == false && (xSeq.length == 4 && oSeq.length == 5) || (oSeq.length == 4 && xSeq.length == 5)) {
          h2.innerText = "It's a tie!";
          h3.innerText = "Restart the game";
          disable();    
     }
}

// disable function
function disable() {
     boxes.forEach(box => box.disabled = true);
}



// flash function
function flash(btn){
     btn.classList.add("flash");

     setTimeout(function() {
          btn.classList.remove("flash");
     }, 2000);
}




   