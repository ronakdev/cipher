var encode = true;
function toggleEncode() {
    encode = !encode;
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
        output = (encrypt(content));
    }
    else {
        output = decrypt(content);
    }
    console.log(output);
    
    document.getElementById("crypt").value = output;
    //encode = !encode;
}

function encrypt(input) {
    var array = input.split("");
    
    var output = [];

    output[0] = array[array.length - 1];
    output[1] = array[array.length - 2];
    
    for(var j = 0; j < array.length - 2; j++) {
        output[j + 2] = array[j]
    }
    var result = output.join("");
    return result;
}
function decrypt(input) {
    var array = input.split("");
    
    var output = [];

    output[array.length - 1] = array[0];
    output[array.length - 2] = array[1];
    
    for(var j = 0; j < array.length - 2; j++) {
        output[j] = array[j + 2];
    }
    var result = output.join("");
    return result;
}