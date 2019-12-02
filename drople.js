  document.querySelector('#file').addEventListener('change', e => {
    upload(e.target)
  })

  function upload(e) {
    let file = e.files[0];

    let fd = new FormData();
    fd.append('file', file);

    let xhr = new XMLHttpRequest();

    xhr.open('PUT', 'http://localhost:1337/upload-portfile', true);

    xhr.upload.addEventListener("loadstart", progress, false);
    xhr.upload.addEventListener("progress", progress, false);
    xhr.upload.addEventListener("load", progress, false);
    xhr.upload.addEventListener("error", error, false);

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = this.responseText;

        console.log(response)
      } else if (this.status == 500) {
        console.log('Server Error')
      }

    }

    xhr.send(fd);
  }

  function progress(e) {
    console.log(Math.round(e.loaded / e.total * 100))
  }

  function error(e) {
    console.log('Oops! something went wrong');
  }