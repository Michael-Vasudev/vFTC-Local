UnityInstance = null;
var alreadySetPlayMode = false;
function check() {
    if (UnityInstance != null) {
        var playMode = localStorage.getItem('playMode');
        if (playMode == "Autonomous" && !alreadySetPlayMode) {
            UnityInstance.SendMessage("Main Menu", "changeSinglePlayer");
            alreadySetPlayMode = true;
        } else if (playMode == "TeleOp" && !alreadySetPlayMode) {
            alert("VRS Multiplayer is optimized with fullscreen mode. Please click on the blue button below the game window.");
            alreadySetPlayMode = true;
        }
        setTimeout(writeMotorPowers, 500);
    } else {
        setTimeout(check, 500);
    }
}

check();

function writeMotorPowers() {
    var motorPowers = JSON.parse(localStorage.getItem('motorPowers'));
    var motor1 = motorPowers[Object.keys(motorPowers)[0]];
    var motor2 = motorPowers[Object.keys(motorPowers)[1]];
    var motor3 = motorPowers[Object.keys(motorPowers)[2]];
    var motor4 = motorPowers[Object.keys(motorPowers)[3]];
    // var motor5 = motorPowers[Object.keys(motorPowers)[0]];
    // var motor6 = motorPowers[Object.keys(motorPowers)[0]];
    // var motor7 = motorPowers[Object.keys(motorPowers)[0]];
    // var motor8 = motorPowers[Object.keys(motorPowers)[0]];
    UnityInstance.SendMessage("PhotonNetworkPlayer(Clone)", "setFrontLeftVel", motor1);
    UnityInstance.SendMessage("PhotonNetworkPlayer(Clone)", "setFrontRightVel", motor2);
    UnityInstance.SendMessage("PhotonNetworkPlayer(Clone)", "setBackLeftVel", motor3);
    UnityInstance.SendMessage("PhotonNetworkPlayer(Clone)", "setBackRightVel", motor4);
    check();
}