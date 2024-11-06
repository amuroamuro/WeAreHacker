//시스템바 불러오기
const helpButton = document.querySelector(".helpButton");
const cash = document.querySelector(".cash");

//아웃풋 불러오기
const output = document.querySelector("#output");

//프롬프트 불러오기
const typeCode = document.querySelector("#typeCode");
const run = document.querySelector("#run");

//환경변수 정의
let server = false;
let serverLoad = 0;
let level = 1;
let hackingTool = false;
let myCash = 0;
let serverCash = 10;
let loop = false;
let loopNumber = 0;
let commend = "";
let numberN = 0;
let crashing = false;
let crashingKey = false;
let crash = 0;
let key = 0;

//function정의
function messge() {
    alert("Please read to README file.");
}

function error() {
    alert("Holy shit! Error!")
}

function Output(text) {
    output.innerText = text;
}

function newKey(){
    key = Math.floor(Math.random() * 10 + 1);
    //Math.random 0~1 사이의 난수 생성
    //Math.floor 소수점을 내림시켜 정수로 만듦
}

function Run() {
    commend = typeCode.value;
    
    if(server) {
        if(commend=="level"){
            Output(level.toString());
        }else if(commend=="crash"){
            if(!level==1){
                crashingKey = true;
                crash = 0;
                newKey();
                Output("Write down password.");
            }else{
                error();
            }
        }else if(crashingKey){
            numberN = Number(commend);
            
            if(isNaN(numberN)){
                if(commend=="password"){
                    Output(key.toString());
                }else{
                    error();
                }
            }else{
                crash = numberN;
                if(key==numberN){
                    crashing = true;
                    crashingKey = false;
                    Output("Enter your level now");
                }else{
                    Output("It's not password");
                }
            }
        }else if(crashing){
            numberN = Number(commend);
            
            if(isNaN(numberN)){
                if(commend=="level"){
                    Output(level.toString());
                }else{
                    error();
                }
            }else{
                crash = numberN;
                if(level==numberN){
                    crashing = false;
                    crashingKey = false;
                    Output("Complate!");
                }else{
                    Output("This is not this level");
                }
            }
        }else if(level==1){
            if(commend=="hack"){
                hackingTool = true;
                Output("We planted a hacking tool!!");
            }else if(commend=="down"){
                serverCash += 1;
                Output("Server cash increases by 1!");
            }else if(commend=="get"){
                myCash += serverCash;
                serverCash = 0;
                server = false;
                serverLoad = 0;
                Output("I don't need this server anymore, so I'll throw it away.");
                cash.innerText = "cash : " + myCash;
            }
        }
    } else {
        if(serverLoad==0){
            if(commend=="server"){
                serverCash = 9;
                serverLoad = 1;
                Output("good! Write down your level quickly!");
            } else{
                error();
            }
        }else if(serverLoad==1){
            numberN = Number(commend);
            
            if(isNaN(numberN)) {
                error();
            }else {
                if(numberN>0){
                    serverLoad = 0;
                    server = true;
                    level = Math.floor(numberN);
                    serverCash += level;
                    Output("Server connection complete!");
                }else{
                    error();
                }
            }
        }
    }
}

//이벤트 리스너
helpButton.addEventListener("click", messge);
typeCode.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // 기본 동작인 새로고침 방지
        Run();  // Run 함수 호출
    }
});
run.addEventListener("click", Run);