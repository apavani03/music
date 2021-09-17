song="";
scoreLeftWrist=0;
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
count = 0;

function preload(){
song = loadSound("shape_of_you.mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
   // console.log("PoseNet Is Intialized");

}
    
function gotPoses(results){
        if(results.length > 0){
           console.log(results);
            leftWristx = results[0].pose.leftWrist.x;
            leftWristy = results[0].pose.leftWrist.y;
    
            console.log("Left Wrist X : "+ leftWristx);
            console.log("Left Wrist Y : "+ leftWristy);
    
    
            rightWristx = results[0].pose.rightWrist.x;
            rightWristy = results[0].pose.rightWrist.y;
    
            console.log("Right Wrist X : "+ rightWristx);
             console.log("Right Wrist X : "+ rightWristy);
             scoreLeftWrist = results[0].pose.keypoints[9].score;

        }
}
    
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#57f9ef");
    stroke("#02fdae");
    if (scoreLeftWrist > 0.2){
        console.log(scoreLeftWrist);
        circle(leftWristx, leftWristy, 20);
        Num_Left_WristY = Number(leftWristy);
        no_dec_LeftWristY = floor(Num_Left_WristY);
        new_vol = no_dec_LeftWristY / 500; 
        song.setVolume(new_vol);
        console.log(new_vol);
        document.getElementById("volume").innerHTML = " Volume : " + new_vol;
    }
}

function play_music(){
  if (count == 0){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
    count=1;
    document.getElementById("Play_Pause").innerHTML = "Pause";
  } else {
      song.pause();
      count=0;
      document.getElementById("Play_Pause").innerHTML = "Play";
  }
    
}

function stop_music(){
    song.stop();
}
