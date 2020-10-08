
// Ширина и высота экрана
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

// Инициализация канваса
let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

// Растягиваем на весь экран
canvas.width = vw;
canvas.height = vh;

// Рисует 1 пиксель на холсте
let plot = (x, y, color) => {
    if (x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1); 
    }
};

// Рисует пиксель в первой четверти и остальные по симметрии
let drawPoints = (x0, y0, x, y, color) => {
    plot(x0 + x, y0 + y, color);
    plot(x0 + x, y0 - y, color);
    plot(x0 - x, y0 - y, color);
    plot(x0 - x, y0 + y, color);
}

// Рисует эллипс по алгоритму Брезенхема
let drawEllipse = (x0, y0, a, b, color) => {
    let x = 0; 
    let y = b; 
    let aa = a * a; 
    let bb = b * b; 

    // точка (x+1, y-1/2)
    let delta = 4 * bb * ((x + 1) * (x + 1)) + aa * ((2 * y - 1) * (2 * y - 1)) - 4 * aa * bb;

    // Первая часть дуги
    while (aa * (2 * y - 1) > 2 * bb * (x + 1)) {
        drawPoints(x0, y0, x, y, color);

        if (delta < 0) {
            // Переход по горизонтали
            x++;
            delta += 4 * bb * (2 * x + 3);
        }
        else {
            // Переход по диагонали
            x++;
            delta = delta - 8 * aa * (y - 1) + 4 * bb * (2 * x + 3);
            y--;
        }
    }

    // точка (x+1/2, y-1)
    delta = bb * ((2 * x + 1) * (2 * x + 1)) + 4 * aa * ((y + 1) * (y + 1)) - 4 * aa * bb; 

    // Вторая часть дуги, если не выполняется условие первого цикла, значит выполняется a^2(2y - 1) <= 2b^2(x + 1)
    while (y + 1 != 0) {
        drawPoints(x0, y0, x, y, color);

        if (delta < 0) {
            // Переход по вертикали
            y--;
            delta += 4 * aa * (2 * y + 3);
        }
        else {
            // Переход по диагонали
            y--;
            delta = delta - 8 * bb * (x + 1) + 4 * aa * (2 * y + 3);
            x++;
        }
    }
}

// Рисуем эллипс по середине холста
drawEllipse(vw / 2, vh / 2, 200, 100, 'crimson');