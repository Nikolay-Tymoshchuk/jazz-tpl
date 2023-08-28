window.onload = function () {
  const casesListItems = document.querySelectorAll('.cases__list-item');
  const casesLinks = [...casesListItems].map(
    element => element.firstElementChild.href,
  );

  hideActiveItem(casesListItems);
  // hideFourthItem(casesListItems, casesLinks);
};

function hideActiveItem(arr) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element.firstElementChild.href === window.location.href) {
      element.classList.add('cases__active');
    }
  }
}

// function hideFourthItem(arr, arrLinks) {
//   if (window.location.pathname === '/case-studies.html') {
//     return;
//   } else if (
//     !arrLinks.includes(window.location.href) &&
//     window.innerWidth >= 1200
//   ) {
//     arr[--arr.length].classList.add('cases__active');
//   }
// }
