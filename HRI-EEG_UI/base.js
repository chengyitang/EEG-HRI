let system_log = "";

// index
magic("startBtn", "start", "index", "mac");

// mac
magic("macBtn1", "R", "mac", "macP1");
magic("macBtn2", "IR", "mac", "macP1");

// macP1
magic("macP1Btn1", "D", "macP1", "macP2");
magic("macP1Btn2", "E", "macP1", "macP2");
magic("macP1Btn3", "X", "macP1", "macP2");

// macP2
magic("macP2Btn1", "D", "macP2", "macP3");
magic("macP2Btn2", "E", "macP2", "macP3");
magic("macP2Btn3", "X", "macP2", "macP3");

// macP3
magic("macP3Btn1", "D", "macP3", "macP4");
magic("macP3Btn2", "E", "macP3", "macP4");
magic("macP3Btn3", "X", "macP3", "macP4");

// macP4
magic("macP4Btn1", "D", "macP4", "ipad");
magic("macP4Btn2", "E", "macP4", "ipad");
magic("macP4Btn3", "X", "macP4", "ipad");

// ipad
magic("ipadBtn1", "IR", "ipad", "ipadP1");
magic("ipadBtn2", "R", "ipad", "ipadP1");

// ipadP1
magic("ipadP1Btn1", "D", "ipadP1", "ipadP2");
magic("ipadP1Btn2", "E", "ipadP1", "ipadP2");
magic("ipadP1Btn3", "X", "ipadP1", "ipadP2");

// ipadP2
magic("ipadP2Btn1", "D", "ipadP2", "ipadP3");
magic("ipadP2Btn2", "E", "ipadP2", "ipadP3");
magic("ipadP2Btn3", "X", "ipadP2", "ipadP3");

// ipadP3
magic("ipadP3Btn1", "D", "ipadP3", "ipadP4");
magic("ipadP3Btn2", "E", "ipadP3", "ipadP4");
magic("ipadP3Btn3", "X", "ipadP3", "ipadP4");

// ipadP4
magic("ipadP4Btn1", "D", "ipadP4", "download");
magic("ipadP4Btn2", "E", "ipadP4", "download");
magic("ipadP4Btn3", "X", "ipadP4", "download");


// downloadBtn onclick
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn){
  downloadBtn.addEventListener("click", () => {
    download(system_log, "test.txt");
  });
}

let click = 0; // count click

// func for all btn
function magic(btnID, event, now, next){
  let btn = document.getElementById(btnID);
  if (btn) {
    btn.addEventListener("click", () => {
       
      if (event == "start"){ // start button
        mark(event);
        move(now, next);
      } 
      else if (event == "R" || event == "IR"){
        mark(event);
        move(now, next);
      }
      else { // EDX buttons

        if (click == 0){ // first pick
          mark(event);
          click += 1;
          // call robot here...
          if (event == "E") {
            document.getElementById("robot").classList.remove("d-none");
            responsiveVoice.speak("不考慮一下折扣商品嗎？", "Chinese Female");
          }
          else if (event == "D") {
            document.getElementById("robot").classList.remove("d-none");
            responsiveVoice.speak("不考慮一下限量商品嗎？機會難得喔", "Chinese Female");
          }
          else if (event == "X"){ 
            document.getElementById("robot").classList.remove("d-none");
            responsiveVoice.speak("真的不加購商品嗎？", "Chinese Female");
          }
          else {

          }

        } else { //second pick
          document.getElementById("robot").classList.add("d-none");
          mark(event);
          move(now, next);
          click = 0;
          console.log("over");
        }
      
      }
    });
  }
}

// mark system log
function mark(e) {
  var t1 = window.performance.now();
  system_log += `${t1} ${e}\n`;
  console.log(`${t1} ${e}\n`);
}

// move to next page
function move(now, next) {
  // turn off
  document.getElementById(now).classList.add("d-none");
  // turn on
  document.getElementById(next).classList.remove("d-none");
}

// Function to download data to a file
function download(data, filename) {
  var file = new Blob([data], {type: "text/plain"});
  var a = document.createElement("a"),
          url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
  }, 0); 
}

