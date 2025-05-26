const img = [
    '/Day10_2025_05_26/imgs/bien.jpg',
    '/Day10_2025_05_26/imgs/nui.jpg',
    '/Day10_2025_05_26/imgs/rung.jpg',
    '/Day10_2025_05_26/imgs/samac.jpg',  
];

let index = 0;
const slide = document.getElementById('slide');
const prev  = document.getElementById('prev');
const next  = document.getElementById('next');

function showSlide(i) {
    slide.src = img[i];
}

prev.addEventListener('click',()  => {
    index = (index -1 +img.length) % img.length;
    showSlide(index);
});
next.addEventListener('click',()  => {
    index = (index + 1) % img.length;
    showSlide(index);
});
