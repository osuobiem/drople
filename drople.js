let drople = document.getElementById('drople')
let first = true;

//  Manipulate Responsiveness
function manipResp() {
  let img = document.getElementsByClassName('drople-img')
  for (let i = 0; i < img.length; i++) {
    if (screen.width >= 768) {
      if (drople.offsetWidth <= screen.width / 2 && drople.offsetWidth > screen.width / 3) {
        img[i].setAttribute('class', 'drople-img d-col-3')
      } else if (drople.offsetWidth > screen.width / 2 && drople.offsetWidth <= screen.width) {
        img[i].setAttribute('class', 'drople-img d-col-2')
      } else if (drople.offsetWidth < screen.width / 2 && drople.offsetWidth >= screen.width / 5) {
        img[i].setAttribute('class', 'drople-img d-col-4')
      } else if (drople.offsetWidth < screen.width / 5) {
        img[i].setAttribute('class', 'drople-img d-col-12')
      }
    } else {
      if (drople.offsetWidth <= screen.width / 2) {
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
  let img_parent = document.createElement('div')
  let new_img = document.createElement('img')

  let reader = new FileReader()
  reader.readAsDataURL(input)
  reader.onloadend = function () {
    new_img.src = reader.result
  }

  img_parent.classList.add('drople-img')
  img_parent.appendChild(new_img)

  if (first) {
    drople.innerHTML = ''
    first = false
  }
  drople.appendChild(img_parent)
  manipResp()
}

;
['dragenter', 'dragover'].forEach(e => {
  drople.addEventListener(e, preventDefaults, false)
})

;
['dragleave', 'drop'].forEach(e => {
  drople.addEventListener(e, preventDefaults, false)
})

drople.addEventListener('drop', drop, false)

function drop(e) {
  e.target.classList.remove('drop-op')
  files = e.dataTransfer.files;
  //console.log([...files])
  ([...files]).forEach(upload)
}

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
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