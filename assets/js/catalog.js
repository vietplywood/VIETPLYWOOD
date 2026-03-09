const totalSlides = 14;
const track = document.getElementById("sliderTrack");
const slider = document.getElementById("catalogSlider");
const indicator = document.getElementById("indicator");

let currentIndex = 0;
let autoTimer = null;

// Detect language and set catalog folder
const isEnglish = window.location.pathname.includes("/en/");
const catalogFolder = isEnglish ? "catalogs_en" : "catalogs";

// CREATE SLIDES
for (let i = 1; i <= totalSlides; i++) {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
        <img
          src="../../assets/images/${catalogFolder}/${i}.webp"
          alt="Catalog vietplywood ${i}"
          loading="lazy"
          width="1200"
          height="1400"
        />
      `;
    track.appendChild(slide);
}

function updateUI() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    slider.style.setProperty(
        "--bg-image",
        `url('../../assets/images/${catalogFolder}/${currentIndex + 1}.webp')`
    );
    indicator.textContent = `${currentIndex + 1} / ${totalSlides}`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateUI();
    resetAuto();
}

function prevSlide() {
    currentIndex =
        (currentIndex - 1 + totalSlides) % totalSlides;
    updateUI();
    resetAuto();
}


document.addEventListener("keydown", (e) => {
    // tránh bắt phím khi đang gõ input/textarea
    const tag = e.target.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    if (e.key === "ArrowRight") {
        nextSlide();   // giữ resetAuto()
    }

    if (e.key === "ArrowLeft") {
        prevSlide();   // giữ resetAuto()
    }
});

function startAuto() {
    autoTimer = setInterval(nextSlide, 4500);
}

function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
}

// INIT
updateUI();
startAuto();
