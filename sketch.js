// Bakeoff #3 - Escrita em Smartwatches
// IPM 2020-21, Semestre 2
// Entrega: até dia 4 de Junho às 23h59 através do Fenix
// Bake-off: durante os laboratórios da semana de 31 de Maio

// p5.js reference: https://p5js.org/reference/

// Database (CHANGE THESE!)
const GROUP_NUMBER   = 0;      // add your group number here as an integer (e.g., 2, 3)
const BAKE_OFF_DAY   = false;  // set to 'true' before sharing during the simulation and bake-off days

let PPI, PPCM;                 // pixel density (DO NOT CHANGE!)
let second_attempt_button;     // button that starts the second attempt (DO NOT CHANGE!)

// Finger parameters (DO NOT CHANGE!)
let finger_img;                // holds our finger image that simules the 'fat finger' problem
let FINGER_SIZE, FINGER_OFFSET;// finger size and cursor offsett (calculated after entering fullscreen)

// Arm parameters (DO NOT CHANGE!)
let arm_img;                   // holds our arm/watch image
let ARM_LENGTH, ARM_HEIGHT;    // arm size and position (calculated after entering fullscreen)

// Study control parameters (DO NOT CHANGE!)
let draw_finger_arm  = false;  // used to control what to show in draw()
let phrases          = [];     // contains all 501 phrases that can be asked of the user
let current_trial    = 0;      // the current trial out of 2 phrases (indexes into phrases array above)
let attempt          = 0       // the current attempt out of 2 (to account for practice)
let target_phrase    = "";     // the current target phrase
let currently_typed  = "";     // what the user has typed so far
let entered          = new Array(2); // array to store the result of the two trials (i.e., the two phrases entered in one attempt)
let CPS              = 0;      // add the characters per second (CPS) here (once for every attempt)

// Metrics
let attempt_start_time, attempt_end_time; // attemps start and end times (includes both trials)
let trial_end_time;            // the timestamp of when the lastest trial was completed
let letters_entered  = 0;      // running number of letters entered (for final WPM computation)
let letters_expected = 0;      // running number of letters expected (from target phrase)
let errors           = 0;      // a running total of the number of errors (when hitting 'ACCEPT')
let database;                  // Firebase DB

// 2D Keyboard UI
let leftArrow, rightArrow;     // holds the left and right UI images for our basic 2D keyboard   
let ARROW_SIZE;                // UI button size
let current_letter = 0;      // current char being displayed on our basic 2D keyboard (starts with 'a')

let time;
let lastTime = 0;
let toComplete;
let locked;
let clickedX;
let clickedY;

// Runs once before the setup() and loads our data (images, phrases)
function preload()
{    
  // Loads simulation images (arm, finger) -- DO NOT CHANGE!
  arm = loadImage("data/arm_watch.png");
  fingerOcclusion = loadImage("data/finger.png");
    
  // Loads the target phrases (DO NOT CHANGE!)
  phrases = loadStrings("data/phrases.txt");

  possibleWords = loadStrings("data/wordlist.txt");
  console.log("loaded");
  // Loads UI elements for our basic keyboard
  leftArrow = loadImage("data/left.png");
  rightArrow = loadImage("data/right.png");
}


function getFirstMatch(string) {
  let s = string.split(" ");
  let s2 = s[s.length-1];
  for (let index = 0; index < possibleWords.length; index++) {
    const element = possibleWords[index];
    if (element.startsWith(s2)) {
      toComplete = element;
      break;
    }
  }
}

// Runs once at the start
function setup()
{
  createCanvas(700, 500);   // window size in px before we go into fullScreen()
  frameRate(60);            // frame rate (DO NOT CHANGE!)
  
  // DO NOT CHANGE THESE!
  shuffle(phrases, true);   // randomize the order of the phrases list (N=501)
  target_phrase = phrases[current_trial];
  
  drawUserIDScreen();       // draws the user input screen (student number and display size)
}

function draw()
{
  if(draw_finger_arm)
  {
    background(255);           // clear background
    noCursor();                // hides the cursor to simulate the 'fat finger'
    
    drawArmAndWatch();         // draws arm and watch background
    writeTargetAndEntered();   // writes the target and entered phrases above the watch
    drawACCEPT();              // draws the 'ACCEPT' button that submits a phrase and completes a trial

    drawPredictedWord();
    
    // Draws the touch input area (4x3cm) -- DO NOT CHANGE SIZE!
    stroke(0, 255, 0);
    noFill();
    rect(width/2 - 2.0*PPCM, height/2 - 1.0*PPCM, 4.0*PPCM, 3.0*PPCM);


    draw2Dkeyboard();       // draws our basic 2D keyboard UI

    drawFatFinger();        // draws the finger that simulates the 'fat finger' problem
  }
}

// Draws 2D keyboard UI (current letter and left and right arrows)
function draw2Dkeyboard()
{
  // Writes the current letter
  textFont("Arial", 24 - display_size/6 );
  fill(0);
  text("_`",width/2 - 1.3*PPCM, height/2 - 0.5*PPCM)
  text("abc",width/2, height/2 - 0.5*PPCM)
  text("def",width/2 + 1.3*PPCM, height/2 - 0.5*PPCM)
  
  text("ghi",width/2 - 1.3*PPCM, height/2 +0.5*PPCM)
  text("jkl",width/2, height/2 + 0.5*PPCM)
  text("mno",width/2 + 1.3*PPCM, height/2 + 0.5*PPCM)

  text("pqrs",width/2 - 1.3*PPCM, height/2 + 1.5*PPCM)
  text("tuv",width/2, height/2 + 1.5*PPCM)
  text("wxyz",width/2 + 1.3*PPCM, height/2 + 1.5*PPCM)

  // Draws and the left and right arrow buttons
  noFill();
  imageMode(CORNER);
}

function drawPredictedWord() {
  getFirstMatch(currently_typed);

  noStroke();
  fill(255);
  rect(width/2 - 2.0*PPCM, height/2 - 2.0*PPCM, 4.0*PPCM, 1.0*PPCM);
  textAlign(CENTER);
  textFont("Arial", 16);
  fill(0);
  text(toComplete, width/2, height/2 - 1.3 * PPCM);
}

function complete() {
  currently_typed = currently_typed.substring(0,currently_typed.length-1)
  getFirstMatch(currently_typed)
  let st = currently_typed.split(" ");
  
  let newWord = "";
  for (let index = 0; index < st.length-1; index++) {
    newWord += st[index] + " ";
  }
  currently_typed = newWord + toComplete + " ";
}

function mouseReleased() {
  if (clickedY != 0 && clickedY > height/2 && mouseY < height/2)
    complete();
}

// Evoked when the mouse button was pressed
function mousePressed()
{
  time = millis();
  // Only look for mouse presses during the actual test
  if (draw_finger_arm)
  {                   
    // Check if mouse click happened within the touch input area
    if(mouseClickWithin(width/2 - 2.0*PPCM, height/2 - 1.0*PPCM, 4.0*PPCM, 3.0*PPCM))  
    {
      clickedX = mouseX;
      clickedY = mouseY;
      if(mouseClickWithin(width/2 - 2.0*PPCM, height/2 - 1.0*PPCM, 4.0*PPCM/3, 3.0*PPCM/3)) { //space
        if (time-lastTime > 700 && (current_letter == '_' || current_letter == '`')) {
          current_letter = 0;
        }
        switch (current_letter) {
          case '_':
            current_letter = '0';
            currently_typed = currently_typed.replace(/.$/,'');
            currently_typed = currently_typed.replace(/.$/,'');
            break;
          default:
            current_letter = '_';
            currently_typed += " ";
            break;
        }
      }
      else if (mouseClickWithin(width/2 - 2.0*PPCM +4.0*PPCM/3, height/2 - 1.0*PPCM, 4.0*PPCM/3, 3.0*PPCM/3)) { // abc
        if (time-lastTime > 600 && (current_letter == 'a' || current_letter == 'b' || current_letter == 'c')) {
          current_letter = 0;
        }
        switch (current_letter) {
          case 'a':
            current_letter = 'b';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'b':
            current_letter = 'c';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'c':
            current_letter = 'a';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          default:
            current_letter = 'a';
            currently_typed += current_letter;
            break;
        }
      }

      else if (mouseClickWithin(width/2 - 2.0*PPCM + 4.0*PPCM*2/3, height/2 - 1.0*PPCM, 4.0*PPCM/3, 3.0*PPCM/3)) { // def
        if (time-lastTime > 600 && (current_letter == 'd' || current_letter == 'e' || current_letter == 'f'))
          current_letter = 0;
        switch (current_letter) {
          case 'd':
            current_letter = 'e';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'e':
            current_letter = 'f';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'f':
            current_letter = 'd';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          default:
            current_letter = 'd';
            currently_typed += current_letter;
            break;
        }
      }
      
      else if(mouseClickWithin(width/2 - 2.0*PPCM, height/2 - 1.0*PPCM +3.0*PPCM/3, 4.0*PPCM/3, 3.0*PPCM/3)) { //ghi
        if (time-lastTime > 600 && (current_letter == 'g' || current_letter == 'h' || current_letter == 'i'))
          current_letter = 0;
        switch (current_letter) {
          case 'g':
            current_letter = 'h';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'h':
            current_letter = 'i';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'i':
            current_letter = 'g';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          default:
            current_letter = 'g';
            currently_typed += current_letter;
            break;
        }
      }
      else if (mouseClickWithin(width/2 - 2.0*PPCM +4.0*PPCM/3, height/2 - 1.0*PPCM + 3.0*PPCM/3, 4.0*PPCM/3, 3.0*PPCM/3)) { //jkl
        if (time-lastTime > 600 && (current_letter == 'j' || current_letter == 'k' || current_letter == 'l'))
          current_letter = 0;
        switch (current_letter) {
          case 'j':
            current_letter = 'k';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'k':
            current_letter = 'l';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'l':
            current_letter = 'j';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          default:
            current_letter = 'j';
            currently_typed += current_letter;
            break;
        }
      }

      else if (mouseClickWithin(width/2 - 2.0*PPCM + 4.0*PPCM*2/3, height/2 - 1.0*PPCM + 3.0*PPCM/3, 4.0*PPCM/3, 3.0*PPCM/3)) { //mno
        if (time-lastTime > 600 && (current_letter == 'm' || current_letter == 'n' || current_letter == 'o'))
          current_letter = 0;
        switch (current_letter) {
          case 'm':
            current_letter = 'n';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'n':
            current_letter = 'o';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'o':
            current_letter = 'm';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          default:
            current_letter = 'm';
            currently_typed += current_letter;
            break;
        }
      }
      else if(mouseClickWithin(width/2 - 2.0*PPCM, height/2 - 1.0*PPCM +3.0*PPCM*2/3, 4.0*PPCM/3, 3.0*PPCM/3)) { //pqrs
        if (time-lastTime > 600 && (current_letter == 'p' || current_letter == 'q' || current_letter == 'r' || current_letter == 's'))
          current_letter = 0;
        switch (current_letter) {
          case 'p':
            current_letter = 'q';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'q':
            current_letter = 'r';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'r':
            current_letter = 's';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 's':
            current_letter = 'p';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          default:
            current_letter = 'p';
            currently_typed += current_letter;
            break;
        }
      }
      else if (mouseClickWithin(width/2 - 2.0*PPCM +4.0*PPCM/3, height/2 - 1.0*PPCM + 3.0*PPCM*2/3, 4.0*PPCM/3, 3.0*PPCM/3)) { //tuv
        if (time-lastTime > 600 && (current_letter == 't' || current_letter == 'u' || current_letter == 'v'))
          current_letter = 0;
        switch (current_letter) {
          case 't':
            current_letter = 'u';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'u':
            current_letter = 'v';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'v':
            current_letter = 't';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          default:
            current_letter = 't';
            currently_typed += current_letter;
            break;
        }
      }

      else if (mouseClickWithin(width/2 - 2.0*PPCM + 4.0*PPCM*2/3, height/2 - 1.0*PPCM + 3.0*PPCM*2/3, 4.0*PPCM/3, 3.0*PPCM/3)) { //wxyz
        if (time-lastTime > 600 && (current_letter == 'w' || current_letter == 'x' || current_letter == 'y' || current_letter == "z"))
          current_letter = 0;
        switch (current_letter) {
          case 'w':
            current_letter = 'x';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'x':
            current_letter = 'y';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'y':
            current_letter = 'z';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          case 'z':
            current_letter = 'w';
            currently_typed = currently_typed.replace(/.$/,current_letter);
            break;
          default:
            current_letter = 'w';
            currently_typed += current_letter;
            break;
        }
      }
    }

    // Check if mouse click happened within 'ACCEPT' 
    // (i.e., submits a phrase and completes a trial)
    else if (mouseClickWithin(width/2 - 2*PPCM, height/2 - 5.1*PPCM, 4.0*PPCM, 2.0*PPCM))
    {
      clickedX = mouseX;
      clickedY = mouseY;
      // Saves metrics for the current trial
      letters_expected += target_phrase.trim().length;
      letters_entered += currently_typed.trim().length;
      errors += computeLevenshteinDistance(currently_typed.trim(), target_phrase.trim());
      entered[current_trial] = currently_typed;
      trial_end_time = millis();

      current_trial++;

      // Check if the user has one more trial/phrase to go
      if (current_trial < 2)                                           
      {
        // Prepares for new trial
        currently_typed = "";
        target_phrase = phrases[current_trial];  
      }
      else
      {
        // The user has completed both phrases for one attempt
        draw_finger_arm = false;
        attempt_end_time = millis();
        
        printAndSavePerformance();        // prints the user's results on-screen and sends these to the DB
        attempt++;

        // Check if the user is about to start their second attempt
        if (attempt < 2)
        {
          second_attempt_button = createButton('START 2ND ATTEMPT');
          second_attempt_button.mouseReleased(startSecondAttempt);
          second_attempt_button.position(width/2 - second_attempt_button.size().width/2, height/2 + 200);
        }
      }
    }
    else {
      clickedX = 0;
      clickedY = 0;
    }
  }
  lastTime = time;
}

// Resets variables for second attempt
function startSecondAttempt()
{
  // Re-randomize the trial order (DO NOT CHANG THESE!)
  shuffle(phrases, true);
  current_trial        = 0;
  target_phrase        = phrases[current_trial];
  
  // Resets performance variables (DO NOT CHANG THESE!)
  letters_expected     = 0;
  letters_entered      = 0;
  errors               = 0;
  currently_typed      = "";
  CPS                  = 0;
  
  current_letter       = 'a';
  
  // Show the watch and keyboard again
  second_attempt_button.remove();
  draw_finger_arm      = true;
  attempt_start_time   = millis();  
}

function thank() {
  let opinion = comments_input.value()
  submit_button.remove();
  comments_input.remove();
  text("Thank you for your participation!",width/2, 900);
  
  let c = color(0, 0, 0);
  fill(c);
  noStroke();
  ellipse(width/2,800,width,40,1);

  let db_ref = database.ref("Opinions");
  db_ref.push(opinion);
}

// Print and save results at the end of 2 trials
function printAndSavePerformance()
{
  // DO NOT CHANGE THESE
  let attempt_duration = (attempt_end_time - attempt_start_time) / 60000;          // 60K is number of milliseconds in minute
  let wpm              = (letters_entered / 5.0) / attempt_duration;      
  let freebie_errors   = letters_expected * 0.05;                                  // no penalty if errors are under 5% of chars
  let penalty          = max(0, (errors - freebie_errors) / attempt_duration); 
  let wpm_w_penalty    = max((wpm - penalty),0);                                   // minus because higher WPM is better: NET WPM
  let timestamp        = day() + "/" + month() + "/" + year() + "  " + hour() + ":" + minute() + ":" + second();
  
  background(color(0,0,0));    // clears screen
  cursor();                    // shows the cursor again
  
  textFont("Arial", 16);       // sets the font to Arial size 16
  fill(color(255,255,255));    //set text fill color to white
  text(timestamp, 100, 20);    // display time on screen 
  
  text("Finished attempt " + (attempt + 1) + " out of 2!", width / 2, height / 2); 
  
  // For each trial/phrase
  let h = 20;
  for(i = 0; i < 2; i++, h += 40 ) 
  {
    text("Target phrase " + (i+1) + ": " + phrases[i], width / 2, height / 2 + h);
    text("User typed " + (i+1) + ": " + entered[i], width / 2, height / 2 + h+20);
  }
  
  text("Raw WPM: " + wpm.toFixed(2), width / 2, height / 2 + h+20);
  text("Freebie errors: " + freebie_errors.toFixed(2), width / 2, height / 2 + h+40);
  text("Penalty: " + penalty.toFixed(2), width / 2, height / 2 + h+60);
  text("WPM with penalty: " + wpm_w_penalty.toFixed(2), width / 2, height / 2 + h+80);

  if (attempt > 0) {
    
    text("If you have any suggestions or advices that would increase your performance, please write them down below.", width/2, 800);
    comments_input = createInput('');                                 // create input field
    comments_input.position(width/2-200, 830);
    comments_input.size(400,30);
    submit_button = createButton('SUBMIT');
    submit_button.position(width/2 - submit_button.width/2, 900);
    submit_button.mouseReleased(thank);
  }

  // Saves results (DO NOT CHANGE!)
  let attempt_data = 
  {
        project_from:         GROUP_NUMBER,
        assessed_by:          student_ID,
        attempt_completed_by: timestamp,
        attempt:              attempt,
        attempt_duration:     attempt_duration,
        raw_wpm:              wpm,      
        freebie_errors:       freebie_errors,
        penalty:              penalty,
        wpm_w_penalty:        wpm_w_penalty,
        cps:                  CPS
  }
  
  // Send data to DB (DO NOT CHANGE!)
  if (BAKE_OFF_DAY)
  {
    // Access the Firebase DB
    if (attempt === 0)
    {
      firebase.initializeApp(firebaseConfig);
      database = firebase.database();
    }
    
    // Add user performance results
    let db_ref = database.ref('G' + GROUP_NUMBER);
    db_ref.push(attempt_data);
  }
  else
  {
      // Change the firebase config
      var firebaseConfig = {
        apiKey: "AIzaSyAXut58LmRSwNrNWa56WH8hiPya4OuhAbQ",
        authDomain: "bakeoff3-1c7b1.firebaseapp.com",
        databaseURL: "https://bakeoff3-1c7b1-default-rtdb.europe-west1.firebasedatabase.app/",
        storageBucket: "bakeoff3-1c7b1.appspot.com"
      };
      if (attempt === 0)
      {
          firebase.initializeApp(firebaseConfig);
          database = firebase.database();
      }
      // Add user performance results
      let db_ref = database.ref("First Iteration");
      db_ref.push(attempt_data);
      var topUserPostsRef = firebase.database().ref("First Iteration").orderByChild('wpm_w_penalty').limitToLast(10);
  }
  if (attempt >= 1)
  {
    textFont("Arial", 18);
    text ("Leaderboards", width/2, 165);
    var yIncrease = 25;
    var places = 10;
    topUserPostsRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var name = childSnapshot.val().assessed_by;
            var score = childSnapshot.val().wpm_w_penalty;
            text(places + " - " + name+ " with "+ score.toFixed(4) + " words per minute.", width/2, 480-yIncrease);
            places -= 1;
            yIncrease += 28;
        });
    });
  }
}

// Is invoked when the canvas is resized (e.g., when we go fullscreen)
function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  let display    = new Display({ diagonal: display_size }, window.screen);
  
  // DO NO CHANGE THESE!
  PPI           = display.ppi;                        // calculates pixels per inch
  PPCM          = PPI / 2.54;                         // calculates pixels per cm
  FINGER_SIZE   = (int)(11   * PPCM);
  FINGER_OFFSET = (int)(0.8  * PPCM)
  ARM_LENGTH    = (int)(19   * PPCM);
  ARM_HEIGHT    = (int)(11.2 * PPCM);
  
  ARROW_SIZE    = (int)(2.2 * PPCM);
  
  // Starts drawing the watch immediately after we go fullscreen (DO NO CHANGE THIS!)
  draw_finger_arm = true;
  attempt_start_time = millis();
}