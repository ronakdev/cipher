var fs = require('fs');

var inputFile = process.argv[2];

getFileContent(inputFile, n)
function getFileContent(srcPath, callback) {
    fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) throw err;
        callback(data);
        }
    );
}

function copyFileContent(savPath, srcPath) {
    getFileContent(srcPath, function(data) {
        fs.writeFile (savPath, data, function(err) {
            if (err) throw err;
            console.log('complete');
        });
    });
}


function shift(input, amount) {
    var output = input.split("");
    for (var j = 0; j < output.length; j++) {
      var charcode = output[j].charCodeAt() + amount;
      output[j] = String.fromCharCode(charcode);
    }
    return output.join("");
}

function encrypt(input,level) {
    var array = input.split("");

    var output = [];

    output[0] = array[array.length - 1];
    output[1] = array[array.length - 2];

    for(var j = 0; j < array.length - 2; j++) {
        output[j + 2] = array[j]
    }
    //console.log("Just Swapped: " + output.join(""));

    output = (shift(output.join(""), level)).split("");

    output = output.reverse();

    for (var j = 0; j < output.length; j+=2) {
      output[j] = String.fromCharCode((output[j].charCodeAt() + level));
    }
    var result = output.join("");
    return result;
}

function decrypt(input, level) {
    var output = input.split("");

    for (var j = 0; j < output.length; j+=2) {
      output[j] = String.fromCharCode((output[j].charCodeAt() - level));
    }

    output = output.reverse();

    output = (shift(output.join(""), (level * -1))).split("");

    var array = [];

    array[output.length - 1] = output[0];
    array[output.length - 2] = output[1];

    for(var j = 0; j < array.length - 2; j++) {
        array[j] = output[j + 2];
    }
    var result = array.join("");
    return result;
}

/* Experimental */

//Encrypts a string to a Shah Cipher with a specified shift level
function encryptShah(input, level) {
    var array = input.split("");
    var output = [];
    var last = 0;
    var index = 0;
    console.log("Final Tier Encrypt: " + array.join(""));
    for (var j = 0; j < array.length; j+=2) { //0246
        output[index] = array[j];
        index++;
    }


    for (var j = 1; j < array.length; j+=2) { //1357
        output[index] = array[j];
        index++;
    }

    output = shift(output.join(""), level).split("");
    output = output.reverse();
    return output.join("");
}

//Decrypts a Shah Cipher string for a shift level
function decryptShah(input, level) {
    var array = input.split("");
    array = array.reverse();
    var output = (shift(array.join(""), (level * -1))).split("");
    //Works up to here

    array = output;
    output = [];
    var index = 0;
    var temp = 0;
    for (var j = 0; j < array.length; j++) {
        if (!(index < array.length)) {
            //alert("break");
            break;
        }
        output[index] = array[j];
        index += 2;
        temp = j;
    }

    index = 1;
    temp++;
    for (var j = temp; j < array.length; j++) {
        if (!(index < array.length)) {
            break;
        }
        output[index] = array[j];
        index+= 2;
    }

    return output.join("");

}
