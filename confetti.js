// [source] https://codepen.io/smpnjn/pen/wvgpxpG

/* Random Id generator for giving confetti elements unique IDs */
const randomId = function(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

/* Short function to create confetti at x, y with confettiItems number of items */
const createConfetti = function(x, y, confettiItems) {
    let createElement = document.createElement('div');
    createElement.classList.add('heart');
    let makeId = randomId(10);
    createElement.setAttribute('data-id', makeId);
    let confettiHTML = '';
    let colors = [ '#E9BEBE', '#BEDFBF', '#FDECB4', '#F9D8D2', '#C5DBEE', '#B2C8B8', '#F0B9AD', '#99B7D1']
    
    for(var i = 0; i < confettiItems; ++i) {
        let color = Math.floor(Math.random() * (colors.length));
        confettiHTML += `<div class="heart" style="--confetti-color: ${colors[color]};" data-angle="${Math.random()}" data-speed="${Math.random()}"></div>`;
        confettiHTML += `<div class="heart reverse" style="--confetti-color: ${colors[color]};" data-angle="${Math.random()}" data-speed="${Math.random()}"></div>`;
    }
    
    createElement.style.position = `fixed`;
    createElement.style.top = `${y}px`;
    createElement.style.left = `${x}px`;
    createElement.innerHTML = confettiHTML;
    document.body.appendChild(createElement);
    
    let gravity =  50; // Fjolt is a high gravity planet
    let maxSpeed = 105000; // Pixels * 1000
    let minSpeed = 65000; // Pixels * 1000
    let t = 0; // Time starts at 0
    let maxAngle = 1500; // Radians * 1000
    let minAngle = 400; // Radians * 1000
    let opacity = 1;
    let rotateAngle = 0;

    let interval = setInterval(function() {
        document.querySelectorAll(`[data-id="${makeId}"] .heart`).forEach(function(item) {
            let modifierX = 1;
            let modifierY = 1;
            if(item.classList.contains('reverse')) {
                modifierX = -1;
            }
            item.style.opacity = opacity;
            let randomNumber = parseFloat(item.getAttribute('data-angle'));
            let otherRandom = parseFloat(item.getAttribute('data-speed'));
            let newRotateAngle = randomNumber * rotateAngle;
            let angle = (randomNumber * (maxAngle - minAngle) + minAngle) / 1000;
            let speed = (randomNumber * (maxSpeed - minSpeed) + minSpeed) / 1000;
            let x = speed * t * Math.cos(angle) + (50 * otherRandom * t);
            let y = speed * t * Math.sin(angle) - (0.5 * gravity * Math.pow(t, 2))  + (50 * otherRandom * t);
            item.style.transform = `translateX(${x * modifierX}px) translateY(${y * -1 * modifierY}px) rotateY(${newRotateAngle}deg) scale(${1})`;
        })
        t += 0.1;
        rotateAngle += 3;
        opacity -= 0.02;
        if(t >= 6) {
            t = 0.1;
            if(document.querySelector(`[data-id="${makeId}"]`) !== null) {
                document.querySelector(`[data-id="${makeId}"]`).remove();
            }
            clearInterval(interval);
        }
    }, 33.33);
}

document.addEventListener('DOMContentLoaded', function(e) {
  document.getElementById('confetti-box').addEventListener('pointerdown', function(e) {
    console.log(e.target)
    if (e.target.getAttribute('id') != "address-form-modal-btn" &&
        e.target.getAttribute('class') != "atcb-light") {
        createConfetti(e.clientX, e.clientY, 20);
    }
  });
});