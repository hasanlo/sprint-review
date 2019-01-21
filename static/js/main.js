var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function() {
  if (this.readyState === 4) {
    var obj = JSON.parse(this.responseText);
    var article = document.getElementById("webslides");
    var slides = document.getElementById("slides");
    var sections = "";
    var slideList = "";
    var endSection =
      "<section class='fullscreen'>" +
      "<div class='card-50'>" +
      "<figure>" +
      "<img src='static/images/us.jpg' alt='us'>" +
      "<figcaption><a href='' title='suna Crew'>Suna team</a></figcaption>" +
      "</figure>" +
      "<div class='flex-content align-right rtl'>" +
      "<div class='content-right text-serif align-right'>" +
      "<h5 class='display-5'>" +
      "<strong>به پایان آمد این دفتر</strong>" +
      "<br />" +
      "<br />" +
      "<strong style='margin-right: 25px;'>حکایت همچنان باقی است</strong>" +
      "</h5><br/><br/>" +
      "<p class='smallFont' style='float:left;margin-left: -200px;'>ارائه شده توسط تیم وفاداری.</p>";
    "</div>" + "</div>" + "</div>" + "</section>";
    var itemCount = 1;
    var sprintName = "";
    for (index = 0; index < obj.issues.length; index++) {
      const element = obj.issues[index];

      if (element.fields.issuetype.name != "Sub-task") {
        if (sprintName == "") {
          sprintName = element.fields.sprint.name;
        }

        slideList +=
          "<li class='align-right text-primary'><a href='#slide=" +
          (itemCount + 2) +
          "' class='text-primary'>" +
          element.fields.summary +
          "</a></li>";

        sections +=
          "<section class='slide-top slide'><div class=' wrap size-50 align-right'>" +
          "<p class='rtl text-primary'># " +
          itemCount +
          "</p>" +
          "<h4 class='rtl'><strong>" +
          element.fields.summary +
          "</strong> " +
          "<span class='badge badge-info small-font '>" +
          element.fields.labels +
          "</span></h4><br>" +
          "<h5 class='rtl text-muted'>" +
          element.fields.description +
          "</h5>" +
          "</div></section>";
        itemCount++;
      }
    }
    slides.innerHTML = slideList;
    article.innerHTML = article.innerHTML + sections;
    article.innerHTML += endSection;

    sprintName = sprintName.replace("Deka", "Suna");
    var sprintNameDiv = document.getElementById("sprintName");
    sprintNameDiv.innerHTML = sprintName;

    var sprintDateSpan = document.getElementById("sprintDate");
    sprintDateSpan.innerHTML = moment()
      .locale("fa")
      .format("YYYY/M/D");
    window.ws = new WebSlides();
  }
});

xhr.open("Get", "http://localhost:8085/activeSprint.json");
xhr.send(data);
