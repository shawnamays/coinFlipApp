
var trash = document.getElementsByClassName("fa-trash");





Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const personChoice = this.parentNode.parentNode.childNodes[1].innerText
    const flipResult = this.parentNode.parentNode.childNodes[3].innerText
    const theFinalAnswer = this.parentNode.parentNode.childNodes[5].innerText
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'personChoice': personChoice,
        'flipResult': flipResult,
        'theFinalAnswer': theFinalAnswer
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
