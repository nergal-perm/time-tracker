/**
 * Created by Евгений on 03.05.2017.
 */

var CENTER = {
    X: 614,
    Y: 509
};

var RADIUS = 144;

/**
 * Вызывается после загрузки фоновой картинки (шаблона Хронодекса) на странице
 */
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0,0,1200,1000);
        drawSegment(ctx, '0900', [-2, 4/3, 2/3]);
        drawSegment(ctx, '1115', [2/3, 4/3, 2/3]);
        drawSegment(ctx, '1430', [2, 4/3, 2/3]);
        drawSegment(ctx, '1845', [1, 2/3, 4/3, 2]);
    };
    img.src = 'images/Chronodex.png';
}

/**
 * Полностью отрисовывает сегмент, соответствующий одной непрерывной сессии активности
 * @param ctx                 контекст холста html
 * @param timeStart           время начала сессии активности
 * @param productivityLevels  массив уровней продуктивности для каждой 5тиминутки сессии
 */
function drawSegment(ctx, timeStart, productivityLevels) {
    var sector5min = (Math.PI/180)*(360/144);

    ctx.beginPath();

    // Определяем точку старта в зависимости от времени начала активности
    var startPoint = getSegmentStartPoint(timeStart);
    console.log(startPoint);
    ctx.moveTo(startPoint.x,startPoint.y);

    // В цикле рисуем по одному сегменту за раз для каждого значения из productivityLevels
    productivityLevels.forEach(function(item, index) {
        var radius = RADIUS + (item / 2) * (item>=0 ? (318 - RADIUS) : (RADIUS - 100));
        var startAngle = startPoint.angleStart + sector5min * index;
        ctx.arc(CENTER.X, CENTER.Y, radius, startAngle, startAngle + sector5min, false);
    });
    ctx.arc(CENTER.X, CENTER.Y, RADIUS, startPoint.angleStart + sector5min * productivityLevels.length, startPoint.angleStart, true);

    // Определяем стиль заливки и заливаем фигуру
    ctx.fill();
}
/**
 * Вспомогательная функция для определения начальной точки каждого нового сегмента
 * @param timeStart Время начала активности
 * @returns {{x: number, y: number, angleStart: number}} Структура, описывающая начальную точку
 */
function getSegmentStartPoint(timeStart) {
    var hours = timeStart.substr(0,2) * 1 - 15;
    if (hours < 0) {
        hours += 12;
    }
    var minutes = (timeStart.substr(2,2) * 1) / 5;
    var angleStart = (Math.PI/180) * ((360/12*hours) + (360/144 * minutes));

    return {
        x: RADIUS * Math.cos(angleStart) + CENTER.X,
        y: RADIUS * Math.sin(angleStart) + CENTER.Y,
        angleStart: angleStart
    };
}