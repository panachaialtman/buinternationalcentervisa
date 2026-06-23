(function () {
  var storageKey = "buInternationalSidebarCollapsed";
  var pageSwipeKey = "buInternationalPageSwipe";
  var pageOrder = [
    "index.html",
    "student-visa-extension.html",
    "non-ed.html",
    "non-ed-plus.html",
    "new-student.html",
    "90-days.html",
    "update-renew-passport.html",
    "penalty.html",
    "faq.html",
    "contact.html"
  ];
  var root = document.documentElement;
  var toggles = Array.prototype.slice.call(document.querySelectorAll("[data-sidebar-toggle]"));

  function getPageName(url) {
    var parts = url.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function readSavedState() {
    try {
      return window.localStorage.getItem(storageKey) === "true";
    } catch (error) {
      return false;
    }
  }

  function saveState(collapsed) {
    try {
      window.localStorage.setItem(storageKey, collapsed ? "true" : "false");
    } catch (error) {
      // Local files can disable storage in some browsers; the toggle should still work.
    }
  }

  function setCollapsed(collapsed) {
    root.classList.toggle("sidebar-collapsed", collapsed);
    toggles.forEach(function (button) {
      button.setAttribute("aria-expanded", collapsed ? "false" : "true");
      button.setAttribute("aria-label", collapsed ? "Show navigation" : "Hide navigation");
    });
    saveState(collapsed);
  }

  setCollapsed(readSavedState());

  if (root.classList.contains("page-swipe")) {
    window.setTimeout(function () {
      root.classList.remove("page-swipe", "page-swipe-forward", "page-swipe-back");
    }, 340);
  }

  toggles.forEach(function (button) {
    button.addEventListener("click", function () {
      setCollapsed(!root.classList.contains("sidebar-collapsed"));
    });
  });

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href]");

    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    ) {
      return;
    }

    var targetUrl;

    try {
      targetUrl = new URL(link.getAttribute("href"), window.location.href);
    } catch (error) {
      return;
    }

    if (targetUrl.protocol !== window.location.protocol) {
      return;
    }

    var currentPage = getPageName(window.location);
    var targetPage = getPageName(targetUrl);

    if (currentPage === targetPage) {
      return;
    }

    var targetIndex = pageOrder.indexOf(targetPage);

    if (pageOrder.indexOf(currentPage) === -1 || targetIndex === -1) {
      return;
    }

    try {
      window.sessionStorage.setItem(pageSwipeKey, "forward");
    } catch (error) {}
  });

  function initFaqTabs() {
    var tabGroups = Array.prototype.slice.call(document.querySelectorAll("[data-faq-tabs]"));

    tabGroups.forEach(function (group) {
      var buttons = Array.prototype.slice.call(group.querySelectorAll("[data-faq-tab]"));
      var panels = Array.prototype.slice.call(group.querySelectorAll("[data-faq-panel]"));
      var content = group.querySelector(".faq-tab-content");
      var activeTabName = "";
      var tabNames = buttons.map(function (button) {
        return button.getAttribute("data-faq-tab");
      });
      var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function updateButtons(name, focusButton) {
        buttons.forEach(function (button) {
          var isActive = button.getAttribute("data-faq-tab") === name;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-selected", isActive ? "true" : "false");
          if (isActive && focusButton) {
            button.focus();
          }
        });
      }

      function showPanel(name) {
        panels.forEach(function (panel) {
          var isActive = panel.getAttribute("data-faq-panel") === name;
          panel.classList.toggle("is-active", isActive);
          panel.hidden = !isActive;
        });
        activeTabName = name;
      }

      function swipePanel(name, direction) {
        if (reduceMotion) {
          return;
        }

        var panel = group.querySelector('[data-faq-panel="' + name + '"]');

        if (!panel) {
          return;
        }

        panel.classList.remove("is-swiping-in", "swipe-forward", "swipe-back");
        void panel.offsetWidth;
        panel.classList.add("is-swiping-in", direction === "back" ? "swipe-back" : "swipe-forward");

        window.setTimeout(function () {
          panel.classList.remove("is-swiping-in", "swipe-forward", "swipe-back");
        }, 260);
      }

      function clearContentHeight() {
        if (!content) {
          return;
        }

        content.classList.remove("is-animating");
        content.style.height = "";
        content.style.overflow = "";
      }

      function activateTab(name, focusButton, skipAnimation) {
        var previousIndex = tabNames.indexOf(activeTabName);
        var nextIndex = tabNames.indexOf(name);
        var direction = previousIndex >= 0 && nextIndex < previousIndex ? "back" : "forward";

        updateButtons(name, focusButton);

        if (!content || skipAnimation || reduceMotion || activeTabName === name) {
          showPanel(name);
          clearContentHeight();
          return;
        }

        var currentHeight = content.offsetHeight;
        content.style.height = currentHeight + "px";
        content.style.overflow = "hidden";
        content.classList.add("is-animating");

        showPanel(name);
        swipePanel(name, direction);

        var nextHeight = content.scrollHeight;

        if (nextHeight >= currentHeight) {
          clearContentHeight();
          return;
        }

        window.requestAnimationFrame(function () {
          content.style.height = nextHeight + "px";
        });

        window.setTimeout(clearContentHeight, 210);
      }

      function activateTabForHash() {
        if (!window.location.hash) {
          return false;
        }

        var target = document.getElementById(window.location.hash.slice(1));
        var panel = target && target.closest("[data-faq-panel]");

        if (!panel) {
          return false;
        }

        activateTab(panel.getAttribute("data-faq-panel"), false, true);
        window.requestAnimationFrame(function () {
          target.scrollIntoView({ block: "start" });
        });
        return true;
      }

      buttons.forEach(function (button, index) {
        button.addEventListener("click", function () {
          activateTab(button.getAttribute("data-faq-tab"), true);
        });

        button.addEventListener("keydown", function (event) {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
            return;
          }

          event.preventDefault();
          var direction = event.key === "ArrowDown" ? 1 : -1;
          var nextIndex = (index + direction + buttons.length) % buttons.length;
          buttons[nextIndex].click();
        });
      });

      if (!activateTabForHash() && panels.length) {
        activateTab(panels[0].getAttribute("data-faq-panel"), false, true);
      }
    });

    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href^="#"]');

      if (!link) {
        return;
      }

      var target = document.getElementById(link.getAttribute("href").slice(1));
      var panel = target && target.closest("[data-faq-panel]");

      if (!panel) {
        return;
      }

      var group = panel.closest("[data-faq-tabs]");
      var button = group && group.querySelector('[data-faq-tab="' + panel.getAttribute("data-faq-panel") + '"]');

      if (button) {
        event.preventDefault();
        button.click();
        window.history.pushState(null, "", link.getAttribute("href"));
        window.requestAnimationFrame(function () {
          target.scrollIntoView({ block: "start" });
        });
      }
    });

    window.addEventListener("hashchange", function () {
      tabGroups.forEach(function (group) {
        var target = document.getElementById(window.location.hash.slice(1));
        var panel = target && target.closest("[data-faq-panel]");
        var button = panel && group.querySelector('[data-faq-tab="' + panel.getAttribute("data-faq-panel") + '"]');

        if (button) {
          button.click();
        }
      });
    });
  }

  initFaqTabs();
})();
