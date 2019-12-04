/**
 * drople.js
 * 
 * DropleJS is a JavaScript open source library that provides 
 * drag'n'drop file uploads with image previews.
 * 
 * Main javascript file
 * 
 * @package DropleJS
 * @version 1.0.1
 * @author  Gabriel Osuobiem <osuobiem@gmail.com>
 * @link https://github.com/osuobiem
 * @link https://www.linkedin.com/in/gabriel-osuobiem-b22577176/
 */

/**
 * Include drople.css
 * *************************************************
 */
{
  scripts = document.getElementsByTagName("script"),
    src = scripts[scripts.length - 1].src;
  src = src.split('/')
  src.pop()
  src = src.join('/')

  let style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = src + '/drople.css'

  document.head.appendChild(style)
}
/***************************************************/

// Drople root div
let drople = document.getElementById('drople')
let first = true;

// Upload Mode
const mode = drople.getAttribute('mode')

// Server Upload URL
const url = drople.getAttribute('url')

/**
 * Create Info P Element
 ***************************************************
 */
{
  let p = document.createElement('p')
  p.id = 'drop-msg'
  p.innerHTML = 'Drop file here OR Click to select'
  drople.appendChild(p)
}
/***************************************************/

/**
 * Create File Input Element
 ***************************************************
 */
{
  let input = document.createElement('input')
  input.id = 'file'
  input.type = 'file'
  input.hidden = true;
  drople.appendChild(input)

  if (mode === 'single') {
    input.addEventListener('change', e => {
      render(e.target.files[0]);
    })
  } else {
    input.multiple = true
    input.addEventListener('change', e => {
      [...e.target.files].forEach(f => {
        render(f);
      })
    })
  }

  drople.addEventListener('click', () => {
    input.click()
  })
}
/***************************************************/

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
  type = file.type;
  type1 = type.split('/')[0]
  type2 = type.split('/')[1]

  let img_parent = document.createElement('div')
  let new_img = document.createElement('img')

  if (type1 == 'application' && type2 == 'pdf') {
    new_img.src = 'placeholders/pdf.png'
  } else if (type1 == 'image') {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      new_img.src = reader.result
    }
  } else if (type1 == 'video') {
    new_img.src = 'placeholders/video.png'
  } else if (type1 == 'audio') {
    new_img.src = 'placeholders/audio.png'
  } else {
    new_img.src = 'placeholders/file.jpg'
  }

  img_parent.classList.add('drople-img')
  img_parent.appendChild(new_img)

  if (first) {
    document.getElementById('drop-msg').hidden = "true"
    first = false
  }
  drople.appendChild(img_parent)
  manip(img_parent)

  upload(file, img_parent)
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

  mode === 'single' ? render(files[0]) : [...files].forEach(render)
}

/**
 * Upload file to Server
 * 
 * @param {FileObject} file 
 * @param {HTML Element} parent 
 */
function upload(file, parent) {

  // Create progress status element
  let progress = document.createElement('div')
  progress.setAttribute('class', 'loader')
  let sub_prog = document.createElement('span')
  sub_prog.setAttribute('style', 'width: 0')

  // Create error status element
  let error = document.createElement('span')
  error.setAttribute('class', 'status-e')
  error.innerHTML = '&#10006;'

  // Create error message element
  let error_m = document.createElement('span')
  error_m.setAttribute('class', 'e-message')

  // Create success status element
  let success = document.createElement('span')
  success.setAttribute('class', 'status-s')
  success.innerHTML = '&#10004;'

  let fd = new FormData();
  fd.append('file', file);

  let xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);

  xhr.upload.addEventListener("loadstart", () => {
    progress.appendChild(sub_prog)
    parent.prepend(progress)
  });
  xhr.upload.addEventListener("progress", e => {
    prog = Math.round(e.loaded / e.total * 100)
    sub_prog.setAttribute('style', 'width: ' + prog + '%')

  });
  xhr.upload.addEventListener("loadend", () => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        progress.hidden = true
        parent.prepend(success)
      }
      if (xhr.status == 0) {
        progress.hidden = true
        error_m.innerHTML = 'Error: Could not upload file'
        parent.prepend(error_m)
        parent.prepend(error)
      }
    }
  })
  xhr.upload.addEventListener("error", () => {
    progress.hidden = true
    error_m.innerHTML = 'Error: Could not upload file'
    parent.prepend(error_m)
    parent.prepend(error)
  });

  xhr.send(fd);
}