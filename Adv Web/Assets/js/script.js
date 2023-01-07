
const playButton = document.querySelector('#play_button');
const section1 = document.querySelector('.section1');
const section2 = document.querySelector('.section2');
const section3 = document.querySelector('.section3');
const que = document.querySelector('#que');
const queNo = document.querySelector('#que_no');
const next_btn = document.querySelector('#next_btn');
const options = document.querySelectorAll('.options');
const category = document.querySelector('#category');
const noOfQue = document.querySelector('#noOfQue');
const difficulty = document.querySelector('#difficulty');
const type = document.querySelector('#type');
const hoursInput = document.querySelector('#hours_input');
const minsInput = document.querySelector('#mins_input');
const selectOption = document.getElementById('selectOption');
const hours = document.getElementById('hours');
const mins = document.getElementById('mins');
const secs = document.getElementById('secs');

// console.log(options)



init();


function init() {
    
    
    playButton.addEventListener('click', () => {
        
    fetchApi();
        section1.style.display = 'none'
        section3.style.display = 'none'
        section2.style.display = 'flex'
        
        // window.location.href = 'http://127.0.0.1:5500/Assets/play.html'
    });
    // if(window.location.pathname.includes('play')){
    //     fetchApi();
    // }
    
}
let categoryValue = 0;
let noOfQueValue = 5;
let difficultyValue = 0;
let typeValue = 0;
let hoursValue = 0;
let minsValue = 2;

category.addEventListener('change', (e) => {
    categoryValue = e.target.value;
    
})

noOfQue.addEventListener('change', (e) => {
    noOfQueValue = noOfQue.value;
    // console.log(noOfQueValue)
})

difficulty.addEventListener('change', (e) => {
    difficultyValue = e.target.value;
})

type.addEventListener('change', (e) => {
    typeValue = e.target.value;
})

hours.addEventListener('change', (e) => {
    hoursValue = e.target.value;
})

mins.addEventListener('change', (e) => {
    minsValue = e.target.value;
})

// let obj = {
// };
// console.log(obj)

let arr = [];
let corr_ans = [];

async function fetchApi() {

    // const query = `amount=${noOfQueValue}&category=${categoryValue}&difficulty=${difficultyValue}&type=${typeValue}`;
    // window.location.href = `http://127.0.0.1:5500/Assets/play.html?id=${query}`;
    const res = await fetch(`https://opentdb.com/api.php?amount=${noOfQueValue}&category=${categoryValue}&difficulty=${difficultyValue}&type=${typeValue}`)
    const data = await res.json();
    // console.log(data)

    // let ind = 0;
    queNo.innerHTML = `Question No.${1} of ${noOfQueValue}`
    que.innerHTML = `Q. ${data.results[0].question}`;
    options[0].innerHTML = data.results[0].correct_answer;
    // corr_ans[ind] = data.results[0].correct_answer;

    // ----------Timing--------------
    hours.innerHTML = hoursInput.value;
    mins.innerHTML = 2;
    secs.innerHTML = 0;
    let sec = 60;
    let min = mins.innerHTML;
    setInterval(() => {
        if(mins.innerHTML === '0' && secs.innerHTML === '0' && hours.innerHTML !== '0'){
            hours.innerHTML -= 1;
            mins.innerHTML = 60;
            sec = 60;
        }
        if(secs.innerHTML === '0'){
            console.log(mins.innerHTML)
            mins.innerHTML -= 1;
            sec = 60;
        }
        sec -= 1
        secs.innerHTML = sec;
        // console.log(secs.innerHTML);
        if(hours.innerHTML === '0' && mins.innerHTML === '0' & secs.innerHTML === '0'){
            clearInterval();
            section1.style.display = 'none'
            section3.style.display = 'flex'
            section2.style.display = 'none'
        }
    }, 1000);

    corr_ans.push(data.results[0].correct_answer);

    for (let i = 0; i < data.results[0].incorrect_answers.length; i++) {
        options[i+1].innerHTML = data.results[0].incorrect_answers[i];
    }

    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener('click', () => {            
            for(let j = 0; j < options.length; j++){
                if(i !== j){
                    options[j].removeAttribute('id');
                    options[j].removeAttribute('style');
                    // if(arr.length > 1){
                    //     arr.shift();
                    // }
                    // selectOption.removeAttribute('style');
                }else{
                    options[i].setAttribute('id', 'selectOption');
                    const selectOption = document.getElementById('selectOption');
                    // console.log(selectOption.innerHTML)
                    // if(!obj[selectOption.innerHTML]){
                    //     obj[selectOption.innerHTML] = selectOption.innerHTML;
                    // }
                    // console.log(selectOption.innerHTML)
                    arr.push(selectOption.innerHTML);
                    // console.log(arr)
                    selectOption.style.backgroundColor = 'rgba(128, 128, 128, 0.333)'
                }
                
            }
        })
    }
    let counter = 0;
    next_btn.addEventListener('click', () => {
        counter++;
        if(counter === data.results.length){
            section1.style.display = 'none'
            section3.style.display = 'flex'
            section2.style.display = 'none'
            // corr_ans[ind++] = data.results[data.results.length-1].correct_answer;
            // corr_ans.push(data.results[data.results.length-1].correct_answer);
            resultDisplay(arr, corr_ans,  data);
        }else{
            queNo.innerHTML = `Question No.${counter+1} of ${noOfQueValue}`
            que.innerHTML = `Q. ${data.results[counter].question}`;
            options[0].innerHTML = data.results[counter].correct_answer;
            corr_ans.push(data.results[counter].correct_answer);

            for (let i = 0; i < data.results[counter].incorrect_answers.length; i++) {
                options[i+1].innerHTML = data.results[counter].incorrect_answers[i];
                
            }
    
            // const selectOption = document.getElementById('selectOption');
            
            for (let i = 0; i < options.length; i++) {
                options[i].removeAttribute('id');
                options[i].removeAttribute('style');
            }
    
            for (let i = 0; i < options.length; i++) {
                options[i].addEventListener('click', () => {            
                    for(let j = 0; j < options.length; j++){
                        if(i !== j){
                            options[j].removeAttribute('id');
                            options[j].removeAttribute('style');
                            // if(arr.length > 1){
                            //     arr.shift();
                            // }
                            // selectOption.removeAttribute('style');
                        }else{
                            options[i].setAttribute('id', 'selectOption');
                            
                            // console.log(selectOption.innerHTML)
                            // if(!obj[selectOption.innerHTML]){
                            //     obj[selectOption.innerHTML] = selectOption.innerHTML;
                            // }
                            // console.log(selectOption.innerHTML)
                            arr.push(selectOption.innerHTML);
                            // console.log(arr)
                            selectOption.style.backgroundColor = 'rgba(128, 128, 128, 0.333)'
                        }
                        
                    }
                })
            }
        }
        
        
    })

    // Page 3 or section 3

    const stats_btn = document.querySelector('#stats_btn');
    const qna_btn = document.querySelector('#qna_btn');
    const stats_container = document.querySelector('.stats_container');
    const qna_container = document.querySelector('.qna_container');
    



    // stats_btn.addEventListener('click', () => {
    //     stats_container.style.display = 'flex';
    //     qna_container.style.display = 'none';
        
    // })
    // qna_btn.addEventListener('click', () => {
    //     stats_container.style.display = 'none';
    //     qna_container.style.display = 'flex';
        
    // })
    const playAgain_btn = document.getElementById('playAgain_btn');
    const backToHome_btn = document.getElementById('backToHome_btn');
    
    // playAgain_btn.addEventListener('click', () => {
    //         section1.style.display = 'none'
    //         section3.style.display = 'none'
    //         section2.style.display = 'flex'
    //         fetchApi();
    // });
    backToHome_btn.addEventListener('click', () => {
            section1.style.display = 'flex'
            section3.style.display = 'none'
            section2.style.display = 'none'
    });

    
}


function resultDisplay(arr, corr_ans, data) {
    const result = document.getElementById('result')
    const grade = document.getElementById('grade')
    const total_que = document.getElementById('total_que')
    const correct_ans = document.getElementById('correct_ans')
    const score = document.getElementById('score')
    const passing_score = document.getElementById('passing_score')


    let user_corr_ans = 0;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] === corr_ans[i]){
            user_corr_ans += 1;
        }
    }
    correct_ans.innerHTML = `Correct Answers: ${user_corr_ans}`;
    total_que.innerHTML = `Total Question: ${noOfQueValue}`;
    let totalScore = (user_corr_ans / corr_ans.length) * 100;
    score.innerHTML = `Your Score: ${totalScore}%`
    if(totalScore > 60){
        grade.innerHTML = `Grade: A`;
        result.innerHTML = 'Passed';
    }else{
        grade.innerHTML = `Grade: F`;
        result.innerHTML = 'Failed';
    }
    
    
}