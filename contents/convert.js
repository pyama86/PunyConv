document.addEventListener('mouseup', function(){
  var sword = new RegExp(
      '[\u002E\u0589\u06D4\u0701\u0702\u1362\u166E\u1803'
    + '\u1809\u2CF9\u2CFE\u3002\uFE12\uFE52\uFF0E\uFF61]'
  );
  var str = window.getSelection().toString().replace(/[\n\r\s]/g,"");
  var words = str.toLowerCase().split(sword);

  //日本語ドメインなら
  if(str.match(/.*[亜-熙ぁ-んァ-ヶ]+.*\.[A-Za-z]+/)){
    for (var i = 0, l = words.length; i < l; i++){
        if (! words[i].match(/[^0-9a-z\-]/)) continue;
        words[i] = 'xn--' + Punycode.encode(words[i]);
    }
    chrome.runtime.sendMessage({
      text: words.join('.')
    });
  //punyコードなら
  }else if(str.match(/.*xn--.*\.[A-Za-z]+/)){
    for (var i = 0, l = words.length; i < l; i++){
      words[i].replace(/xn--([0-9a-z\-]+)/g, function(m0, m1){
        words[i] = Punycode.decode(m1);
      });
    }
    chrome.runtime.sendMessage({
      text: words.join('.')
    });
  }
}, false);
