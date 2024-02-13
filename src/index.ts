interface optionsValues {
  selector: string;
  childSelector: string;
  time: number;
  easing: string;
  gap?: number;
  cb: () => void;
}

interface linkValues {
  linkEl: HTMLAnchorElement;
  sectionEl: any;
  topPos: number;
  bottomPos: number;
}

interface easingFunctionsOptions {
  [key: string]: (t: number) => number;
}

const easingFunctions: easingFunctionsOptions = {
  linear: function (t: number) {
    return t;
  },
  easeInQuad: function (t: number) {
    return t * t;
  },
  easeOutQuad: function (t: number) {
    return t * (2 - t);
  },
  easeInOutQuad: function (t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function (t: number) {
    return t * t * t;
  },
  easeOutCubic: function (t: number) {
    return --t * t * t + 1;
  },
  easeInOutCubic: function (t: number) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function (t: number) {
    return t * t * t * t;
  },
  easeOutQuart: function (t: number) {
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function (t: number) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function (t: number) {
    return t * t * t * t * t;
  },
  easeOutQuint: function (t: number) {
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function (t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  },
};

let isScrolling = false;

function scrollToPos(nextPos: number, options: optionsValues) {
  const currentPos = window.pageYOffset;
  if (nextPos === currentPos) return;

  const startTime = window.performance.now();
  isScrolling = true;
  
  function scrollAnimation(currentTime: number) {
    const interval = Math.abs(currentTime - startTime);

    if (interval <= options.time) {
      const easingFunction = easingFunctions[options.easing](
        interval / options.time
      );
      const newPos = Math.ceil(
        currentPos + easingFunction * (nextPos - currentPos)
      );

      window.scrollTo(0, newPos);
      window.requestAnimationFrame(scrollAnimation);
    } else {
      window.scrollTo(0, nextPos);

      if (options.cb) options.cb();
      isScrolling = false;
    }
  }
  window.requestAnimationFrame(scrollAnimation);
}

function onScrollHandle(linksPosArr: linkValues[]) {
  window.addEventListener("scroll", function () {
    const currentPos = window.pageYOffset;

    linksPosArr.forEach(function (linkObj) {
      linkObj.linkEl.classList.remove("active");

      if (currentPos >= linkObj.topPos && currentPos < linkObj.bottomPos) {
        linkObj.linkEl.classList.add("active");
      }
    });
  });
}

export function singlePageNavigation(options: optionsValues) {
  const nav: any = document.querySelector(options.selector);

  if (!nav) {
    console.info("Missing selector: " + options.selector);
    return false;
  }

  const links = nav.querySelectorAll(options.childSelector);
  const linksPosArr: linkValues[] = [];

  [].forEach.call(links, function (link: HTMLAnchorElement) {
    const sectionSelector: any = link.hash;
    const sectionEl: any = document.querySelector(sectionSelector);

    if (!sectionEl) {
      console.info("Missing selector: " + sectionSelector);
      return false;
    }

    const gap = options.gap || 0;
    const linkEl = link;
    const topPos = sectionEl.offsetTop - gap;
    const bottomPos = topPos + sectionEl.offsetHeight;

    linksPosArr.push({
      linkEl,
      sectionEl,
      topPos,
      bottomPos,
    });

    link.addEventListener("click", function (evt) {
      evt.preventDefault();
      if (isScrolling) return;
      const nextPos = sectionEl.offsetTop - gap;
      scrollToPos(nextPos, options);
    });
  });

  onScrollHandle(linksPosArr);
}
