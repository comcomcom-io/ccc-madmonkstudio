let word = 'MADMONK';
let word2 = 'MADMONKSTUDIOS';
let backgrounds = [
	'backgrounds/Background1.jpg',
	'backgrounds/Background2.jpg',
	'backgrounds/Background3.jpg',
	'backgrounds/Background4.jpg',
	'backgrounds/Background5.jpg',
]
let spl,spl2, rot, f, direction;
let spacing, vel, fontSize, letterRotation, density, spin, phrase;
let inputs;
let song, playBtn, amp, mic, fft;
let songs = ['MM_1.mp3','MM_2.mp3', 'MM_3.mp3'];
let wordOption1, wordOption2, finalWord;
let bd;

let grow, shrink;

function preload(){
	f = loadFont('MadMonk.otf');
	song = loadSound('sound/' + random(songs));
}

function toggleSong(e) {
	e.preventDefault();
	if(song.isPlaying()){
		song.pause();
		playBtn.html('<img src="images/Play.svg"> Play Music');

	} else {
		song.loop();
		playBtn.html('<img src="images/Pause.svg"> Pause Music');
	}

	return false;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);

	grow = 2;
	shrink = 1;

	//Audio
	playBtn = createButton('<img src="images/Play.svg"> Play Music');
	playBtn.id('play');
	playBtn.mousePressed(toggleSong);

	if(width < 768) {
		playBtn.touchStarted(toggleSong);
	}

	song.pause();
	// amp = new p5.Amplitude();

	//Split word into characters
	spl = split(word,'');
	spl2 = split(word2,'');

	wordOption1 = spl;
	wordOption2 = spl2;
	finalWord = wordOption1;

	// Spinning Animation
	rot = 6;
	direction = 1;

	// Edit Controls
	inputs = select('#inputs');

	spacing = createSlider(20,60,40,1);
	fontSize = createSlider(15,70,40,1);
	density = createSlider(8,32,16,2);
	vel = createSlider(1,5,1,1);
	letterRotation = createSlider(0,90,45,1);
	spin = createRadio();
	spin.option('On');
	spin.option('Off');
	phrase = createRadio();
	phrase.option('OP.01');
	phrase.option('OP.02');

	// Bind controls to inputs
	spacing.parent(select('#spacing'));
	fontSize.parent(select('#fontSize'));
	density.parent(select('#density'));
	vel.parent(select('#speed'));
	letterRotation.parent(select('#letterRotation'));
	spin.parent(select('#spin'));
	phrase.parent(select('#phrase'));

	//Select body
	bd = select('body');
	bd.style("background","url('" + random(backgrounds) + "')");
}

function draw() {
	clear();
	translate(width/2, height/2);
	// let spectrum = fft.analyze();

	//Get volume from song
	// var vol = amp.getLevel();
	// var soundMap = map(vol, 0, 1, 20, 60);

	var densVal = density.value();
	var spacingVal = spacing.value();
	var fontVal = fontSize.value();
	var rotVal = letterRotation.value();
	var velVal = vel.value();

	if(phrase.selected() == 'OP.01') {
		finalWord = wordOption1;
	} else if (phrase.selected() == 'OP.02') {
		finalWord = wordOption2;
	}

	// Animate spinning circle
	for(let s = 0; s < finalWord.length; s++){
		for (var i = 0; i < densVal; i++) {
			push();
			rotate(TWO_PI * i / densVal + rot * (s/16));
			translate(s * spacingVal + spacingVal, s * spacingVal);
			push();
				// translate(spectrum[i]/32,spectrum[i]/32);
				fill(255);
				noStroke();
				textSize(fontVal);
				textFont(f);

				if(spin.selected() == 'On') {
					rotate(rot/2);
				} else if (spin.selected() == 'Off') {
					rotate(rotVal);
				}
				text(finalWord[s], 0, 0);
				pop();
			pop();
		}
		rot += velVal/1000 * direction;
	}

	grow += .1 * shrink;

	if(grow > 30 || grow < 2){
		shrink *= -1;
	}
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

function mouseWheel(e){
	rot += (e.delta/2000);
  return false;
}
