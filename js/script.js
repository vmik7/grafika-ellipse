let ctx = document.querySelector("canvas").getContext("2d"); //Получаем контекст

// Ночь
let dark = {

    // RGB параметры тёмного цвета
    r: 0,
    g: 33,
    b: 55,

    // Прозрачность
    alpha: 0,

    // Градусы захождения солнца
    dw: 25
};

// Радиус орбиты планет
let r = 300;

// Скорость изменения градуса
let dw = 180;
let dt = 4000;

// Центр орбиты
let c = {
    x: 400,
    y: 600
};

// Солнце
let sun = {
    img: document.querySelector('#sun'),
    x: 0,
    y: 0,

    // Параметр (градусная мера)
    w: 180
};

// Луна
let moon = {
    img: document.querySelector('#moon'),
    x: 0,
    y: 0,

    // Параметр (градусная мера)
    w: 0
};

let last = Date.now();
function play(){
	let now = Date.now();
	let delta = (now - last) / dt;
	update(delta);
	render();
	requestAnimFrame(play);
	last = now;
}

function update(delta) {
    // Обновление позиции солнца
    sun.w += dw * delta;
    sun.w %= 360;
    sun.x = c.x + r * Math.cos(sun.w * Math.PI / 180);
    sun.y = c.y + r * Math.sin(sun.w * Math.PI / 180);

    // Обновление позиции луны
    moon.w += dw * delta;
    moon.w %= 360;
    moon.x = c.x + r * Math.cos(moon.w * Math.PI / 180);
    moon.y = c.y + r * Math.sin(moon.w * Math.PI / 180);

    if (sun.w >= 360 - dark.dw) {
        // Плавный закат
        dark.alpha = 1 - 1 / dark.dw * (360 - sun.w);
    }
    else if (sun.w >= 180) {
        // Плавный восход
        dark.alpha = 1 - 1 / dark.dw * (sun.w - 180);
    }
}

function render() {
    ctx.clearRect(0, 0, 800, 600);

    // Фон
    ctx.fillStyle = `rgba(${dark.r}, ${dark.g}, ${dark.b}, ${dark.alpha})`;
    ctx.fillRect(0, 0, 800, 600);

    // Солнце и луна
    ctx.drawImage(sun.img, sun.x, sun.y);
    ctx.drawImage(moon.img, moon.x, moon.y);
}

var requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 50);
        }
    );
})();

play();
