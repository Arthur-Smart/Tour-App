//DOM Elements
const modal = document.querySelector('.col-2');
const btn = document.getElementById('btn-book');
const closeBtn = document.getElementById('close');
const hideHome = document.querySelector('.col-3');

//Typing effect
document.addEventListener('DOMContentLoaded', () =>{
    var typed = new Typed(".element", {
    strings: ["Califonia", "Dubai", "Pyramids", "Israel", "Japan", "Malindi"],
    smartBackspace:true,
    typeSpeed:100,
    backSpeed:100,
    loop:true,
    loopCount:Infinity,
    smartDelay:1000
    })
});

//Booking form tour from display
btn.addEventListener('click', () =>{
modal.classList.add('show');
hideHome.classList.add('hide');
});

//Close the Tour booking section
closeBtn.addEventListener('click', () =>{
modal.classList.remove('show');
hideHome.classList.remove('hide');
});

function Visit(place, name, travellers){
    this.place = place;
    this.name = name;
    this.travellers = travellers;
}

const storedTours = [];
    //{
        //place:'Malindi',
        //name:'Mercy Johnson',
      //  travellers:3
    //},
    //{
        //place:'Califonia',
        //name:'James Walker',
      //  travellers:2
    //},
     //{
        //place:'Egypt',
      //  name:'Adam Smith',
    //    travellers:6
  //  }
//];
//Number of tours
const numberOfTours = document.getElementById('number');
numberOfTours;


const tours = storedTours;
//Function Clear fields
const clearFields = () => {
    document.getElementById('tour').value = '';
    document.getElementById('name').value = '';
    document.getElementById('travellers').value = ''
}

//Function delete book
const deleteBook = (el) => {
if(el.classList.contains('delete-btn')){
    el.parentElement.parentElement.remove();
}
}

//function show alert
const showAlert = (message, className) =>{
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.meal-result');
    const meal_id = document.getElementById('meal');
    container.insertBefore(div, meal_id);
    //Remove after 2 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 2000);
}

//Tour storage
const getTour = () =>{
    let tours;
    if(localStorage.getItem('tours') === null){
        tour = [];
    } else {
        tours = JSON.parse(localStorage.getItem('tours'));
    }

    return tours;
}

const addTourToStorage = (tour) =>{
const tours = getTour();
tours.push(tour);
localStorage.setItem('tours', JSON.stringify(tours));
}

const removeTourFromStorage = (travellers) =>{
const tours = getTour(); 

tours.forEach((tour, index) => {
if(tour.travellers === travellers){
    tours.splice(index, 1);
}
});

localStorage.setItems('tours', JSON.stringify(tours));
}

const addTour = (tour)=>{
    const tourList = document.getElementById('tour-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${tour.place}</td>
    <td>${tour.name}</td>
    <td>${tour.travellers}</td>
    <td><a href="#" class="delete-btn">X</a></td>
    `;
    tourList.appendChild(row);
}


tours.forEach((tour) => {
    addTour(tour)
});

//Add book
document.getElementById('book-tour').addEventListener('submit', e => {
    e.preventDefault();
    //Get values
    const tourEl =document.getElementById('tour').value;
    const nameEl =document.getElementById('name').value;
    const travellersEl  =document.getElementById('travellers').value;

    //Validation
    if(tourEl === '' || nameEl === '' || travellersEl === ''){
        showAlert('Please fill all fields', 'warning');
    } else{
      const myVisit = new Visit(tourEl, nameEl, travellersEl);

    addTour(myVisit);
    //Tour booked success alert
    showAlert(`Hello ${nameEl}, you've booked a tour to ${tourEl}`, `success`);
    clearFields();
    numberOfTours.innerHTML++;
    }
});

//Delete book
document.getElementById('tour-list').addEventListener('click', e => {
   deleteBook(e.target);
   showAlert(`You've deleted a tour`, `info`);
    numberOfTours.innerHTML--;
});

addTour();