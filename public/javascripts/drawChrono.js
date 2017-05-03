/**
 * Created by Евгений on 03.05.2017.
 */
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.onload = function() {
        var sector15min = (Math.PI/180)*(360/48);
        ctx.drawImage(img, 0,0,600,500);

        ctx.beginPath();
        ctx.moveTo(300,250);
        ctx.arc(300,250,150,0,sector15min,false);
        ctx.arc(300,250,100,sector15min,sector15min*3,false);
        ctx.fill();
    };
    img.src = 'images/Chronodex.png';

}