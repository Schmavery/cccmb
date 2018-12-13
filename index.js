var title = `
<img src="./assets/title.jpg" usemap="#image-map">
<map name="image-map">
    <area target="" alt="start" title="start" coords="1000,700,0,0" shape="rect">
</map>`;

var yard = `
<img src="./assets/yard.jpg" usemap="#image-map">
<map name="image-map">
    <area target="" alt="rik" title="rik"  coords="118,39,335,551" shape="rect">
    <area target="" alt="bbq" title="bbq"  coords="385,359,548,523" shape="rect">
    <area target="" alt="mardy" title="mardy"  coords="737,235,870,554" shape="rect">
    <area target="" alt="arrow" title="arrow"  coords="898,343,992,464" shape="rect">
</map>`;

var lab = `
<img src="./assets/lab.jpg" usemap="#image-map">
<map name="image-map">
    <area target="" alt="mardy" title="mardy" coords="831,321,954,610" shape="rect">
    <area target="" alt="key" title="key" coords="313,458,313,543,434,506,426,426" shape="poly">
    <area target="" alt="window" title="window" coords="186,90,385,244" shape="rect">
    <area target="" alt="portal" title="portal" coords="55,494,80,451,99,220,72,52,3,22,8,490" shape="poly">
    <area target="" alt="stealy" title="stealy" coords="553,367,683,402,712,250,812,174,782,105,716,68,633,99,598,206,511,159,481,184,581,244" shape="poly">
    <area target="" alt="flour" title="flour" coords="337,265,445,373" shape="rect">
</map>`;


var portal = `
<img src="./assets/portal.jpg" usemap="#image-map">
<map name="image-map">
    <area target="" alt="driveway" title="driveway" coords="6,583,166,483,168,59,4,69" shape="poly">
    <area target="" alt="cash" title="cash" coords="270,235,264,289,270,407,349,427,434,377,585,400,612,306,565,169,481,203,400,169,358,173" shape="poly">
    <area target="" alt="mardy" title="mardy" coords="653,287,769,585" shape="rect">
    <area target="" alt="lab" title="lab" coords="994,251,848,261,789,306,807,457,879,546,988,550,991,436" shape="poly">
</map>`;

var driveway = `
<img src="./assets/driveway.jpg" id="driveway-image" usemap="#image-map">
<map name="image-map">
    <area target="" alt="mardy" title="mardy"  coords="789,244,920,568" shape="rect">
    <area target="" alt="ship" title="ship"  coords="160,290,101,315,94,416,151,456,383,418,489,315,372,236,358,183,319,147,253,140,198,166,167,209,154,250" shape="poly">
    <area target="" alt="lab" title="lab"  coords="653,264,432,262,376,228,352,161,319,139,277,130,230,135,212,149,179,173,174,33,659,31,660,139" shape="poly">
    <area target="" alt="yard" title="yard"  coords="93,131,2,41" shape="rect">
</map>`;

var currentScene;
var gamestate = {
  cash: false,
  key: false,
  plumbus: false,
};

function showDialogue(acc, callback){
  var dialogue = document.getElementById("dialogue");
  var clickdiv = document.getElementById("clicker");
  if (acc.length > 0) {
    let [[person, text], ...rest] = acc;
    clicker.onclick = () => showDialogue(rest, callback);
    clicker.style.display = "inline"
    dialogue.style.display = "inline";
    var maxAudio = 0;
    switch (person) {
      case "Mardy": maxAudio = 6;
      case "Rik": maxAudio = 5;
      case "Steelee": maxAudio = 2;
    };
    let audiofile = person + (((Math.random() * maxAudio) | 0) + 1);
    let audiotag = "<audio src='./assets/" + audiofile + ".m4a' autoplay ></audio>";
    let imagetag = "<img src='./assets/" + person + ".png' width=80px height=80px style='float:left'></img>";
    let texttag = "<div style='font-size:150%'>" + text + "</div>";
    dialogue.innerHTML = audiotag + imagetag + texttag;
  } else {
    clicker.onclick = null;
    clicker.style.display = "none"
    dialogue.style.display = "none";
    dialogue.innerHTML = "";
    if (callback) callback()
  }
}

function click(thing) {
  switch(currentScene) {
    case "title":
      document.getElementById("music").innerHTML = null;
      return setScene("yard");
    case "yard":
      switch(thing) {
        case "rik":
          if (gamestate.plumbus) {
            return showDialogue([
              ["Rik", "Thanks Mardy"]
            ], () => {
              document.getElementById("music").innerHTML = "<audio src='./assets/music.m4a' autoplay volume=0.3 />";
              setScene("title");
              return showDialogue([
                ["Rik", "Thanks for playing guys"],
                ["Mardy", "Yeah I-I-I hope this was fun. Tune in maybe next week or something"],
                ["Rik", "Haha yeah and uhh.. don't do drugs or something."]
                ["Mardy", "And stay in school!"],
                ["Rik", "No Mardy, you idiot, weren't you *burp* listening earlier, don't waste yo*burp*ur time in school."]
              ], () => {
                gamestate = {
                  cash: false,
                  key: false,
                  plumbus: false,
                };
              });
            });
          } else {
            return showDialogue([
              ["Rik", "Hey Mardy, how 'bout you stop being a useless turd of a grandson and and and and help me bake these cookies."],
              ["Mardy", "Uhhh, Rik, I have an exam, I don't know if I have time to help you."],
              ["Rik", "Stop wasting your potential with school and go get me a plombuss for my plumboos-chip cookies."],
            ]);
          }
        case "bbq":
          return showDialogue([
            ["Rik", "Don't touch my barbecue."]
          ]);
        case "mardy":
          return showDialogue([
            ["Mardy", "Ooo that tickles."]
          ]);
        case "arrow":
          return setScene("driveway")
      };
      break;
    case "lab":
      switch(thing) {
        case "window":
          return setScene("yard")
        case "stealy":
          if (gamestate.key) {
            return showDialogue([
              ["Steelee", "Oh hey, we're done today's adventure, come back when you have more random things to buy."]
            ]);
          } else if (gamestate.cash){
            gamestate.key = true;
            return showDialogue([
              ["Steelee", "It seems quiet and safe here, I'll give you this key for those 12 greples..."],
              ["Mardy", "You have this weird improvisional tone when you speak but anyway here you go."],
              ["Steelee", "Here's the key, hope you like it."]
            ]);
          } else {
            return showDialogue([
              ["Steelee", "Hey, I'm Steelee. I have some common objects, like such as this key."],
              ["Steelee", "I want at least 12... greples for it."]
            ]);
          }
        case "mardy":
          return showDialogue([
            ["Mardy", "Did you say 'plambuss chip cookies'?"],
            ["Rik", "Yes and they're the best in the wooo*burp*ooorld baby!"]
          ]);
        case "portal":
          return setScene("portal");
        case "key":
          return showDialogue([
            ["Mardy", "Huh, looks like there are no keys in this key box of sorts."]
          ]);
        case "flour":
          return showDialogue([
            ["Rik", "*burp* Mardy stop this nonsense, I don't need any flour."]
          ]);
      };
      break;
    case "portal":
      switch(thing) {
        case "driveway": return setScene("driveway")
        case "lab": return setScene("lab")
        case "cash":
          if (gamestate.cash) {
            return showDialogue([
              ["Mardy", "Mmmh maybe I could get just a few more..."],
              ["Rik", "Wowowow Mardy that's super impolite in that uuu*burp*niverse, you can only steal once."]
            ]);
          } else {
            gamestate.cash = true;
            return showDialogue([
              ["Mardy", "Oh look, a portal to a bank, how convenient. I'll take a couple greples."],
              ["Rik", "Careful Mardy, in that universe people turn into giant bags of money when they die, so this is effectively a cemetery."]
            ]);
          }
        case "mardy":
          return showDialogue([
            ["Mardy", "I feel like I'm not respected for my efforts here."],
            ["Rik", "Watch out Mardy, you're starting to sound like your dad."]
          ]);
      };
      break;
    case "driveway":
      switch(thing) {
        case "yard": return setScene("yard")
        case "lab": return setScene("lab")
        case "mardy":
          return showDialogue([
            ["Rik", "Hey stop touching yourself Mardy, eeeeeveryone can see you!"]
          ]);
        case "ship":
          if (gamestate.key) {
            gamestate.plumbus = true;
            showDialogue([
              ["Mardy", "Looks like Mr Steelee's key fits the spaceship's keyhole!"],
              ["Mardy", "Got the plumbiss!."]
            ]);
            return setScene("driveway");

          } else {
            return showDialogue([
              ["Mardy", "Looks like Rik's spaceship is locked. I can't get the plambus in there."],
              ["Mardy", "Maybe I can find a key somewhere."]
            ]);
          }
      };
      break;
  };
}

function setScene(scene) {
  currentScene = scene;
  var root = document.getElementById("scene");
  switch(scene) {
    case "yard":
      root.innerHTML = yard;
      break;
    case "lab":
      root.innerHTML = lab;
      break;
    case "portal":
      root.innerHTML = portal;
      break;
    case "driveway":
      root.innerHTML = driveway;
      if (gamestate.plumbus) {
        document.getElementById("driveway-image").src = "./assets/driveway-noplumbus.png"
      }
      break;
    case "title":
      root.innerHTML = title;
      break;
  };
  let areas = root.getElementsByTagName("area");
  for (let i in areas) {
    areas[i].onclick = () => click(areas[i].title);
  }
}

window.onload = function () {
  setScene("title");
};
