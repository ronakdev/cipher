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
    console.log(output);
    
    document.getElementById("crypt").value = output;
    toggleEncode();
}

function encrypt(input,level) {
    var array = input.split("");
    
    var output = [];

    output[0] = array[array.length - 1];
    output[1] = array[array.length - 2];
    
    for(var j = 0; j < array.length - 2; j++) {
        output[j + 2] = array[j]
    }
        console.log("Just Swapped: " + output.join(""));

    for (var j = 0; j < output.length; j++) {
      var charcode = output[j].charCodeAt() + level;
      console.log(charcode);
      
      output[j] = String.fromCharCode(charcode);
    }
    console.log("Just Shifted: " + output.join(""));
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
    
     for (var j = 0; j < output.length; j++) {
      var charcode = output[j].charCodeAt() - level;
      console.log(charcode);
      
      output[j] = String.fromCharCode(charcode);
    }
    
    var array = [];

    array[output.length - 1] = output[0];
    array[output.length - 2] = output[1];
    
    for(var j = 0; j < array.length - 2; j++) {
        array[j] = output[j + 2];
    }
  var result = array.join("");
    return result;
}
