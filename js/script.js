let ctx = document.querySelector("canvas").getContext("2d"); //Получаем контекст

// Ширина и высота экрана
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

// Ширина и высота холста
let cw = 800;
let ch = 600;

// Скорость движения
let dx = 100;
let dt = 1000;

// Машинка
let car = {
    imgBackward: document.querySelector('#car'),
    imgForward: document.querySelector('#car-mirror'),
    x: 0,
    y: 200,
    w: vw * 0.3,
    h: vw * 0.3,
    dir: 1
};

// Кнопка смены направления
let btn = document.querySelector('.change');
btn.addEventListener('click', () => {
    car.dir *= -1;
});

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
    // Обновление позиции
    car.x += car.dir * dx * delta;
    car.x = Math.min(car.x, cw - car.w);
    car.x = Math.max(car.x, 0);
}

function render() {
    ctx.clearRect(0, 0, cw, ch);

    // Машинка
    if (car.dir == 1) {
        ctx.drawImage(car.imgForward, car.x, car.y, car.w, car.h);
    }
    else {
        ctx.drawImage(car.imgBackward, car.x, car.y, car.w, car.h);
    }
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
