let dro = document.getElementById('drople')
let first = true;

//  Manipulate Responsiveness
function manipResp() {
  let img = document.getElementsByClassName('drople-img')
  for (let i = 0; i < img.length; i++) {
    if (screen.width >= 768) {
      if (dro.offsetWidth <= screen.width / 2 && dro.offsetWidth > screen.width / 3) {
        img[i].setAttribute('class', 'drople-img d-col-3')
      } else if (dro.offsetWidth > screen.width / 2 && dro.offsetWidth <= screen.width) {
        img[i].setAttribute('class', 'drople-img d-col-2')
      } else if (dro.offsetWidth < screen.width / 2 && dro.offsetWidth >= screen.width / 5) {
        img[i].setAttribute('class', 'drople-img d-col-4')
      } else if (dro.offsetWidth < screen.width / 5) {
        img[i].setAttribute('class', 'drople-img d-col-12')
      }
    } else {
      if (dro.offsetWidth <= screen.width / 2) {
        img[i].setAttribute('class', 'drople-img d-col-12')
      } else {
        img[i].setAttribute('class', 'drople-img d-col-4')
      }
    }

    w = img[i].offsetWidth;
    img[i].setAttribute('style', 'height: ' + w + 'px; ' + img[i].getAttribute('style'))
  }
}

// Read and display file
function readFile(input) {
  let url = window.URL.createObjectURL(input.files[0]);
  let img_parent = document.createElement('div')
  let new_img = document.createElement('img')

  img_parent.setAttribute('class', 'drople-img')
  new_img.setAttribute('src', url)

  img_parent.appendChild(new_img)

  if (first) {
    dro.innerHTML = ''
    first = false
  }
  dro.appendChild(img_parent)
  manipResp()
}

// File upload 

document.querySelector('#file').addEventListener('change', e => {
  upload(e.target)
})



function upload(e) {
  //let file = e.files[0];
  readFile(e);

  // let fd = new FormData();
  // fd.append('file', file);

  // let xhr = new XMLHttpRequest();

  // xhr.open('PUT', 'http://localhost:1337/upload-portfile', true);

  // xhr.upload.addEventListener("loadstart", progress, false);
  // xhr.upload.addEventListener("progress", progress, false);
  // xhr.upload.addEventListener("load", progress, false);
  // xhr.upload.addEventListener("error", error, false);

  // xhr.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     var response = this.responseText;

  //     console.log(response)
  //   } else if (this.status == 500) {
  //     console.log('Server Error')
  //   }

  // }

  // xhr.send(fd);
}

function progress(e) {
  console.log(Math.round(e.loaded / e.total * 100))
}

function error(e) {
  console.log('Oops! something went wrong');
}