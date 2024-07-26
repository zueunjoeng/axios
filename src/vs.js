const arr1 = [1, 2, 3]; //참조(주소), 값
//arr1은 1,2,3 .. 낱개 저장되는게 아니라 그냥 array란 빌딩이 들어가는거야. 

const arr2 = [...arr1, 4, 5, 6];
console.log(arr2); // [1, 2, 3, 4, 5, 6]


//아래는 숫자를 저장 
let count=10;
//메모리 공간(주소)를 10을 저장
count = 100 ;
//10을 빼고 100을 저장해 -> 값을 참조한다.

function action(){

}

document.getElementById('btn').addEventListener('click', action)
document.getElementById('btn').addEventListener('click', ()=>{action()})

document.getElementById('btn').addEventListener('click', action()) //오류남 절대 안됨
document.getElementById('btn').addEventListener('click', ()=>{action}) //안됌