// Check if there is Local Storage Color Option
let mainColors = localStorage.getItem("color-option");
// console.log(mainColors);
if (mainColors !== null) {
  //   console.log("Local storage is not Empty you can Set It On Root Now");
  document.documentElement.style.setProperty("--hoverColor", mainColors);
  //Check for active class
  //Remove Acitve Class From All Childrens
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");
    //Add active ClassList
    if (element.dataset.color === mainColors) {
      //Add active Class
      element.classList.add("active");
    }
  });
}

//Variable To Control The Interval
let backgroundInterval;
//Random Baground Option
let backgroundOption = true;

//Check if there is Local Storage background Item
let backgroundLocalItem = localStorage.getItem("background-option");
//Check if Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  // if (backgroundLocalItem === "true") {
  //   // backgroundOption = true;
  //   // document.querySelector(".random-backgrounds .yes").classList.add("active");
  // } else {
  //   // backgroundOption = false;
  //   // document.querySelector(".random-backgrounds .no").classList.add("active");
  // }

  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
    //Add active ClassList
    if (backgroundLocalItem === "true") {
      backgroundOption = true;
      document
        .querySelector(".random-backgrounds .yes")
        .classList.add("active");
      //Add active Class
      // document
      //   .querySelector(".random-backgrounds .yes")
      //   .classList.add("active");
    } else {
      backgroundOption = false;
      document.querySelector(".random-backgrounds .no").classList.add("active");
      // document.querySelector(".random-backgrounds .no").classList.add("active");
    }
  });
}

//Select Settings Box

const settingsBox = document.querySelector(".settings-box");

//toggle Spin Class on Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
};

// Switch Colors

const colorList = document.querySelectorAll(".color-list li");
// Loop in all List ITems
colorList.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (ev) => {
    //Set Color on Root
    document.documentElement.style.setProperty(
      "--hoverColor",
      ev.target.dataset.color
    );
    handleActive(ev);
    // Set Color in Local Storage
    localStorage.setItem("color-option", ev.target.dataset.color);

    // //Remove Acitve Class From All Childrens
    // ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });

    // // AddActive Class on Self
    // ev.target.classList.add("active");
  });
});

// Switch Random Backgrounds

const randomBackgroundsEl = document.querySelectorAll(
  ".random-backgrounds span"
);
// Loop in all spans
randomBackgroundsEl.forEach((span) => {
  // Click On Every span Items
  span.addEventListener("click", (ev) => {
    //Remove Acitve Class From All Childrens
    // ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });

    // // AddActive Class on Self
    // ev.target.classList.add("active");
    handleActive(ev);
    if (ev.target.dataset.background === "yes") {
      // console.log("yes");
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      // console.log("no");
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// Select Landing Page ELement

const landingPAge = document.querySelector(".landing-page");

//Get Array Of Imgs

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

//Changin background Image Url
// console.log(landingPAge);
landingPAge.style.backgroundImage = 'url("images/01.jpg")';

//Function TO Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    //Random image
    backgroundInterval = setInterval(() => {
      let randmonNumber = Math.floor(Math.random() * imgsArray.length) + 1;
      landingPAge.style.backgroundImage =
        'url("images/0' + randmonNumber + '.jpg")';
      // console.log(randmonNumber);
    }, 1000);
  }
}

randomizeImgs();

//Select Skills Selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // console.log(skillsOffsetTop);

  // Skills Outer Hight
  let skillsOuterHeight = ourSkills.offsetHeight;
  // console.log(skillsOuterHeight);

  // //Window ScrollTop
  let windowScrollTop = this.pageYOffset;
  // console.log(windowScrollTop);

  // // Window Height
  let windowHeight = this.innerHeight;
  // console.log(windowHeight);

  // console.log(windowScrollTop);
  // console.log(skillsOffsetTop + skillsOuterHeight - windowHeight);
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = 0;
    });
  }
};

// Creat Popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (ev) => {
    //Create Overlay element
    let overlay = document.createElement("div");

    //Add Class To Overlay
    overlay.className = "popup-overlay";

    //Append Overlay To body

    document.body.appendChild(overlay);

    // Create The Popup
    let popupBox = document.createElement("div");

    //Add class To Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      //Create Text for Heading
      let imgText = document.createTextNode(img.alt);

      //Append de text to the headig
      imgHeading.appendChild(imgText);

      //Append heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    //Create the image
    let popupImage = document.createElement("img");

    //Set Image src
    popupImage.src = img.src;

    // Add Image to Popup Box
    popupBox.appendChild(popupImage);

    //Add Popup Box to Body
    document.body.appendChild(popupBox);

    //Create The close Span
    let closeButton = document.createElement("span");

    //Create the close Button Text
    let closeButtonText = document.createTextNode("X");

    // append text to Close button
    closeButton.appendChild(closeButtonText);

    //Add Class to Close Button
    closeButton.className = "close-button";

    // Add Close Button To the Popup Box
    popupBox.appendChild(closeButton);
  });
});

// ClosePopup

document.addEventListener("click", function (ev) {
  if (ev.target.className === "close-button") {
    console.log(ev.target);
    //Remove the Curre,t Popup
    ev.target.parentNode.remove();

    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  } else if (ev.target.className === "popup-overlay") {
    ev.target.remove();
    document.querySelector(".popup-box").remove();
  }
});

//SSelect All Bullets
const allBulllets = document.querySelectorAll(".nav-bullets .bullet ");

//SSelect All Links
const allLinks = document.querySelectorAll(".nav-links a");

//Function Scroll To Some Where
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (ev) => {
      ev.preventDefault();
      document.querySelector(ev.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBulllets);
scrollToSomewhere(allLinks);

//Handle Active State
function handleActive(event) {
  //Remove Acitve Class From All Childrens
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // AddActive Class on Self
  event.target.classList.add("active");
}

//Selecti bullets option
let bulletsSpan = document.querySelectorAll(".bullets-option span");

//Select nav Bullets
let bulletsContainer = document.querySelector(".nav-bullets");

//Add to Local Storage
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
// Add eventListner
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (ev) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }

    handleActive(ev);
  });
});

// Reset Button

document.querySelector(".reset-option").onclick = function () {
  // localStorage.clear(); //Hadi kadir clear local storage kamla
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");

  //Reload Window
  window.location.reload();
};

//Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".nav-links");

//Add event
toggleBtn.onclick = function (ev) {
  //Stop Propagation
  ev.stopPropagation();

  //toggle add class List
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

//Click anywhere Outside Menu and Toggle Button

document.addEventListener("click", (ev) => {
  if (ev.target !== toggleBtn && ev.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      //toggle add class List
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

//Stop Propagation on Menu
tLinks.onclick = function (ev) {
  ev.stopPropagation();
};
