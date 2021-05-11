let word = '';
let spl,
    rot,
    f,
    direction;
let spacing,
    vel,
    fontSize,
    letterRotation,
    density,
    spin,
    graphicRotation,
    autoPlay,
    imgInput,
    bd, vid;
let inputs;

function preload(){
  f = loadFont('font/GerstnerProgramm-Regular.otf')
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	spl = split(word,'');
	rot = 0;
	direction = 1;
	inputs = select('#inputs');
  bd = select('body');
  vid = select('#vid');

	spacing = createSlider(20,60,40,1);
	fontSize = createSlider(10,100,40,1);
	density = createSlider(8,48,16,4);
	vel = createSlider(1,5,1,1);
  letterRotation = createSlider(0,90,45,.1);
  graphicRotation = createSlider(0, 32, 0, .1);
	spin = createRadio();
	spin.option('Yes');
  spin.option('No');
  imgInput = createFileInput(handleFile);

  autoPlay = createRadio();
  autoPlay.option('Yes');
  autoPlay.option('No');

	spacing.parent(select('#spacing'));
	fontSize.parent(select('#fontSize'));
	density.parent(select('#density'));
	vel.parent(select('#speed'));
	letterRotation.parent(select('#letterRotation'));
  spin.parent(select('#spin'));
  graphicRotation.parent(select('#rotation'));
  autoPlay.parent(select('#autoplay'));

  imgInput.parent(select('#bg'));
  // imgInput.style("display","none");
}

function handleFile(file) {
  console.log(file);
  if (file.type === 'image') {
    bd.style("background-image","url(" + file.data + ")");
    vid.style("display","none");
  } else if (file.type === 'video') {
    vid.style("display", "block");
    vid.html("<source src='" + file.name + "' type='video/mp4'>");
  }
}

function keyPressed() {
  spl.push(key);
  if (keyCode == DELETE || keyCode == BACKSPACE){
    spl.splice(-1,1);
    spl.pop();
  }
  console.log(spl);
  
}

function draw() {
	clear();
	translate(width/2, height/2);

	for(let s = 0; s < spl.length; s++){
		for (var i = 0; i < 64; i++) {
			push();
			rotate(TWO_PI * i / density.value() + rot * (s/10));
			translate(s * spacing.value() + spacing.value(), s * spacing.value());
				push();
				fill(255);
				noStroke();
				textSize(fontSize.value());
				textFont(f);

        if (spin.selected() == 'Yes') {
          rotate(rot / 2);
        } else if (spin.selected() == 'No') {
          rotate(letterRotation.value());
        }

				text(spl[s], 0, 0);
				pop();
			pop();
    }
    
    // rot = graphicRotation.value();

    if (autoPlay.selected() == 'Yes') {
      rot += vel.value() / 1000 * direction;
    } else if (autoPlay.selected() == 'No') {
      rot = graphicRotation.value();
    }
  }
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}
