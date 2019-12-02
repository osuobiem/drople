  document.querySelector('#file').addEventListener('change', e => {
    upload(e.target)
  })

  function upload(e) {
    let file = e.files[0];

    let fd = new FormData();
    fd.append('file', file);

    let xhr = new XMLHttpRequest();

    xhr.open('PUT', 'http://localhost:1337/upload-portfile', true);

    xhr.onprogress = function () {

    };

    xhr.onload = function () {

    };

    xhr.send(fd);
  }