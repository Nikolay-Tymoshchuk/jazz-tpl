import { v4 as uuidv4 } from 'uuid';

const dropArea = document.getElementById('drop-area');
const dropInput = document.getElementById('fileElem');
const dropLabel = document.querySelector('.drag-files__label');
const addFile = dropLabel.querySelector('.drag-files__label-add');
const warningSize = dropArea.querySelector('.warning-size-js');
const warningName = dropArea.querySelector('.warning-name-js');
const contactGallery = document.getElementById('contact-gallery');

let filesNamesArr = [];
let totalSize = 0;

export function getFilesNamesArr() {
  return filesNamesArr;
}
export function clearFilesNamesArr() {
  filesNamesArr = [];
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  dropLabel.classList.add('drag-files__label--highlight');
}
function unhighlight(e) {
  dropLabel.classList.remove('drag-files__label--highlight');
}

function makeDragActive() {
  dropArea.classList.add('drag-files__active');
  dropLabel.classList.add('drag-files__label--active');
  addFile.classList.add('drag-files__label-add--active');
}
export function removeDragActive() {
  dropArea.classList.remove('drag-files__active');
  dropLabel.classList.remove('drag-files__label--active');
  addFile.classList.remove('drag-files__label-add--active');
}

dropInput.onchange = function (e) {
  let files = e.target.files;
  makeDragActive();
  handleFiles(files);
};

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  makeDragActive();
  handleFiles(files);
}

function handleFiles(files) {
  let uploadFilesArr = [...files];

  uploadFilesArr.forEach(file => {
    let existFile = filesNamesArr.find(fileName => fileName[file.name]);
    if (existFile) {
      warningNotification(warningName);

      return;
    } else if (totalSize + file.size >= 24000000) {
      warningNotification(warningSize);

      return;
    } else {
      totalSize += file.size;
      previewFile(file);
    }
  });
}

function warningNotification(elem) {
  dropLabel.classList.add('drag-files__label--disable');
  elem.classList.remove('visually-hidden');

  setTimeout(() => {
    dropLabel.classList.remove('drag-files__label--disable');
    elem.classList.add('visually-hidden');
  }, 6000);
}

function previewFile(file) {
  let reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let fileSize = (Number(file.size) * 1.0e-6).toFixed(2);
    const fileId = uuidv4();

    let li = ` <li class='drag-files__gallery-item' id=${fileId}>
              <img src=${reader.result} alt="user uploaded image">
                <div class="drag-files__gallery-wrapper">
                 <p class="drag-files__gallery-file">
                 <span class="drag-files__gallery-name" >${file.name}</span>
                 <span class="drag-files__gallery-size">${fileSize} mb</span>
                 </p>
                  <progress data-progress-bar max="100" value="0"></progress>
                   <p class="drag-files__gallery-progress"></p>
                </div>
                 <button class="drag-files__gallery-close" type="button"></button>
              </li>`;

    contactGallery.insertAdjacentHTML('afterbegin', li);

    const galleryItem = document.getElementById(fileId);
    const galleryCloseBtn = galleryItem.querySelector('.drag-files__gallery-close');
    const progressBar = galleryItem.querySelector('[data-progress-bar]');
    const galleryProgress = galleryItem.querySelector('.drag-files__gallery-progress');

    galleryCloseBtn.addEventListener('click', e => removeFile(e, file));

    galleryProgress.textContent = progressBar.value + '% done';

    uploadFile(file, fileId);
  };
}

// Remove file=====================================================================

function removeFile(e, fileElem) {
  let fileIndex;

  filesNamesArr.forEach((file, index) => {
    if (file[fileElem.name]) {
      deleteFile(file[fileElem.name]);
      return (fileIndex = index);
    }
  });

  filesNamesArr.splice(fileIndex, 1);

  totalSize = totalSize - fileElem.size;

  if (totalSize < 24000000) {
    dropLabel.classList.remove('drag-files__label--disable');
  }

  if (filesNamesArr.length === 0) {
    removeDragActive();

    dropLabel.classList.remove('drag-files__label--disable');
    totalSize = 0;
  }

  e.target.parentNode.remove();
}

function uploadFile(file, fileId) {
  var url = './upload.php';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);

  xhr.upload.addEventListener('progress', function (e) {
    const loadProgress = Math.round((e.loaded * 10000) / e.total) / 100;

    updateProgress(loadProgress, fileId);
  });

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let resp = JSON.parse(this.response);

      if (resp.error) {
        console.log(resp.error);
      } else {
        filesNamesArr.push({ [file.name]: resp.fileName });
        console.log(`${resp.fileName} has been uploaded`);
      }
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      console.log(`${file.name} cannot be uploaded due to an error`);
    }
  });

  formData.append('file', file);

  xhr.send(formData);
}

function deleteFile(file) {
  var url = './deleteFile.php';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let resp = JSON.parse(this.response);
      console.log(`${resp.fileName} has been deleted`);
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      console.log(`${file} cannot be deleted due to an error`);
    }
  });

  formData.append('file', file);

  xhr.send(formData);
}
//Load progress=================================================================

function updateProgress(progressValue, fileId) {
  const galleryItem = document.getElementById(fileId);
  const progressBar = galleryItem.querySelector('[data-progress-bar]');
  const galleryProgress = galleryItem.querySelector('.drag-files__gallery-progress');

  progressBar.value = progressValue;
  galleryProgress.textContent = progressBar.value + '% done';
  if (progressBar.value === 100) {
    galleryProgress.textContent = 'Completed';
  }
}

//EventListener added====================================================================

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener('drop', handleDrop);
