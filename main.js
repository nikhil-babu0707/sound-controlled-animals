function startClassification() {
    navigator.mediaDevices.getUserMedia({ audio: true });
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/Ow_tcYiCR/model.json', { probabilityThreshold: 0.7 }, modelReady);
}

function modelReady() {
    classifier.classify(gotResults);
}

var dog = 0;
var cat = 0;

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        var r = Math.floor(Math.random() * 255) + 1;
        var g = Math.floor(Math.random() * 255) + 1;
        var b = Math.floor(Math.random() * 255) + 1;
        document.getElementById("result_label").innerHTML = "detected voice is of - " + results[0].label;
        document.getElementById("result_count").innerHTML = 'detected number of dogs - ' + dog + 'detected number of cats - ' + cat;
        document.getElementById("result_label").style.color = "rgb(" + r + "," + g + "," + b + ")";
        document.getElementById("result_count").style.color = "rgb(" + r + "," + g + "," + b + ")";
        img1 = document.getElementById("imag");
        if (results[0].label == "cat") {
            img1.src = "meow.gif";
            cat = cat + 1;
        } else if (results[0].label == "dog") {
            img1.src = "bark.gif";
            dog = dog + 1;
        } else {
            img1.src = "listen.gif";
        }
    }
}