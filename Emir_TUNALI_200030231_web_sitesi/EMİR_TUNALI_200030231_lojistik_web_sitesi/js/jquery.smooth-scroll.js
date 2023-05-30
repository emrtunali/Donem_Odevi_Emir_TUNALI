/*Bu kod, bir web sayfasında düzgün kaydırma işlevi sağlayan bir jQuery eklentisi olarak tasarlanmıştır. jQuery kütüphanesini iki yöntemle genişletir:

"kaydırılabilir" yöntemi, eşleşen öğeler kümesindeki ilk kaydırılabilir öğeyi içeren bir jQuery nesnesi döndürür.

"ilk Kaydırılabilir" yöntemi, isteğe bağlı olarak bir yön parametresi tarafından filtrelenmiş,
 eşleşen öğeler kümesindeki ilk kaydırılabilir öğeyi içeren bir jQuery nesnesi döndürür.

Ayrıca, "pürüzsüz Kaydırma" yöntemi, sayfada belirli bir hedef öğeye düzgün bir şekilde kaydırmak için kullanılır.
 Bu yöntem, bir seçenekler nesnesi ile çağrılır ve "hariç tutmak", "telafi etmek", "yön", "kaydırma öğesi", "önce Kaydırma", "afterScroll", "gevşetme", "hız" ve "varsayılan önleme" özelliklerini içerir.

Ayrıca, "pürüzsüz Kaydırma" yöntemi, kaydırılabilir öğeyi belirlemek için "getScrollable" yöntemini kullanır. Bu yöntem, eşleşen öğeler kümesindeki her öğeyi kontrol eder ve kaydırılabilir öğeler dizisine ekler. Kaydırılabilir öğe bulunmazsa, varsayılan olarak "vücut" elemanı kullanılır.

Son olarak, "pürüzsüz Kaydırma" yöntemi, kaydırma hedefi ofsetini hesaplar ve "canlandırmak" yöntemiyle kaydırmayı canlandırır. Bu yöntem ayrıca kaydırma hızını otomatik olarak hesaplamak için bir katsayı değeri kullanabilir. */
(function ($) {
  var version = "1.5.5",
    optionOverrides = {},
    defaults = {
      exclude: [],
      excludeWithin: [],
      offset: 0,

      // 'üst' veya 'sol'dan biri
      direction: "top",

      // kaydırmak istediğim öğelerin jQuery kümesi ($.smooth Scroll için).
      // eğer boşsa (varsayılan), $('html, body').first Scrollbar() kullanır.
      scrollElement: null,

      // yalnızca varsayılan davranışı geçersiz kılmak istiyorum.
      scrollTarget: null,

      // kaydırma gerçekleşmeden önce çağrılacak fn(opts) işlevi.
      // "bu" kaydırılan ögedir.
      beforeScroll: function () {},

      // kaydırma gerçekleştikten sonra çağrılacak fn(opts) işlevi.
      // "bu" tetikleyen ögedir.
      afterScroll: function () {},
      easing: "swing",
      speed: 400,

      // "otomatik" hız katsayısı ayarlar.
      autoCoefficient: 2,

      // $.fn.smooth Yalnızca kaydırma: varsayılan tıklama eyleminin engellenip engellenmeyeceği
      preventDefault: true,
    },
    getScrollable = function (opts) {
      var scrollable = [],
        scrolled = false,
        dir = opts.dir && opts.dir === "left" ? "scrollLeft" : "scrollTop";

      this.each(function () {
        if (this === document || this === window) {
          return;
        }
        var el = $(this);
        if (el[dir]() > 0) {
          scrollable.push(this);
        } else {
          // eğer scroll(Top|Left) === 0 ise, elemanı 1px itin ve hareket edip etmediğine bakar
          el[dir](1);
          scrolled = el[dir]() > 0;
          if (scrolled) {
            scrollable.push(this);
          }

          el[dir](0);
        }
      });

      // Kaydırılabilir öğe yoksa <body> öğesine geri döner,
      // eğer jQuery koleksiyonundaysa
      // (bunu, Safari scrollTop zaman uyumsuzluğunu ayarladığı için yapar,
      // bu yüzden 1'e ayarlayıp değeri hemen alamaz.)
      if (!scrollable.length) {
        this.each(function () {
          if (this.nodeName === "BODY") {
            scrollable = [this];
          }
        });
      }

      // İlk Scrollable()'ı çağırıyorsak, ilk kaydırılabilir öğeyi kullanın
      if (opts.el === "first" && scrollable.length > 1) {
        scrollable = [scrollable[0]];
      }

      return scrollable;
    };

  $.fn.extend({
    scrollable: function (dir) {
      var scrl = getScrollable.call(this, { dir: dir });
      return this.pushStack(scrl);
    },
    firstScrollable: function (dir) {
      var scrl = getScrollable.call(this, { el: "first", dir: dir });
      return this.pushStack(scrl);
    },

    smoothScroll: function (options, extra) {
      options = options || {};

      if (options === "options") {
        if (!extra) {
          return this.first().data("ssOpts");
        }
        return this.each(function () {
          var $this = $(this),
            opts = $.extend($this.data("ssOpts") || {}, extra);

          $(this).data("ssOpts", opts);
        });
      }

      var opts = $.extend({}, $.fn.smoothScroll.defaults, options),
        locationPath = $.smoothScroll.filterPath(location.pathname);

      this.unbind("click.smoothscroll").bind(
        "click.smoothscroll",
        function (event) {
          var link = this,
            $link = $(this),
            thisOpts = $.extend({}, opts, $link.data("ssOpts") || {}),
            exclude = opts.exclude,
            excludeWithin = thisOpts.excludeWithin,
            elCounter = 0,
            ewlCounter = 0,
            include = true,
            clickOpts = {},
            hostMatch = location.hostname === link.hostname || !link.hostname,
            pathMatch =
              thisOpts.scrollTarget ||
              $.smoothScroll.filterPath(link.pathname) === locationPath,
            thisHash = escapeSelector(link.hash);

          if (
            !thisOpts.scrollTarget &&
            (!hostMatch || !pathMatch || !thisHash)
          ) {
            include = false;
          } else {
            while (include && elCounter < exclude.length) {
              if ($link.is(escapeSelector(exclude[elCounter++]))) {
                include = false;
              }
            }
            while (include && ewlCounter < excludeWithin.length) {
              if ($link.closest(excludeWithin[ewlCounter++]).length) {
                include = false;
              }
            }
          }

          if (include) {
            if (thisOpts.preventDefault) {
              event.preventDefault();
            }

            $.extend(clickOpts, thisOpts, {
              scrollTarget: thisOpts.scrollTarget || thisHash,
              link: link,
            });

            $.smoothScroll(clickOpts);
          }
        }
      );

      return this;
    },
  });

  $.smoothScroll = function (options, px) {
    if (options === "options" && typeof px === "object") {
      return $.extend(optionOverrides, px);
    }
    var opts,
      $scroller,
      scrollTargetOffset,
      speed,
      delta,
      scrollerOffset = 0,
      offPos = "offset",
      scrollDir = "scrollTop",
      aniProps = {},
      aniOpts = {};

    if (typeof options === "number") {
      opts = $.extend(
        { link: null },
        $.fn.smoothScroll.defaults,
        optionOverrides
      );
      scrollTargetOffset = options;
    } else {
      opts = $.extend(
        { link: null },
        $.fn.smoothScroll.defaults,
        options || {},
        optionOverrides
      );
      if (opts.scrollElement) {
        offPos = "position";
        if (opts.scrollElement.css("position") === "static") {
          opts.scrollElement.css("position", "relative");
        }
      }
    }

    scrollDir = opts.direction === "left" ? "scrollLeft" : scrollDir;

    if (opts.scrollElement) {
      $scroller = opts.scrollElement;
      if (!/^(?:HTML|BODY)$/.test($scroller[0].nodeName)) {
        scrollerOffset = $scroller[scrollDir]();
      }
    } else {
      $scroller = $("html, body").firstScrollable(opts.direction);
    }
    // BeforeScroll geri çağırma işlevi ofseti hesaplamadan önce tetikler.

    opts.beforeScroll.call($scroller, opts);

    scrollTargetOffset =
      typeof options === "number"
        ? options
        : px ||
          ($(opts.scrollTarget)[offPos]() &&
            $(opts.scrollTarget)[offPos]()[opts.direction]) ||
          0;

    aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset;
    speed = opts.speed;

    // kaydırma hızını mesafeye / katsayıya göre otomatik olarak hesaplar
    if (speed === "auto") {
      // $scroller.scrollTop() kaydırmadan önceki konumdur, animProps[scrollBar] sonraki konumdur
      // Delta daha büyük olduğunda, hız daha yüksek olacak.
      delta = aniProps[scrollDir] - $scroller.scrollTop();
      if (delta < 0) {
        delta *= -1;
      }

      // Deltayı katsayıya böler.
      speed = delta / opts.autoCoefficient;
    }

    aniOpts = {
      duration: speed,
      easing: opts.easing,
      complete: function () {
        opts.afterScroll.call(opts.link, opts);
      },
    };

    if (opts.step) {
      aniOpts.step = opts.step;
    }

    if ($scroller.length) {
      $scroller.stop().animate(aniProps, aniOpts);
    } else {
      opts.afterScroll.call(opts.link, opts);
    }
  };

  $.smoothScroll.version = version;
  $.smoothScroll.filterPath = function (string) {
    string = string || "";
    return string
      .replace(/^\//, "")
      .replace(/(?:index|default).[a-zA-Z]{3,4}$/, "")
      .replace(/\/$/, "");
  };

  // default options
  $.fn.smoothScroll.defaults = defaults;

  function escapeSelector(str) {
    return str.replace(/(:|\.|\/)/g, "\\$1");
  }
})(jQuery);
