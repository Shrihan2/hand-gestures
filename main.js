prediction="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach('#camera')
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/UxxjYx7kS/',modelLoaded);

function modelLoaded(){
    console.log("modelLoaded!");
}

function speak(){
    var synth=window.SpeechSynthesis;
    speak_data="prediction is "+prediction;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
    }
}