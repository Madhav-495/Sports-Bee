const text="WELCOME TO SPORTS-BEE 🏏"
const textArray = text.split(" ");
const heading = document.getElementById('heading');
// let string = "I love playing cricket with my  and 🏏‍♂️";


let i=0;
function addWord() {
    
        heading.innerHTML += text.charAt(i);
    
    
    i++;
    if (i >= text.length) {
      clearInterval(intervalId);
    }
  }
  const intervalId = setInterval(addWord, 300);



