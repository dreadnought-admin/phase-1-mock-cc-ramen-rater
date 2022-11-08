// write your code here
let ramenData;
let menuItem;

fetch("http://localhost:3000/ramens")
.then(r => r.json())
.then(json => {
    ramenData = json
    ramenData.forEach(
        ramen => {
            createImage(ramen)
        }
    )
    // function placeholders
    showDetails(ramenData[0]);
})

function createImage(ramen) {
    let ramenMenu = document.querySelector("#ramen-menu");
    let ramenImage = document.createElement("img");
    ramenImage.src = ramen.image;
    ramenMenu.appendChild(ramenImage);

    ramenImage.addEventListener("click", ()=> {
        showDetails(ramen);
    })
}

function showDetails(ramen) {
    menuItem = ramen;
    let name = document.querySelector(".name");
    let image = document.querySelector(".detail-image");
    let restaurant = document.querySelector(".restaurant");
    let rating = document.querySelector("#rating-display");
    let comment = document.querySelector("#comment-display");
    name.textContent = ramen.name;
    image.src = ramen.image;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
}

const newRamen = document.querySelector("#new-ramen");

newRamen.addEventListener('submit', (e) => {
    e.preventDefault();

    const formName = document.querySelector("#new-name").value;
    const formRestaurant = document.querySelector("#new-restaurant").ariaValueMax;
    const formImage = document.querySelector("#new-image").value; 
    const formRating = document.querySelector("#new-rating").value;
    const formComment = document.querySelector("#new-comment").value;

    newRamen.reset();

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            form: formName,
            restaurant: formRestaurant,
            image: formImage,
            rating: Number(formRating),
            comment: formComment
        })
    })
    .then(response => response.json())
    .then(data => {
        showDetails(data)
        const ramen = data
        const ramenImage = document.createElement("img");
        ramenImage.src = ramen.image;
        ramenMenu.append(ramen)
        ramenImage.addEventListener("click", () => {
            showDetails(ramen)
        });
    })
})