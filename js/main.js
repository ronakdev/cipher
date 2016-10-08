var encode = true;

function toggleEncode() {
    encode = !encode;
    document.getElementById('myonoffswitch').click();
    var checkbox = document.getElementById("myonoffswitch");
    checkbox.checked = true;
    if (encode) {
        document.getElementById("action").innerHTML = "Encode";
    }
    else {
        document.getElementById("action").innerHTML = "Decode";
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
    console.log(content);
    if(encode) {
        output = (encrypt(content,10));
    }
    else {
        output = decrypt(content,10);
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

//Complete, need decrypt for this to function properly though
function encryptShah(input, level) {
    var array = input.split("");
    var output = [];
    var last = 0;
    var index = 0;
    for (var j = 0; j < array.length; j+=2) { //0246
        output[index] = array[j];
        index++;
    }
    
    console.log("Midtier Encrypt: " + output.join(""));

    for (var j = 1; j < array.length; j+=2) { //1357
        output[index] = array[j];
        index++;
    }
    //console.log("Tier 2 Encrypt: " + output.join("")); //debug, not needed anymore

    output = shift(output.join(""), level).split("");
    output = output.reverse();
    return output.join("");
}

//TODO: Finish
function decryptShah(input, level) {
    var array = input.split("");
    array = array.reverse();
    var output = (shift(array.join(""), (level * -1))).split("");
    //console.log("Tier 2 Decrypt: " + output.join("")); //debug, not needed anymore
    //Works up to here
    
    array = output;
    output = [];
    var index = 1;
    for (var j = 0; j < array.length; j++) { //0246
        output[j] = array[index];
        index+= 2;
    }
    console.log("Midtier Decrypt: " + output.join(""));

    index = 0;
    for (var j = 1; j < array.length; j++) { //1357
        output[j] = array[index];
        index+= 2;
    }
    
    return output.join("");
    
}