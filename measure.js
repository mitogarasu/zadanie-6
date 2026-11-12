(function () {
  var dcl = 0, load = 0, styled = 0;

  (function check() {
    if (document.body && getComputedStyle(document.body).getPropertyValue('--styled').trim() === '1') {
      styled = performance.now();
      window.__styledAt = styled;
      show();
      return;
    }
    requestAnimationFrame(check);
  })();

  document.addEventListener('DOMContentLoaded', function () {
    dcl = performance.now();
    show();
  });

  window.addEventListener('load', function () {
    load = performance.now();
    show();
  });

  function show() {
    if (!document.body) return;
    var box = document.getElementById('measure-box');
    if (!box) {
      box = document.createElement('div');
      box.id = 'measure-box';
      box.style.cssText = 'position:fixed;left:0;bottom:0;z-index:9999;padding:8px 12px;background:#141414;color:#fff;font:13px monospace';
      document.body.appendChild(box);
    }
    box.innerHTML = 'DOMContentLoaded: ' + dcl.toFixed(1) + ' мс<br>load: ' +
      (load ? load.toFixed(1) + ' мс' : '...') + '<br>стили применены: ' +
      (styled ? styled.toFixed(1) + ' мс' : '...');
    document.title = 'DCL ' + dcl.toFixed(1) + ' | load ' + (load ? load.toFixed(1) : '-') +
      ' | css ' + (styled ? styled.toFixed(1) : '-');
  }
})();
