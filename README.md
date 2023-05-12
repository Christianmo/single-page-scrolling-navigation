## CMO Single page scrolling navigation

Small library to handle scroll navigation on one page websites

### Install

```
npm i @cmo/single-page-scrolling-navigation
```

```javascript
import { singlePageNavigation } from "@cmo/single-page-scrolling-navigation";
```

### Setting

#### ReactJS:

```javascript
useEffect(() => {
  singlePageNavigation({
    selector: ".nav",
    childSelector: ".nav li a",
    time: 2000,
    easing: "easeInOutQuad",
    cb: () => console.log("animation finished"),
  });
}, []);
```

```html
<nav className="nav">
  <ul>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#services">Services</a>
    </li>
    <li>
      <a href="#work">Work</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ul>
</nav>
```

#### HTML and VanillaJs:

```javascript
cmoHashNavigation({
  selector: ".nav",
  childSelector: ".nav li a",
  time: 2000,
  easing: "easeInOutQuad",
  cb: () => console.log("animation finished"),
});
```

```html
<nav class="nav">
  <ul>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#services">Services</a>
    </li>
    <li>
      <a href="#work">Work</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ul>
</nav>
```

### Options

| Option        | Type     | Default | Description                                                                                                                                                                                   |
| ------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector      | string   | null    | the selector, it could be a class, id, or tagname                                                                                                                                             |
| childSelector | string   | null    | the child selector, it could be a class, id, or tagname                                                                                                                                       |
| time          | integer  | null    | the animation duration                                                                                                                                                                        |
| cb            | function | null    | callback to execute when animation finish                                                                                                                                                     |
| easing        | string   | null    | could be one of these easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, aseInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint. |
