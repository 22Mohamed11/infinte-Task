const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".service-section svg");
const firstCardWidth = carousel.querySelectorAll(".card").offsetWidth;
const carouselChidrens = [...carousel.chidren];

let isDragging = false , startX ,startScrollLeft;
let cardPreview = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChidrens.slice(-cardPreview).reverse().forEach( card => {
     carousel.insertAdjacentHTML("afterbegin" , card.outerHTML);
});

carouselChidrens.slice(0 ,cardPreview).forEach( card => {
     carousel.insertAdjacentHTML("beforeend" , card.outerHTML);
});

arrowBtns.forEach( btn => {
     btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id === "left" ? -firstCardWidth:firstCardWidth;
     })
})

const dragStart = (e) => {
     isDragging = true;
     carousel.classList.add("dragging");
     startX = e.pageX
}

const dragging = (e) => {
     if(!isDragging) return;
     carousel.scrollLeft = e.pageX;
     startScrollLeft = carousel.scrollLeft;
}

const dragStop = () => {
     isDragging = false;
     carousel.classList.remove("dragging");
     carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const infiniteScroll = () => {
     if(carousel.scrollLeft === 0 ){
          carousel.scrollLeft = carousel.scrollWidth - (2*carousel.offsetWidth);
     }
     else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
          carousel.scrollLeft = carousel.offsetWidth;
     }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll",infiniteScroll);