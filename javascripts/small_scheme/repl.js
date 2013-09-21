
var Repl = {};
// Replの状態を管理
Repl.states = {};
Repl.states.enableUpdate = true;
Repl.states.enablePost = true;


(function() {

  var $ = function (id) { return document.getElementById(id); };
  var m_replEachInputWaitTime;
  var m_replHistory = [null];
  var m_histIndex   = 0;

  // 出力
  var print = function (txt, className) {
    var resultNode = $("repl-output");
    var preNode = document.createElement("pre");
    preNode.setAttribute("class", className);
    var codeNode = document.createElement("code");

    codeNode.setAttribute("class", 'repl-output-code lisp');
    codeNode.innerHTML = txt;

    preNode.appendChild(codeNode);
    resultNode.appendChild(preNode);
    hljs.highlightBlock(codeNode);
  };

  var printOutput = function (txt) {
    print(txt, 'repl-output');
  };

  var evalTextArea = function (command) {
    if (!replEnabled)
      return;
    var input = $('repl-input');
    input.value = command;
    replEval(input);
    input.focus();
  };

  var printEvaluationResult = function(inputTxt) {
    var outputTxt = YKS.main(inputTxt);
    // str removed commet and retrun the removed str.
    printOutput(inputTxt.replace(/[;].*$/g, '') + " ;; => " + outputTxt);
  };

  // inputTextAreaKey handler
  var inputTextAreaKeyHandler = function (event) {
    // 改行
    if (event.keyCode === 14 || event.keyCode === 13) {

      // なにも入力されていない場合(空白)
      if (!!event.target.value.match(/^[\s\t]*$/)) {
        printOutput('ぬ');
        var savedY = window.scrollY;
        // スクロール
        smoothScrollY(savedY,
                      getScrollMaxY());
        return;
      }
      replEval(event.target);
      return;
    }
    else if (event.keyCode === 38 || event.keyCode === 40) {
      // trail back history
      // 40 => down
      // 38 => up
      trailHistory(event.keyCode === 38);
    } else {
      m_replHistory[0] = null;
    }
  };

  // trail hitory
  var trailHistory = function (back) {
    m_histIndex += back ? -1 : 1;

    if (m_histIndex < 0)
      m_histIndex = m_replHistory.length - 1;
    else if (m_histIndex >= m_replHistory.length)
      m_histIndex = 0;

    insertHistoryToInputArea();
  };

  // insert to textarea
  var insertHistoryToInputArea = function () {
    var inputNode = $('repl-input');
    
    if (m_replHistory[0] === null)
      m_replHistory[0] = inputNode.value;

    inputNode.value = m_replHistory[m_histIndex];
  };

  var replEval = function (input) {
    var inputCode  = input.value;

    try {
      printEvaluationResult(inputCode);
    } catch (x) {
      printOutput(x);
      printOutput(inputCode + ' ;; => erorr!');
      throw x;
    }

    if (inputCode)
      m_replHistory.push(inputCode);
    m_histIndex = 0;
    input.value = "";

    var savedY = window.scrollY;
    // スクロール
    smoothScrollY(savedY,
                  getScrollMaxY());
  };

  var safeScrollToY = function (y) {
    if (y > 0) {
      window.scrollTo(window.scrollX, y);
    }
  };

  var getScrollMaxY = function () {
    return window.scrollMaxY ||
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
  };
  var replScrollTimer = null;

  // 以下のURLの内容を参考にした
  // http://piro.sakura.ne.jp/latest/blosxom/mozilla/xul/2009-04-08_tween.htm
  var smoothScrollY = function (from, to) {
    var delta = to - from;

    var duration = Math.max(delta * 0.5, 200);
    var startTime = +new Date();

    if (replScrollTimer)
      window.clearInterval(replScrollTimer), replScrollTimer = null;

    replScrollTimer = window.setInterval(
      function () {
        var progress = Math.min(1, (+new Date() - startTime) / duration);
        var y = (progress === 1) ? to : from + (delta * progress);
        safeScrollToY(y);
        if (progress === 1) {
          window.clearInterval(replScrollTimer);
        }
      }, 32);
  };

  // this function exec after window onload
  jQuery(function () {
    var inputNode = $("repl-input");
    inputNode.addEventListener("keyup", inputTextAreaKeyHandler, false);

    printOutput("うねうね");

    printEvaluationResult("(define twice (lambda (x) (* x x 2)))");
    printEvaluationResult("(twice 5) ;; hoge");
    printEvaluationResult('(define make-counter (lambda (n) (lambda () (set! n (+ 1 n)) n)))');
    printEvaluationResult('(define counter (make-counter 100))');
    printEvaluationResult('(counter)');
    printEvaluationResult('(counter)');
    printEvaluationResult('(define counter2 (make-counter 100))');
    printEvaluationResult('(counter2)');
    printEvaluationResult('(counter)');

  });
}());

