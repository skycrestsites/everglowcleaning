/* Everglow Cleaning Co. | main.js */
(function () {
  "use strict";
  var doc = document.documentElement;
  var body = document.body;

  /* Header shadow on scroll + mobile sticky CTA */
  var header = document.querySelector(".site-header");
  var mobileCta = document.querySelector(".mobile-cta");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (mobileCta) mobileCta.classList.toggle("is-visible", y > 520);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var menu = document.getElementById("mobile-menu");
      if (menu && header) menu.style.top = Math.max(0, header.getBoundingClientRect().bottom) + "px";
      var open = body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.querySelectorAll(".mobile-menu a").forEach(function (a) {
      a.addEventListener("click", function () {
        body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900 && body.classList.contains("menu-open")) {
        body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Services mega menu: hover on desktop, click + keyboard everywhere */
  document.querySelectorAll(".has-menu").forEach(function (item) {
    var btn = item.querySelector(".nav__link");
    var closeTimer;
    function setOpen(open) {
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    item.addEventListener("mouseenter", function () { clearTimeout(closeTimer); setOpen(true); });
    item.addEventListener("mouseleave", function () { closeTimer = setTimeout(function () { setOpen(false); }, 120); });
    btn.addEventListener("click", function (e) { e.preventDefault(); setOpen(!item.classList.contains("is-open")); });
    item.addEventListener("keydown", function (e) { if (e.key === "Escape") { setOpen(false); btn.focus(); } });
    document.addEventListener("click", function (e) { if (!item.contains(e.target)) setOpen(false); });
    item.addEventListener("focusout", function (e) { if (!item.contains(e.relatedTarget)) setOpen(false); });
  });

  /* Before / after slider */
  document.querySelectorAll(".ba").forEach(function (ba) {
    var range = ba.querySelector("input[type=range]");
    if (!range) return;
    function set(v) { ba.style.setProperty("--pos", v + "%"); }
    range.addEventListener("input", function () { set(range.value); });
    set(range.value);
  });

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Year */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Quote forms
     If the form has an action (for example a Formspree endpoint) it is posted with fetch.
     Otherwise the visitor's email app opens with the request pre-filled. */
  document.querySelectorAll("form[data-quote]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var card = form.closest(".form-card");
      var data = new FormData(form);
      var action = form.getAttribute("action");
      function done() { if (card) card.classList.add("is-sent"); }

      if (action) {
        fetch(action, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) { if (r.ok) { done(); } else { throw new Error("send failed"); } })
          .catch(function () { mailtoFallback(); });
        return;
      }
      mailtoFallback();

      function mailtoFallback() {
        var to = form.getAttribute("data-email");
        var lines = [];
        data.forEach(function (value, key) { if (String(value).trim()) lines.push(key + ": " + value); });
        var subject = "Quote request: " + (data.get("Service") || "Cleaning") + " (" + (data.get("Name") || "Website") + ")";
        window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
        done();
      }
    });
  });

  /* Preselect service from ?service= on the contact page */
  var params = new URLSearchParams(window.location.search);
  var pre = params.get("service");
  if (pre) {
    document.querySelectorAll("select[name=Service]").forEach(function (s) {
      Array.prototype.forEach.call(s.options, function (o) { if (o.value === pre) s.value = pre; });
    });
  }
  doc.classList.add("js");
})();
