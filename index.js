const sidenav = document.createElement('div');
    sidenav.className = "sidenav";
    document.body.appendChild(sidenav);
    const wrapper = document.createElement('div');
    wrapper.className = "wrapper";
    document.body.appendChild(wrapper);

    let main, tabName, tabs, heading, textarea, button, link;

    fetch('index.json')
      .then(function (responce) {
        return responce.json();
      })
      .then(function (data) {
        render(data)// a, headers, templates, text
      });

    function toggleTab(tabId) {
      const element = document.getElementById(tabId);
      element.scrollIntoView();
      if (element.style.display !== "block") { // adding all tabs to page
        element.style.display = "block";
      }
    }

    function copyToClipboard(texareaId) {
      console.log("copied");
      let target = document.getElementById(texareaId);
      target.select();
      document.execCommand("copy");
      target.blur();
      // navigator.clipboard.writeText(target.value);
    }

    function toggleTextarea(texareaId) {
      const target = document.getElementById(texareaId);
      const ts = target.style;
      if (ts.display !== "block") {
        ts.display = "block";
        ts.height = (target.scrollHeight)+"px";
      } else {
        ts.display = "none";
      }
    }

    function render(data) {
      data.map((obj) => { // get object (tabName = obj.id)
        let templates = Object.entries(obj.templates);

        link = document.createElement('a')
        link.textContent = obj.name;
        link.href = `#${obj.id}`;
        link.setAttribute("id", "link"+obj.id);
        link.addEventListener("click", () => { toggleTab(obj.id) });
        sidenav.appendChild(link);

        main = document.createElement("div");
        main.className = "main";
        main.setAttribute("id", obj.id);
        wrapper.appendChild(main);

        tabName = document.createElement('h3');
        tabName.textContent = obj.name;
        main.appendChild(tabName);

        templates.map((templ) => { // get templates names
          console.log("templ "+typeof templ);
          let texareaId = obj.id + templ[0];
          let headingId = "heading"+texareaId;

          tabs = document.createElement("div");
          tabs.className = "tabs";
          main.appendChild(tabs);

          heading = document.createElement('h2');
          heading.textContent = templ[0]; // set heading from data
          heading.setAttribute("id", headingId);
          heading.addEventListener("click", () => { toggleTextarea(texareaId) } );
          tabs.appendChild(heading);

          button = document.createElement('button');
          button.textContent = "COPY"; // TODO show message "copied" for 3 sec
          button.addEventListener("click", () => { copyToClipboard(texareaId) } );
          tabs.appendChild(button);

          textarea = document.createElement('textarea');
          textarea.textContent = templ[1];
          textarea.setAttribute("id", texareaId);
          tabs.appendChild(textarea);
        });
      });
    }