// Drople root div
let drople = document.getElementById('drople')
let first = true;

let mode = drople.getAttribute('mode')
let url = drople.getAttribute('url')

let input = document.createElement('input')
input.id = 'file'
input.type = 'file'
input.hidden = true;
drople.appendChild(input)

if (mode === 'single') {
  input.addEventListener('change', e => {
    upload(e.target.files[0]);
  })
} else {
  input.multiple = true
  input.addEventListener('change', e => {
    [...e.target.files].forEach(f => {
      upload(f);
    })
  })
}

drople.addEventListener('click', () => {
  input.click()
})


/**
 * Manipulate image display to fit screen size
 * and maintain responsiveness
 * 
 * @param {HTML element} img 
 */
function manip(img) {
  if (screen.width >= 768) {
    if (drople.offsetWidth <= screen.width / 2 && drople.offsetWidth > screen.width / 3) {
      img.setAttribute('class', 'drople-img d-col-3')
    } else if (drople.offsetWidth > screen.width / 2 && drople.offsetWidth <= screen.width) {
      img.setAttribute('class', 'drople-img d-col-2')
    } else if (drople.offsetWidth < screen.width / 2 && drople.offsetWidth >= screen.width / 5) {
      img.setAttribute('class', 'drople-img d-col-4')
    } else if (drople.offsetWidth < screen.width / 5) {
      img.setAttribute('class', 'drople-img d-col-12')
    }
  } else {
    if (drople.offsetWidth <= screen.width / 2) {
      img.setAttribute('class', 'drople-img d-col-12')
    } else {
      img.setAttribute('class', 'drople-img d-col-4')
    }
  }

  w = img.offsetWidth;
  img.setAttribute('style', 'height: ' + w + 'px; ' + img.getAttribute('style'))
}

/**
 * Render image file
 * If file is not an image a placeholder will be
 * rendered instead
 * 
 * @param {FileObject} file 
 */
function render(file) {
  let img_parent = document.createElement('div')
  let new_img = document.createElement('img')

  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    new_img.src = reader.result
  }

  img_parent.classList.add('drople-img')
  img_parent.appendChild(new_img)

  if (first) {
    drople.innerHTML = ''
    first = false
  }
  drople.appendChild(img_parent)
  manip(img_parent)
}

/**
 * Drag and drop even listeners
 ****************************************************/
{
  ;
  ['dragenter', 'dragover'].forEach(e => {
    drople.addEventListener(e, preventDefaults, false)
  })

  ;
  ['dragleave', 'drop'].forEach(e => {
    drople.addEventListener(e, preventDefaults, false)
  })

  drople.addEventListener('drop', drop, false)

  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }
}
// **************************************************/

/**
 * Handle ondrop event
 * 
 * @param {event} e 
 */
function drop(e) {
  e.target.classList.remove('drop-op')
  files = e.dataTransfer.files;

  ([...files]).forEach(upload)
}

function upload(file, drop = false) {
  render(file);

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