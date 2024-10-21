const nav = document.querySelector("nav");
const menu = document.getElementById('menu');
const Etim = document.getElementById('Etim');
const processorSvg = document.getElementById("processor-svg");
const chartSvg = document.getElementById("chart-svg");
const codeSvg = document.getElementById("code-svg");
const heroContent = document.getElementsByClassName("hero-content-text");


window.addEventListener("scroll", function() {
    let value = window.scrollY;

    nav.classList.toggle('sticky', window.scrollY > 0);
    menu.classList.toggle('current', window.scrollY == 0);
    Etim.classList.toggle('current', window.scrollY > 0);

    processorSvg.style.top = `${(window.innerHeight * 0.3) + value * 0.4}px`;
    chartSvg.style.top = `${(window.innerHeight * 0.5) + value * 0.5}px`;
    codeSvg.style.top = `${(window.innerHeight * 0.6) + value * 0.7}px`;
    for (let i = 0; i < 2; i++) {
        heroContent[i].style.top = `${value * 0.3}px`;
    }

});