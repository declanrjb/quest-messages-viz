function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomIntInRange(min,max) {
    var max_inter = max - min;
    return (Math.floor(Math.random() * max_inter) + min);
}

function intToPixels(int) {
    int = int.toString()
    int = int.concat("px")
    return int;
}

var messages = document.querySelectorAll(".message");
for (var j=0; j < messages.length; j++) {
    messages[j].style.top = intToPixels(getRandomInt(100));
    messages[j].style.width = intToPixels(randomIntInRange(200,500));
    var item_width = messages[j].style.width;
    item_width = parseInt(item_width);
    var max_position = screen.width - item_width;
    messages[j].style.left = intToPixels(randomIntInRange(0,max_position));
    var zdex = randomIntInRange(0,100);
    messages[j].style.opacity = zdex / 100;
    messages[j].style.zIndex = zdex;
}