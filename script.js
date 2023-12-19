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

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function focus() {
    console.log("focus fired");
    if (focused_state == false) {
        focused_elem = this;
        focused_left = this.style.left;
        focused_top = this.style.top;
        focused_z = this.style.zIndex;
        var y_center = (window.innerHeight / 2) + window.scrollY;
        var x_center = window.innerWidth / 2;
        this.style.transition = "all 1s";
        this.style.left = intToPixels(x_center - (this.offsetWidth / 2));
        this.style.top = intToPixels(y_center - (this.offsetHeight / 2) - 20);
        this.style.zIndex = 1000;
        for (var q=0; q < messages.length; q++) {
            if (messages[q] != this) {
                messages[q].style.opacity = "0.25";
            }
        }
        focused_state = true;
        focus_fired = true;
    }
}

function randItem(list) {
    return list[Math.floor(Math.random()*list.length)];
}

function testFunc() {
    console.log(this.innerText);
}

function antiFocus() {
    if (focused_state == true) {
        focused_elem.style.transition = "all 1s";
        focused_elem.style.top = focused_top;
        focused_elem.style.left = focused_left;
        focused_elem.style.zIndex = focused_z;
        for (var q=0; q < messages.length; q++) {
            messages[q].style.opacity = "1";
        }
        focused_state = false;
    }
}

function clamp(x,min,max) {
    return Math.min(Math.max(x,min),max)
}

var focused_elem = null;
var focused_left = null;
var focused_top = null;
var focused_z = null;
var focused_state = false;
var focus_fired = false;

/* document.getElementsByTagName('body')[0].style.overflow = 'hidden'; */

var data = JSON.parse(Get("https://raw.githubusercontent.com/declanrjb/quest-messages-viz/main/quest_harassment.json"));

var data_indices = []

for (var key in data) {
    data_indices.push(key);
}

shuffle(data_indices);


document.onclick = function() {
    if (focus_fired) {
        focus_fired = false;
    } else {
        antiFocus();
    }
}

var z_counter = 0;
for (var z=0; z < data_indices.length; z++) {
    var x = data_indices[z];
    var message_text = data[x]["Text"];
    var new_message_obj = document.createElement("p");
    new_message_obj.className = "message";
    new_message_obj.innerText = message_text;
    var doc_body = document.querySelector("body");
    doc_body.appendChild(new_message_obj);
    new_message_obj.style.zIndex = z_counter;
    z_counter += randomIntInRange(1,5);
    if (data[x]["Type"] == "Named") {
        new_message_obj.style.backgroundColor = "black";
        new_message_obj.style.color = "white";
    }
    new_message_obj.onclick = focus;
}
var mid_screen = screen.width / 2;
var screen_variance = screen.width / 4;
var messages = document.querySelectorAll(".message");
for (var j=0; j < messages.length; j++) {
    var item_height = messages[j].clientHeight;
    item_height = parseInt(item_height);
    messages[j].style.top = intToPixels(clamp((randomIntInRange(0,4000) - (item_height / 2)),0,4000));
    messages[j].style.width = intToPixels(randomIntInRange(500,1000));
    var item_width = messages[j].style.width;
    item_width = parseInt(item_width);
    var max_position = screen.width - item_width;
    messages[j].style.left = intToPixels((mid_screen + randomIntInRange(-screen_variance,screen_variance)) - (item_width / 2));
    var zdex = randomIntInRange(0,100);
}

var scroll_prev = window.scrollY;
document.addEventListener('scroll', function(e){
    var scroll_amount = window.scrollY - scroll_prev;
    scroll_prev = window.scrollY;
    for (var i=0; i < messages.length; i++) {
        var message_obj = messages[i];
        var zdex = parseInt(message_obj.style.zIndex);
        var curr_top = parseInt(message_obj.style.top);
        message_obj.style.top = intToPixels(curr_top - ((scroll_amount * (zdex / z_counter))));
    }
}, true);


