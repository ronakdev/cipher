var encode = true;
var str='function getFlag() {  return "flag is {omfg_stop_encrypting_stuff}";}console.log(getFlag());';
console.log("Encrypted File: " + encryptShah(str, 10));
console.log("Decrypted File: " + decryptShah(encryptShah(str,10), 10))

function checkEncode() {
    var lfckv = document.getElementById("myonoffswitch").checked;
    encode = lfckv;
}

function toggle() {
    encode = !encode;
    var state = document.getElementById("encodeState");
    if (encode) {
        state.innerHTML = "Encoding";
        state.className = "encode";
    }
    else {
        state.innerHTML = "Decoding";
        state.className = "decode";
    }
}
function toggleEncode() {
    encode = !encode;
    var checkbox = document.getElementById("myonoffswitch");
 
    
    var state = document.getElementById("encodeState");
    if (encode) {
        state.innerHTML = "Encoding";
        state.className = "encode";
    }
    else {
        state.innerHTML = "Decoding";
        state.className = "decode";
    }
}

document.getElementById('crypt').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      crypt();
      return false;
    }
}

function crypt() {
    var content = document.getElementById("crypt").value;
    var output = "";
    var level = parseInt(document.getElementById("level").value);
    if(encode) {
        output = (encryptShah(content,level));
    }
    else {
        output = decryptShah(content,level);
    }

    document.getElementById("crypt").value = output;
    toggleEncode();
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
