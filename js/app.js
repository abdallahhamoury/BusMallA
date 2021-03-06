'use strict'
// ==>START_________________________________________________________________________
let choicesEl = document.getElementById('choices');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let midImgEl = document.getElementById('midImg');
let rightImgEl = document.getElementById('rightImg');
let ulEl = document.getElementById('results');
let attempts = 1;
let maxAttempts = 25
let product = [];
let productNames = [];
let votes = [];
let views = [];
//__________________________________________________________________________________==<
function Products(productName) {
    this.productName = productName.split('.')[0];
    this.img = 'imgs/' + productName;
    this.votes = 0;
    this.views = 0;
    productNames.push(this.productName);
    product.push(this);
}
//__________________________________________________________________________________==<
let productImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let i = 0; i < productImg.length; i++) {

    new Products(productImg[i])
}

function randomIndex() {
    return Math.floor(Math.random() * product.length);
}
let leftImgIn;
let midImgIn;
let rightImgIn;

let arrayIndex = [];
function renderRandomImg() {

    leftImgIn = randomIndex();
    midImgIn = randomIndex();
    rightImgIn = randomIndex();
    // console.log(leftImgIn);
    // console.log(midImgIn);
    // console.log(rightImgIn);
    while (leftImgIn === rightImgIn || leftImgIn === midImgIn || midImgIn === rightImgIn || arrayIndex.includes(leftImgIn) || arrayIndex.includes(midImgIn) || arrayIndex.includes(rightImgIn)) {

        leftImgIn = randomIndex();
        midImgIn = randomIndex();
        rightImgIn = randomIndex();

    }
    arrayIndex = [leftImgIn, midImgIn, rightImgIn];

    //  console.log(product);
    leftImgEl.setAttribute('src', product[leftImgIn].img)
    midImgEl.setAttribute('src', product[midImgIn].img);
    rightImgEl.setAttribute('src', product[rightImgIn].img);
    leftImgEl.setAttribute('alt', product[leftImgIn].productName)
    midImgEl.setAttribute('alt', product[midImgIn].productName);
    rightImgEl.setAttribute('alt', product[rightImgIn].productName);
    leftImgEl.setAttribute('title', product[leftImgIn].productName)
    midImgEl.setAttribute('title', product[midImgIn].productName);
    rightImgEl.setAttribute('title', product[rightImgIn].productName);
    product[leftImgIn].views++;
    product[midImgIn].views++;
    product[rightImgIn].views++;

}

renderRandomImg();

leftImgEl.addEventListener('click', handelClicks);
midImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {

    if (attempts <= maxAttempts) {
        let clickedImg = event.target.id;
        if (event.target.id === 'leftImg') {
            product[leftImgIn].votes++;
        } else if (event.target.id === 'midImg') {
            product[midImgIn].votes++;
        } else if (event.target.id === 'rightImg') {
            product[rightImgIn].votes++;
        }
        renderRandomImg();
    } else {
        leftImgEl.removeEventListener('click', handelClicks);
        midImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
        chartRender();
    }
    // document.getElementById('botton').addEventListener('click', results)
    attempts++;
    // console.log(product);

}

let butel = document.getElementById('botton')
butel.addEventListener('click', clickbutton)

function clickbutton(event) {


    let ulEl = document.getElementById('results');
    ulEl.textContent = "";
    for (let i = 0; i < product.length; i++) {
        let liEl = document.createElement('li');
        liEl.textContent = `${product[i].productName} had ${product[i].votes} votes and was seen ${product[i].views} times`
        ulEl.appendChild(liEl);
        votes.push(product[i].votes);
        views.push(product[i].views);
    }
    saveLocal();
}
// function test(event){
//     console.log(event.target.id);
// }
//__________________________________________________________________________________==<
function saveLocal() {
    let dataString = JSON.stringify(product);
    localStorage.setItem('items', dataString);
    // console.log(dataString);
}
function readLocal() {
    let dataLocal = localStorage.getItem('items');
    let dataConvert = JSON.parse(dataLocal);
    if (dataConvert !== null)
        product = dataConvert;
}
readLocal()
//__________________________________________________________________________________==<
function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                    'rgba(000, 00, 000, 1)',

                ],
                borderColor: [
                    'rgba(000, 00, 000, 1)',

                ],
                borderWidth: 1
            }, {
                label: '# of Views',
                data: views,
                backgroundColor: [
                    'rgba(255,255, 255, 1)',

                ],
                borderColor: [
                    'rgba(255, 255,255, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
//__________________________________________________________________________________________END==<
