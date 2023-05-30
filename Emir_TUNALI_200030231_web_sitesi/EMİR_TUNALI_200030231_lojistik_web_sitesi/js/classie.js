/*Bu kod, HTML öğelerinde CSS sınıflarını işlemek için işlevler sağlayan "classie" adlı bir JavaScript modülünü tanımlar.
 Modül, tarayıcının, sınıfları eklemek, kaldırmak ve değiştirmek için yerleşik yöntemler sağlayan öğeler üzerinde "classList" özelliğini destekleyip
  desteklemediğini kontrol eder.
 Tarayıcı "classList"i desteklemiyorsa, modül düzenli ifadeler ve dize işleme kullanarak sınıfları işlemek için kendi işlevlerini tanımlar */
(function (e) {
  "use strict";
  function t(e) {
    return new RegExp("(^|\\s+)" + e + "(\\s+|$)");
  }
  function s(e, t) {
    var s = n(e, t) ? i : r;
    s(e, t);
  }
  var n, r, i;
  if ("classList" in document.documentElement) {
    n = function (e, t) {
      return e.classList.contains(t);
    };
    r = function (e, t) {
      e.classList.add(t);
    };
    i = function (e, t) {
      e.classList.remove(t);
    };
  } else {
    n = function (e, n) {
      return t(n).test(e.className);
    };
    r = function (e, t) {
      if (!n(e, t)) {
        e.className = e.className + " " + t;
      }
    };
    i = function (e, n) {
      e.className = e.className.replace(t(n), " ");
    };
  }
  var o = {
    hasClass: n,
    addClass: r,
    removeClass: i,
    toggleClass: s,
    has: n,
    add: r,
    remove: i,
    toggle: s,
  };
  if (typeof define === "function" && define.amd) {
    define(o);
  } else {
    e.classie = o;
  }
})(window);
