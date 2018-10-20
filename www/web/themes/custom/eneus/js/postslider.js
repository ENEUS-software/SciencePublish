
postNewsGalleryElement = document.querySelectorAll('.news .post-gallery-wrap')[0];
if (postNewsGalleryElement) {

var buttons = document.createElement('div');
buttons.setAttribute('class', "buttons");
buttons.innerHTML = "<button class='controls' id='previous'><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></button><button class='controls' id='pause'>&#10074;&#10074;</button><button class='controls' id='next'><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></button>";

postNewsGalleryElement.insertBefore(buttons, parent.firstChild);


var controls = document.querySelectorAll(".controls");

// for(var i=0; i<controls.length; i++){
// 	controls[i].style.display = 'inline-block';
// }

var slides = document.querySelectorAll('.news .post-gallery figure');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,2000);

function nextSlide(){
	goToSlide(currentSlide+1);
}

function previousSlide(){
	goToSlide(currentSlide-1);
}

function goToSlide(n){
	slides[currentSlide].className = 'slide';
	currentSlide = (n+slides.length)%slides.length;
	slides[currentSlide].className = 'slide showing';
}

var playing = true;
var pauseButton = document.getElementById('pause');

function pauseSlideshow(){
	pauseButton.innerHTML = '&#9658;'; // play character
	playing = false;
	clearInterval(slideInterval);
}

function playSlideshow(){
	pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
	playing = true;
	slideInterval = setInterval(nextSlide,2000);
}

pauseButton.onclick = function(){
	if(playing){ pauseSlideshow(); }
	else{ playSlideshow(); }
};

var next = document.getElementById('next');
var previous = document.getElementById('previous');

next.onclick = function(){
	pauseSlideshow();
	nextSlide();
};
previous.onclick = function(){
	pauseSlideshow();
	previousSlide();
};

}