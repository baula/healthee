//var notes = new Map();
var notes = sessionStorage;

function onLoad() {
  for (var i = sessionStorage.length-1; i >= 0; i--) {
    currentKey = sessionStorage.key(i);
    if (currentKey.substring(0,6) === "4/23: ") {
      addNoteButton(sessionStorage.getItem(currentKey), currentKey);
    }
  }

  for (var i = 0; i < sessionStorage.length; i++) {
    currentKey = sessionStorage.key(i);
    if (currentKey.substring(0,10) === "Exercise: ") {
      addExerciseLabels(currentKey.substring(10), sessionStorage.getItem(currentKey));
    }
  }

  var inputs = document.getElementsByClassName("exercise_checklist");

  for (var i = 0; i < inputs.length; i++) {
    console.log(inputs[i].id);
    console.log(sessionStorage.getItem(inputs[i].id));
    if (inputs[i].type === "checkbox") {
      if (sessionStorage.getItem(inputs[i].id) === "true") {
        inputs[i].setAttribute("checked", "true");
      }
    }
  }

  setProgress();
}

function setProgress() {
  var numberOfChecks = 0;
  var inputs = document.getElementsByTagName("input");
  var numberOfBoxes = 0;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "checkbox") {
      if (!inputs[i].hidden) numberOfBoxes++;
      if (inputs[i].checked) {
        numberOfChecks++;
        sessionStorage.setItem(inputs[i].id, "true");
      } else {
        sessionStorage.setItem(inputs[i].id, "false");
      }
    }
  }

  if (numberOfChecks == 0) {
    $('.progress-bar-color-today').width('0%');
    $('.progress-bar-color-today').css("background-color", "hsl(51, 100%, 50%)");
  } else if (numberOfChecks == numberOfBoxes) {
    $('.progress-bar-color-today').width('100%');
    $('.progress-bar-color-today').css("background-color", "hsl(153, 100%, 23%)");
  } else {
    var percentage = numberOfChecks/numberOfBoxes * 100;
    $('.progress-bar-color-today').width(percentage + '%');
    $('.progress-bar-color-today').css("background-color", "hsl(51, 100%, 50%)");
  }
}

function monthToWeek() {
  document.getElementById("month-week").hidden = !document.getElementById("month-week").hidden;
  document.getElementById("month-week").hidden = true;
  document.getElementById("week-month").hidden = false;
  document.getElementById("month-view").hidden = true;
  document.getElementById("week-view").hidden = false;
}

function weekToMonth() {
  document.getElementById("week-month").hidden = !document.getElementById("week-month").hidden;
  document.getElementById("week-month").hidden = true;
  document.getElementById("month-week").hidden = false;
  document.getElementById("month-view").hidden = false;
  document.getElementById("week-view").hidden = true;
}

function showPlusMenu() {
  document.getElementById("plus-menu").hidden = !document.getElementById("plus-menu").hidden;
  if (!document.getElementById("appt-schedule").hidden) {
    document.getElementById("plus-menu").hidden = false;
    document.getElementById("appt-schedule").hidden = true;
  }
  else if (!document.getElementById("add-exercise").hidden) {
    document.getElementById("plus-menu").hidden = false;
    document.getElementById("add-exercise").hidden = true;
  }
  else if (!document.getElementById("self-note").hidden) {
    document.getElementById("plus-menu").hidden = false;
    document.getElementById("self-note").hidden = true;
  }
}

function hidePlusMenu() {
  document.getElementById("plus-menu").hidden = true;
}

function showHamVideo() {
  document.getElementById("video-iframe").src = "https://www.youtube.com/embed/bOf2AOpG4qM";
  document.getElementById("video").hidden = false;
  document.getElementById("video-iframe").hidden = false;
}

function showLiftVideo() {
  document.getElementById("video-iframe").src = "https://www.youtube.com/embed/l-mPHKQFMkk";
  document.getElementById("video").hidden = false;
  document.getElementById("video-iframe").hidden = false;
}

function showVideoURL(url) {
  document.getElementById("video-iframe").src = url;
  document.getElementById("video").hidden = false;
  document.getElementById("video-iframe").hidden = false;
}

function hideVideo() {
  document.getElementById("video-iframe").src = "";
  document.getElementById("video").hidden = true;
  document.getElementById("video-iframe").hidden = true;
}

function showAppt() {
  hidePlusMenu();
  document.getElementById("appt-schedule").hidden = false;
}

function hideAppt() {
  document.getElementById("appt-schedule").hidden = true;
  document.getElementById("appt-subject").value = "";
  document.getElementById("appt-date").value = "";
  document.getElementById("appt-time").value = "";
  document.getElementById("appt-location").value = "";
}

function addAppt() {
  document.getElementById("thurs-appt").hidden = false;
  hideAppt();
}

function deleteAppt() {
  document.getElementById("thurs-appt").hidden = true;
}

function showAddExercise() {
  hidePlusMenu();
  document.getElementById("add-exercise").hidden = false;
}

function hideAddExercise() {
  document.getElementById("add-exercise").hidden = true;
  document.getElementById("ex").value = "";
  document.getElementById("ex-vid").value = "";
  document.getElementById("ex-info").value = "";
  //document.getElementById("add-ex").checked = false;
}

function editTodo() {
  console.log("healthee REFUSES to let you edit exercises");

  var inputs = document.getElementsByClassName("exercise_checklist");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }

  var buttons = document.getElementsByClassName("play-button");
  for (var i = 0; i < buttons.length; i++) {
    if (sessionStorage.getItem(buttons[i].id)) {
      buttons[i].innerHTML = "<i class=\"fa fa-trash\"></i>";
      buttons[i].addEventListener("click", function() {
        console.log("new listener");
      });
    }

    /*
    if (sessionStorage.getItem(buttons[i].id)) {
      //console.log(sessionStorage.getItem(buttons[i].id));
      //console.log(buttons[i].id);
      var videoLink = sessionStorage.getItem(buttons[i].id);
      if (videoLink === "") {

      }
    } */
  }
}

function addExercise() {
  /*
  document.getElementById("calfCB").hidden = false;
  document.getElementById("calfPlay").hidden = false;
  document.getElementById("calf").hidden = false;
  */

  var exName = "exercise";
  var videoURL = "https://www.youtube.com/watch?v=OrnpSe4OChM";

  exName = document.getElementById("ex").value;
  videoURL = document.getElementById("ex-vid").value;

  if (exName === "") {
    hideAddExercise();
    return;
  }

  videoURL = videoURL.replace("watch?v=", "embed/");

  addExerciseLabels(exName, videoURL);

  sessionStorage.setItem("Exercise: " + exName, videoURL);

  setProgress();
  hideAddExercise();
}

function addExerciseLabels(exName, videoURL) {

  var editButton = document.getElementById("edit-exercises");
  if (editButton) {
    document.getElementById("todo-list").removeChild(editButton);
  } else {
    editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("style", "border-radius:5px;margin-top:5px");
    editButton.id = "edit-exercises";
    editButton.innerHTML = "<i class=\"fa fa-pencil fa-2x\"></i>";
    editButton.addEventListener("click", editTodo);
  }

  var exerciseDiv = document.createElement("div");
  var todoLabel = document.createElement("label");
  todoLabel.setAttribute("class", "todo-label");
  var exerciseInput = document.createElement("input");
  exerciseInput.setAttribute("class", "exercise_checklist");
  exerciseInput.setAttribute("type", "checkbox");
  exerciseInput.setAttribute("id", exName);
  exerciseInput.onclick = setProgress;
  var exerciseName = document.createTextNode("\n" + exName + "\n");

  todoLabel.appendChild(exerciseInput);
  todoLabel.appendChild(exerciseName);

  exerciseDiv.append(todoLabel);

  var playLabel = document.createElement("label");
  playLabel.setAttribute("class","play-button");
  playLabel.setAttribute("id", "Exercise: " + exName);
  playLabel.innerHTML = ("<i class=\"fa fa-play-circle-o\"></i>");
  if (videoURL === "") {
    playLabel.setAttribute("style","visibility:collapse");
  } else {
    playLabel.addEventListener("click", function(){
      document.getElementById("video-iframe").src = videoURL;
      document.getElementById("video").hidden = false;
      document.getElementById("video-iframe").hidden = false;
    });
  }

  exerciseDiv.appendChild(playLabel);
  document.getElementById("todo-list").appendChild(exerciseDiv);
  document.getElementById("todo-list").appendChild(editButton);
}

function showNote() {
  hidePlusMenu();
  document.getElementById("self-note").hidden = false;
}

function hideNote() {
  document.getElementById("self-note").hidden = true;
  document.getElementById("note-text").value = "";
  document.getElementById("note-title").value = "";
}

function hideNoteDisplay() {
  document.getElementById("note-modal").hidden = true;
  document.getElementById("note-text-here").hidden = false;
  document.getElementById("note-edit-here").hidden = true;
  document.getElementById("edit-delete").hidden = false;
  document.getElementById("save-delete").hidden = true;
}

function stopProp() {
  event.stopPropagation();
}

function setUpClickOutsideClosing(){
    window.onclick = function(event) {
      if (!event.target.matches('.fa.fa-plus-circle.fa-2x')) {
        document.getElementById("plus-menu").hidden = true;
      }
  }
}

function addNote() {
  var noteContents = document.getElementById("note-text").value;
  var noteTitle = document.getElementById("note-title").value;
  var noteTitleDate = "4/23: " + noteTitle;

  if (noteTitle.length === 0 || noteContents.length === 0) {
    hideNote();
    return;
  }

  notes.setItem(noteTitleDate, noteContents); // change here
  addNoteButton(noteContents, noteTitleDate);
}

function addNoteButton(noteContents, noteTitleDate) {

  var button = document.createElement("button");
  button.setAttribute("style","width=100%;text-align=left");
  var textNode = document.createTextNode("Note:" + noteTitleDate.substring(6));
  button.appendChild(textNode);

  button.addEventListener("click", function(){
    document.getElementById("note-text-here").innerHTML = notes.getItem(noteTitleDate);  // change here
    document.getElementById("note-title-here").innerHTML = noteTitleDate;
    document.getElementById("note-modal").hidden = false;
    document.getElementById("delete-note-1").onclick = function() {
      button.remove();
      notes.removeItem(noteTitleDate);  // change here
      hideNoteDisplay();
    };
    document.getElementById("delete-note-2").onclick = function() {
      button.remove();
      notes.removeItem(noteTitleDate);  // change here
      hideNoteDisplay();
    };
    document.getElementById("edit-note").onclick = function() {
      document.getElementById("note-edit-textarea").value = notes.getItem(noteTitleDate);  // change here
      document.getElementById("note-text-here").hidden = true;
      document.getElementById("note-edit-here").hidden = false;
      document.getElementById("edit-delete").hidden = true;
      document.getElementById("save-delete").hidden = false;
    };
    document.getElementById("save-note").onclick = function() {
      notes.setItem(noteTitleDate, document.getElementById("note-edit-textarea").value);  // change here
      document.getElementById("note-text-here").innerHTML = notes.getItem(noteTitleDate); // change here
      document.getElementById("note-text-here").hidden = false;
      document.getElementById("note-edit-here").hidden = true;
      document.getElementById("edit-delete").hidden = false;
      document.getElementById("save-delete").hidden = true;
    };
  });

  document.getElementById("4-23").appendChild(button);
  //document.getElementById("mon-note").hidden = false;
  hideNote();
}
