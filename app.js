/**
 * Bangkok University International Center — shared interactions
 * Dependency-free and suitable for GitHub Pages.
 */
(function () {
  "use strict";

  var site = window.BU_VISA_SITE;
  if (!site) {
    console.error("BU_VISA_SITE is missing. Load site-data.js before app.js.");
    return;
  }

  var root = document.documentElement;
  var body = document.body;
  var mobileQuery = window.matchMedia("(max-width: 1023px)");
  var reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var storage = {
    sidebar: "buVisaSidebarCollapsed",
    groups: "buVisaNavigationGroups"
  };

  var icons = {
    home: '<path d="M3 10.8 12 3l9 7.8v9.7a.5.5 0 0 1-.5.5H15v-7H9v7H3.5a.5.5 0 0 1-.5-.5z"/><path d="M9 21v-7h6v7"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    chevronDown: '<path d="m7 10 5 5 5-5"/>',
    chevronRight: '<path d="m10 7 5 5-5 5"/>',
    arrowRight: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="11" r="3.4"/><path d="M8.8 11h6.4M12 7.6c1 1 1.5 2.1 1.5 3.4S13 13.4 12 14.4c-1-1-1.5-2.1-1.5-3.4S11 8.6 12 7.6ZM9 17h6"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3h1"/>',
    graduation: '<path d="m3 9 9-5 9 5-9 5z"/><path d="M7 11.5v4.2c2.8 2.3 7.2 2.3 10 0v-4.2M21 9v6"/>',
    plane: '<path d="m3 11 18-7-7 18-3-8z"/><path d="m11 14 4-4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    idCard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5.5 16c.5-1.7 1.3-2.5 2.5-2.5s2 .8 2.5 2.5M13 10h5M13 14h4"/>',
    warning: '<path d="M10.3 4.2 2.6 18a2 2 0 0 0 1.8 3h15.2a2 2 0 0 0 1.8-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.4 2.4 0 1 1 3.9 1.9c-1 .7-1.6 1.1-1.6 2.6M12 17h.01"/>',
    message: '<path d="M21 14a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-1-2.6V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    print: '<path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    top: '<path d="m6 15 6-6 6 6"/>',
    location: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    building: '<path d="M4 21V5l8-3 8 3v16M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2M10 21v-2h4v2"/>',
    language: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>'
  };

  function icon(name, className) {
    var normalized = name === "id-card" ? "idCard" : name;
    var paths = icons[normalized] || icons.info;
    return '<svg class="icon' + (className ? " " + className : "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + paths + "</svg>";
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function readStorage(key, fallback) {
    try {
      var value = window.localStorage.getItem(key);
      return value == null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Storage may be unavailable when testing local files. The UI still works.
    }
  }

  function currentFileName() {
    var pathname = window.location.pathname;
    var part = pathname.substring(pathname.lastIndexOf("/") + 1);
    return decodeURIComponent(part || "index.html");
  }

  function currentPageKey() {
    if (body.dataset.page && site.pages[body.dataset.page]) {
      return body.dataset.page;
    }

    var file = currentFileName();
    var keys = Object.keys(site.pages);
    for (var i = 0; i < keys.length; i += 1) {
      var page = site.pages[keys[i]];
      if (page.file === file || (page.legacyFiles || []).indexOf(file) >= 0) {
        return keys[i];
      }
    }
    return "home";
  }

  function ensureShell() {
    var shell = document.querySelector(".site-shell");
    if (shell) {
      return shell;
    }

    var existing = Array.prototype.slice.call(body.childNodes).filter(function (node) {
      return !(node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT");
    });

    body.insertAdjacentHTML("afterbegin",
      '<a class="skip-link" href="#main-content">Skip to main content</a>' +
      '<div class="reading-progress" aria-hidden="true"><span></span></div>' +
      '<div class="site-shell">' +
        '<div class="drawer-overlay" data-drawer-overlay></div>' +
        '<aside class="site-sidebar" data-site-sidebar aria-label="Main navigation"></aside>' +
        '<div class="site-column">' +
          '<header class="site-header" data-site-header></header>' +
          '<main class="site-main" id="main-content" tabindex="-1"><div class="content-container" data-page-content></div></main>' +
          '<footer class="site-footer" data-site-footer></footer>' +
        '</div>' +
      '</div>'
    );

    var pageContent = document.querySelector("[data-page-content]");
    existing.forEach(function (node) {
      pageContent.appendChild(node);
    });

    return document.querySelector(".site-shell");
  }

  function pageHref(key) {
    return site.pages[key] ? site.pages[key].file : "index.html";
  }

  function renderSidebar(pageKey) {
    var sidebar = document.querySelector("[data-site-sidebar]");
    if (!sidebar) {
      return;
    }

    var navHtml = site.navigation.map(function (group, index) {
      var activeGroup = group.items.indexOf(pageKey) >= 0;
      var groupId = "nav-group-" + index;
      var toneClass = group.tone ? " nav-group--" + group.tone : "";
      var items = group.items.map(function (key) {
        var page = site.pages[key];
        var active = key === pageKey;
        return '<li class="nav-item">' +
          '<a class="nav-link' + (active ? " is-active" : "") + '" href="' + escapeHtml(page.file) + '"' + (active ? ' aria-current="page"' : "") + '>' +
            '<span class="nav-link__icon">' + icon(page.icon) + '</span>' +
            '<span class="nav-link__label">' + escapeHtml(page.navLabel) + '</span>' +
          '</a>' +
        '</li>';
      }).join("");

      return '<section class="nav-group' + toneClass + (activeGroup ? " contains-active" : "") + '" data-nav-group="' + index + '">' +
        '<button class="nav-group__toggle" type="button" aria-expanded="true" aria-controls="' + groupId + '">' +
          '<span class="nav-group__title">' + (group.icon ? icon(group.icon) : "") + '<span>' + escapeHtml(group.label) + '</span></span>' +
          icon("chevronDown", "nav-group__chevron") +
        '</button>' +
        '<ul class="nav-list" id="' + groupId + '">' + items + '</ul>' +
      '</section>';
    }).join("");

    sidebar.innerHTML =
      '<div class="sidebar-head">' +
        '<a class="brand-lockup" href="index.html" aria-label="' + escapeHtml(site.brand.shortName) + ' home">' +
          '<img class="brand-lockup__logo" src="' + escapeHtml(site.brand.logoPath) + '" alt="" width="252" height="64">' +
        '</a>' +
        '<button class="icon-button sidebar-close" type="button" data-sidebar-close aria-label="Close navigation">' + icon("close") + '</button>' +
      '</div>' +
      '<div class="sidebar-context">' +
        '<span class="status-dot" aria-hidden="true"></span>' +
        '<span>Student service guide</span>' +
      '</div>' +
      '<nav class="sidebar-nav" aria-label="Visa and immigration services">' + navHtml + '</nav>' +
      '<div class="sidebar-help">' +
        '<div class="sidebar-help__icon">' + icon("message") + '</div>' +
        '<div><strong>Need assistance?</strong><span>Contact the International Center for case-specific guidance.</span></div>' +
        '<a class="button button--small button--secondary" href="contact.html">Contact us</a>' +
      '</div>';

    restoreNavigationGroups(pageKey);
  }

  function renderHeader(pageKey) {
    var header = document.querySelector("[data-site-header]");
    if (!header) {
      return;
    }

    var page = site.pages[pageKey];
    var home = pageKey === "home";
    var breadcrumb = home
      ? '<span aria-current="page">Home</span>'
      : '<a href="index.html">Home</a>' + icon("chevronRight") + '<span aria-current="page">' + escapeHtml(page.title) + '</span>';

    header.innerHTML =
      '<div class="header-inner">' +
        '<div class="header-start">' +
          '<button class="icon-button sidebar-toggle" type="button" data-sidebar-toggle aria-label="Open navigation" aria-expanded="false">' + icon("menu") + '</button>' +
          '<nav class="breadcrumbs" aria-label="Breadcrumb">' + breadcrumb + '</nav>' +
        '</div>' +
        '<div class="header-actions">' +
          '<button class="search-trigger" type="button" data-search-open>' + icon("search") + '<span>Search</span><kbd>Ctrl K</kbd></button>' +
          '<span class="language-status" title="English version">' + icon("language") + '<span>EN</span></span>' +
          '<a class="button button--small button--primary header-contact" href="contact.html">Contact</a>' +
        '</div>' +
      '</div>';
  }

  function renderFooter() {
    var footer = document.querySelector("[data-site-footer]");
    if (!footer) {
      return;
    }

    footer.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-brand">' +
          '<img src="' + escapeHtml(site.brand.logoPath) + '" alt="" width="220" height="56">' +
          '<p>' + escapeHtml(site.brand.description) + '</p>' +
        '</div>' +
        '<div class="footer-column"><h2>Official resources</h2>' +
          '<a href="' + escapeHtml(site.officialLinks.immigrationBureau.url) + '">' + escapeHtml(site.officialLinks.immigrationBureau.label) + icon("external") + '</a>' +
          '<a href="' + escapeHtml(site.officialLinks.thaiEVisa.url) + '">' + escapeHtml(site.officialLinks.thaiEVisa.label) + icon("external") + '</a>' +
          '<a href="' + escapeHtml(site.officialLinks.online90Day.url) + '">' + escapeHtml(site.officialLinks.online90Day.label) + icon("external") + '</a>' +
        '</div>' +
        '<div class="footer-column"><h2>International Center</h2>' +
          '<p>' + icon("location") + '<span>' + escapeHtml(site.contact.location) + '</span></p>' +
          '<p>' + icon("clock") + '<span>' + escapeHtml(site.contact.officeHours) + '</span></p>' +
          '<a href="' + escapeHtml(site.contact.lineUrl) + '">LINE ' + escapeHtml(site.contact.lineLabel) + icon("external") + '</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>Last reviewed: <strong>' + escapeHtml(site.lastReviewed) + '</strong></span>' +
        '<span>Guidance may change. Final decisions are made by the responsible Thai authority.</span>' +
        '<span>&copy; <span data-current-year></span> Bangkok University International Center</span>' +
      '</div>';
  }

  function restoreNavigationGroups(pageKey) {
    var saved = readStorage(storage.groups, {});
    document.querySelectorAll("[data-nav-group]").forEach(function (group) {
      var id = group.dataset.navGroup;
      var toggle = group.querySelector(".nav-group__toggle");
      var list = group.querySelector(".nav-list");
      var containsActive = group.classList.contains("contains-active");
      var expanded = containsActive || saved[id] !== false;

      toggle.setAttribute("aria-expanded", String(expanded));
      list.hidden = !expanded;
      group.classList.toggle("is-collapsed", !expanded);

      toggle.addEventListener("click", function () {
        var next = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(next));
        list.hidden = !next;
        group.classList.toggle("is-collapsed", !next);
        saved[id] = next;
        writeStorage(storage.groups, saved);
      });
    });
  }

  function initSidebar() {
    var sidebar = document.querySelector("[data-site-sidebar]");
    var overlay = document.querySelector("[data-drawer-overlay]");
    var toggles = document.querySelectorAll("[data-sidebar-toggle]");
    var closeButton = document.querySelector("[data-sidebar-close]");
    var savedCollapsed = readStorage(storage.sidebar, false) === true;
    var lastFocused = null;

    function syncDesktopState() {
      if (mobileQuery.matches) {
        root.classList.remove("sidebar-collapsed");
      } else {
        root.classList.remove("drawer-open");
        root.classList.toggle("sidebar-collapsed", savedCollapsed);
      }
      syncButtons();
    }

    function syncButtons() {
      var open = mobileQuery.matches ? root.classList.contains("drawer-open") : !root.classList.contains("sidebar-collapsed");
      toggles.forEach(function (button) {
        button.setAttribute("aria-expanded", String(open));
        button.setAttribute("aria-label", mobileQuery.matches
          ? (open ? "Close navigation" : "Open navigation")
          : (open ? "Collapse navigation" : "Expand navigation"));
      });
    }

    function openDrawer() {
      lastFocused = document.activeElement;
      root.classList.add("drawer-open");
      body.classList.add("no-scroll");
      syncButtons();
      window.setTimeout(function () {
        var target = sidebar.querySelector("a, button");
        if (target) target.focus();
      }, 30);
    }

    function closeDrawer() {
      root.classList.remove("drawer-open");
      body.classList.remove("no-scroll");
      syncButtons();
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    function toggleSidebar() {
      if (mobileQuery.matches) {
        root.classList.contains("drawer-open") ? closeDrawer() : openDrawer();
      } else {
        savedCollapsed = !root.classList.contains("sidebar-collapsed");
        root.classList.toggle("sidebar-collapsed", savedCollapsed);
        writeStorage(storage.sidebar, savedCollapsed);
        syncButtons();
      }
    }

    toggles.forEach(function (button) {
      button.addEventListener("click", toggleSidebar);
    });
    if (closeButton) closeButton.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);

    sidebar.addEventListener("click", function (event) {
      if (mobileQuery.matches && event.target.closest("a")) closeDrawer();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("drawer-open")) closeDrawer();
    });

    mobileQuery.addEventListener("change", syncDesktopState);
    syncDesktopState();
  }

  function createSearchDialog() {
    if (document.querySelector("[data-search-dialog]")) return;

    var html =
      '<dialog class="search-dialog" data-search-dialog aria-labelledby="search-title">' +
        '<div class="search-dialog__panel">' +
          '<div class="search-dialog__head">' +
            '<div><span class="eyebrow">Site search</span><h2 id="search-title">Find visa information</h2></div>' +
            '<button class="icon-button" type="button" data-search-close aria-label="Close search">' + icon("close") + '</button>' +
          '</div>' +
          '<label class="search-field">' + icon("search") + '<span class="sr-only">Search website</span>' +
            '<input type="search" data-search-input placeholder="Try “passport”, “90-day”, or “graduation”" autocomplete="off">' +
            '<kbd>Esc</kbd>' +
          '</label>' +
          '<div class="search-results" data-search-results aria-live="polite"></div>' +
          '<p class="search-hint">Searches page titles, descriptions, and common student terms.</p>' +
        '</div>' +
      '</dialog>';

    body.insertAdjacentHTML("beforeend", html);
  }

  function initSearch() {
    createSearchDialog();
    var dialog = document.querySelector("[data-search-dialog]");
    var input = dialog.querySelector("[data-search-input]");
    var results = dialog.querySelector("[data-search-results]");
    var openers = document.querySelectorAll("[data-search-open]");
    var closer = dialog.querySelector("[data-search-close]");
    var lastFocused = null;

    var searchable = Object.keys(site.pages).map(function (key) {
      var page = site.pages[key];
      return {
        key: key,
        page: page,
        haystack: [page.title, page.navLabel, page.eyebrow, page.description].concat(page.keywords || []).join(" ").toLowerCase()
      };
    });

    function renderResults(query) {
      var term = query.trim().toLowerCase();
      var matches = searchable.filter(function (entry) {
        return !term || entry.haystack.indexOf(term) >= 0 || term.split(/\s+/).every(function (word) {
          return entry.haystack.indexOf(word) >= 0;
        });
      }).slice(0, 8);

      if (!matches.length) {
        results.innerHTML = '<div class="search-empty">' + icon("search") + '<strong>No matching page found</strong><span>Try a shorter term or contact the International Center.</span></div>';
        return;
      }

      results.innerHTML = '<ul>' + matches.map(function (entry) {
        return '<li><a href="' + escapeHtml(entry.page.file) + '">' +
          '<span class="search-result__icon">' + icon(entry.page.icon) + '</span>' +
          '<span><strong>' + escapeHtml(entry.page.title) + '</strong><small>' + escapeHtml(entry.page.description) + '</small></span>' +
          icon("arrowRight") +
        '</a></li>';
      }).join("") + '</ul>';
    }

    function openSearch() {
      lastFocused = document.activeElement;
      renderResults("");
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      body.classList.add("no-scroll");
      window.setTimeout(function () {
        input.focus();
      }, 20);
    }

    function closeSearch() {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
      body.classList.remove("no-scroll");
      input.value = "";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    openers.forEach(function (button) {
      button.addEventListener("click", openSearch);
    });
    closer.addEventListener("click", closeSearch);
    input.addEventListener("input", function () {
      renderResults(input.value);
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeSearch();
    });
    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeSearch();
    });
    document.addEventListener("keydown", function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    });
  }

  function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
      try {
        var url = new URL(link.href);
        if (url.origin !== window.location.origin) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.classList.add("external-link");
        }
      } catch (error) {
        // Ignore malformed URLs; the browser will handle them normally.
      }
    });
  }

  function initReadingProgress() {
    var bar = document.querySelector(".reading-progress span");
    if (!bar) return;

    function update() {
      var scrollTop = window.scrollY || root.scrollTop;
      var available = root.scrollHeight - window.innerHeight;
      var percentage = available > 0 ? Math.min(100, Math.max(0, scrollTop / available * 100)) : 0;
      bar.style.transform = "scaleX(" + percentage / 100 + ")";
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function slugify(text) {
    return text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function initAutoToc() {
    document.querySelectorAll("[data-auto-toc]").forEach(function (container) {
      var scopeSelector = container.getAttribute("data-auto-toc") || ".page-article";
      var scope = document.querySelector(scopeSelector) || container.closest("article") || document.querySelector("main");
      var headings = Array.prototype.slice.call(scope.querySelectorAll("h2, h3")).filter(function (heading) {
        return !heading.closest("[data-toc-ignore]");
      });

      if (headings.length < 2) {
        container.hidden = true;
        return;
      }

      var used = {};
      var links = headings.map(function (heading) {
        if (!heading.id) {
          var base = slugify(heading.textContent) || "section";
          used[base] = (used[base] || 0) + 1;
          heading.id = used[base] > 1 ? base + "-" + used[base] : base;
        }
        return '<li class="toc-level-' + heading.tagName.substring(1) + '"><a href="#' + escapeHtml(heading.id) + '">' + escapeHtml(heading.textContent) + '</a></li>';
      }).join("");

      container.innerHTML = '<div class="toc-head"><span>On this page</span></div><ol>' + links + '</ol>';
    });
  }

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
      var panels = Array.prototype.slice.call(group.querySelectorAll('[role="tabpanel"]'));
      if (!tabs.length) return;

      function activate(tab, focus) {
        tabs.forEach(function (item) {
          var active = item === tab;
          item.setAttribute("aria-selected", String(active));
          item.tabIndex = active ? 0 : -1;
          item.classList.toggle("is-active", active);
        });
        panels.forEach(function (panel) {
          panel.hidden = panel.id !== tab.getAttribute("aria-controls");
        });
        if (focus) tab.focus();
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () { activate(tab, false); });
        tab.addEventListener("keydown", function (event) {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          var next = index;
          if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
          if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = tabs.length - 1;
          activate(tabs[next], true);
        });
      });

      var selected = tabs.find(function (tab) { return tab.getAttribute("aria-selected") === "true"; }) || tabs[0];
      activate(selected, false);
    });
  }

  function showToast(message) {
    var existing = document.querySelector(".site-toast");
    if (existing) existing.remove();
    var toast = document.createElement("div");
    toast.className = "site-toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = icon("check") + '<span>' + escapeHtml(message) + '</span>';
    body.appendChild(toast);
    window.requestAnimationFrame(function () { toast.classList.add("is-visible"); });
    window.setTimeout(function () {
      toast.classList.remove("is-visible");
      window.setTimeout(function () { toast.remove(); }, 220);
    }, 2400);
  }

  function initUtilities() {
    document.querySelectorAll("[data-current-year]").forEach(function (element) {
      element.textContent = String(new Date().getFullYear());
    });
    document.querySelectorAll("[data-last-reviewed]").forEach(function (element) {
      element.textContent = site.lastReviewed;
    });
    document.querySelectorAll("[data-print-page]").forEach(function (button) {
      button.addEventListener("click", function () { window.print(); });
    });
    document.querySelectorAll("[data-copy]").forEach(function (button) {
      button.addEventListener("click", function () {
        var selector = button.getAttribute("data-copy");
        var target = document.querySelector(selector);
        if (!target || !navigator.clipboard) return;
        navigator.clipboard.writeText(target.textContent.trim()).then(function () {
          showToast("Copied to clipboard");
        });
      });
    });
  }

  function initAnchorScrolling() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link || link.getAttribute("href") === "#") return;
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotionQuery.matches ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", link.getAttribute("href"));
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  function initBackToTop() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = icon("top");
    body.appendChild(button);

    function update() {
      button.classList.toggle("is-visible", window.scrollY > 650);
    }
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotionQuery.matches ? "auto" : "smooth" });
    });
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function setPageMetadata(pageKey) {
    var page = site.pages[pageKey];
    if (!page) return;

    if (!document.title || document.title === "Document") {
      document.title = page.title + " | " + site.brand.shortName;
    }

    var description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    if (!description.content) description.content = page.description;

    body.dataset.page = pageKey;
  }

  function init() {
    var pageKey = currentPageKey();
    ensureShell();
    setPageMetadata(pageKey);
    renderSidebar(pageKey);
    renderHeader(pageKey);
    renderFooter();
    initSidebar();
    initSearch();
    initExternalLinks();
    initReadingProgress();
    initAutoToc();
    initTabs();
    initUtilities();
    initAnchorScrolling();
    initBackToTop();
    root.classList.add("site-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
}());
