/**
 * Created by Евгений on 03.05.2017.
 */
function draw() {
    var CENTER_X = 614;
    var CENTER_Y = 509;
    var RADIUSES = [100, 145, 203, 261, 319];
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.onload = function() {
        var sector15min = (Math.PI/180)*(360/48);
        ctx.drawImage(img, 0,0,1200,1000);

        ctx.beginPath();
        ctx.moveTo(758,509);
        ctx.arc(CENTER_X,CENTER_Y, RADIUSES[4], 0,sector15min, false);
        ctx.arc(CENTER_X,CENTER_Y, RADIUSES[3], sector15min, sector15min*2, false);
        ctx.arc(CENTER_X,CENTER_Y, RADIUSES[2], sector15min*2, sector15min*3, false);
        ctx.arc(CENTER_X,CENTER_Y, RADIUSES[0], sector15min*3, sector15min*4, false);
        ctx.arc(CENTER_X, CENTER_Y, RADIUSES[1], sector15min * 4, 0, true);
        ctx.fill();
    };
    img.src = 'images/Chronodex.png';

}