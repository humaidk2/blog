---
title: "CSS pseudo-elements The ::before and ::after"
date: "2020-11-13"
excerpt: 'How far can you take a single div. In this article, I go over using the before and after pseudoselectors to style divs.'
coverImage: '/assets/blog/pseudo/cover.jpg'
author:
  name: Humaid Khan
  picture: '/assets/blog/authors/hk2.jpeg'
ogImage:
  url: '/assets/blog/pseudo/cover.jpg'
categories: 
  - "coding"
tags: 
  - "css"
  - "design"
  - "pseudo-element"
---

Hi,

Welcome back for another cool tech blog post. Hope y'all are staying safe.

Today's topic is pretty light and is about pseudo-elements. Before we begin, I want to tell you about why I chose to write this article. I have a strong passion for full stack development, understanding complex problems and coming up with solutions for them, but there is a small part of me that really likes design, especially web design and animations.

So at some point, I used to browse [codepen](https://codepen.io/) and see these really cool animations and designs and I was really curious to how I could build something like that. But when I looked at the code there, I would always see ::before and ::after pseudo-elements and it would just scare me away. Eventually though, I sat down and learned how and why they use pseudo-elements and started incorporating them in my own designs/components

So what are these [pseudo-elements](https://www.w3schools.com/css/css_pseudo_elements.asp)?

![](images/image.png)

definition of pseudo

The word pseudo means fake and so pseudo-elements are just that fake elements. Their main purpose was for some extra styling on the element.

Lets see an example,

<p class="codepen" data-height="358" data-theme-id="dark" data-default-tab="css,result" data-user="humaidk2" data-slug-hash="yLJxNKX" style="height: 358px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pseudo0"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/yLJxNKX">Pseudo0</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

This was one of the main use cases of pseudo elements. Here, we just had some text in a div. We centered it using position absolute, top -50%, left - 50%, and transform - translateX-50% translateY-50%. The way this centering works is that the top and left are using the body's width and height for positioning. It says move the div 50% of the body down and 50% of the body left, but that moving starts at the top left corner so our top left corner will be in the middle of the page. To move the div to the middle, we need to move it left by 50% of the div's width and up by 50% of the div's height and that's exactly what the transform property does. This is great if you want to center a div quickly without touching other elements, for small pens/pages like this. For actual projects, usually I use flexbox for centering elements.

Back to the actual pseudo element, the virtual element ::before is added to the .someText div and styled using different patterns than the rest of the text.

> Note the ::before and ::after elements don't show up unless you specify content property, even content:"" is good enough for it to show up.

Looks cool right, with just some simple styles, we've gathered the user's attention. But this is a really bad pattern and you'd probably never use it on an actual website. The reason is that the text doesn't show up on the DOM, so it can't be captured by screen readers and thus horrible for accessibility. Also, if you're loading the text using JavaScript, you'd have to change the CSS every time the text changes. For this use case, a more appropriate pseudo selector would be :first-letter, so that the letter shows up in the DOM and can be loaded via JavaScript.

::before and :after are mainly used to add some neat looking designs to the element. I like to imagine 2 divs that can be added before the text and after the text, i.e

```
<div class="someText">
<div class="someText::before"></div>
Lorem
<div class="someText::after"></div> 
</div>
```

Of course the before and after divs aren't actually there but imagining them helps easily design stuff.

A good example use case of the before and after elements is something like this

<p class="codepen" data-height="389" data-theme-id="dark" data-default-tab="html,result" data-user="humaidk2" data-slug-hash="wvWxZNL" style="height: 389px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pseudo1"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/wvWxZNL">Pseudo1</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Here I added some fancy quotes to make the content look nice. I've also used the display - block on the pseudo-elements to move them to their own line.

Another example is this

<p class="codepen" data-height="397" data-theme-id="dark" data-default-tab="css,result" data-user="humaidk2" data-slug-hash="ExyePPP" style="height: 397px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pseudo2"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/ExyePPP">Pseudo2</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Here the 'X' and '✓' characters are used to show the user if the text shows the right or wrong information.

Also you may be wondering why I'm using "::" and not ":". Since CSS2, the before and after were just virtual elements so they just used ":",. At some point the CSS folks realized since the styles we are adding are actually being added to an "element" like a div or span, we can actually have pseudo classes added to it. I mean you could hover over the virtual element or focus on it and it could have completely different styles, so they decided to change ":before" to "::before" to allow for something like ":before:hover " or ":hover:before". You can still use ":before" and ":after" but it's better to use "::before" just so you remember this is a pseudo element and not pseudo-class(:hover, :focus).

Alright lets see some cooler examples

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="humaidk2" data-slug-hash="zYBJrmN" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="zYBJrmN"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/zYBJrmN">zYBJrmN</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Here I've used the before pseudo element to simulate a linear gradient border. Border colors are usually fixed colors, so this is a trick you could use to add a linear or radial gradient to an element.

The pen also makes use of the after pseudo element to fill the button on hover, by adding the CSS3 btn:hover:after pseudo-selector. The animation moves the after pseudo element to cover the text.

<p class="codepen" data-height="320" data-theme-id="dark" data-default-tab="css,result" data-user="humaidk2" data-slug-hash="jOrvpPL" style="height: 320px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="psuedoReact"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/jOrvpPL">psuedoReact</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Do you recognize this logo? It's the [React.js](https://reactjs.org/) logo

Here I've actually used two divs, one is just the inner circle. The main spinning shape is a single div. The div is styled using the border and border-radius. The other fans of the logo are the pseudo-elements that are just rotated slightly differently. The cool thing about this demo is that since the pseudo-elements are rotated based of the main div when I spin the main div the before and after elements will spin along to try to maintain their rotations.

<p class="codepen" data-height="443" data-theme-id="dark" data-default-tab="css,result" data-user="humaidk2" data-slug-hash="oNLPMqg" style="height: 443px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="oNLPMqg"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/oNLPMqg">oNLPMqg</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Here, 3 shapes are used to make the text standout. The div itself is the rectangle with the text in the center. The before pseudo element is a circle formed using border-radius 100%. The triangle is the after element built using a CSS border trick, if you set the height, width to 0 and set the border-right, top, and bottom to transparent, you get a triangle shape. Note you could probably get the circle effect using a radial gradient but the triangle would need another html element.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="humaidk2" data-slug-hash="JjKaaYG" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="pseudoText"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/JjKaaYG">pseudoText</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Here I have the same text as the div in the content of the before pseudo element. I overlap the text and made some contrast by having font-weight bold on the div and font-weight normal on the before element. I overlapped the texts using position absolute and transforms. I think this is cool because it allows us to use color palettes with fonts that have the same color as the background. Note this would be bad practice for js loaded content but for buttons or landing pages, it works great.

Here's the same example but with different positioning

![](images/image-2.png)

<p class="codepen" data-height="373" data-theme-id="dark" data-default-tab="css,result" data-user="humaidk2" data-slug-hash="JjKByXW" style="height: 373px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="JjKByXW"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/JjKByXW">JjKByXW</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Here is an example of a clock in with just a single div. Although it is a clock, you can't set the time and there's no hour hand. So you tell me this is pretty useless, and I tell you that you this clock tells the number of minutes spent on the website. I think that's a cool mini widget.

The way it works is that I have a single div with the background clock centered. The before pseudo-element is a thin element that has curved edges using border-radius. By default elements rotate about the the center, similar to the react logo example, but we want our clock hand to spin about the bottom axis, so I've set the origin to the bottom using -webkit-transform-origin: bottom property.

Similarly, I've styled the after pseudo-element. The animation time for the before element is 60s(1minute) per spin, and the after element has a spin of 3600s(60minutes). Note you could add another hand for the hours, using another div, but I wanted to show how much can be done in a single div.

Alright so that's all I have for you today, I recommend you check out some examples on [codepen](https://codepen.io/) and try coming up with your own examples or try copying my code and modifying it a bit. That'll really engrave what you've learned. Here's some other ideas you can use for [pseudo-elements](https://css-tricks.com/pseudo-element-roundup/). Chris is one of the co-founders of codepen and his [css tricks blog](https://css-tricks.com/) is an amazing resource. Anyway, it's time for a summary:

- Pseudo-elements are virtual elements that can be added to create some pretty styles to an element, there are 2 types before and after
    - These elements don't actually exist in the DOM, they're just used to style elements.
    - We need to provide the content property to make them show up.
    - These elements shouldn't contain actual content(posts or text) for accessibility and because we can't change the content, once it's set.
    - You can think of them as a div or span that gets embedded before(for ::before) or after(for ::after) the element that is being styled.
- You can use pseudo elements to:
    - Style the first letter
    - Add stylish quotes
    - Add tick or special characters over the element
    - Simulate gradient borders
    - Add cool hover effects
    - Draw multiple shapes on a single div
    - Make cool overlayed text
    - Make a clock that counts number of minutes on a site
- Other CSS stuff:
    - how designers quickly center elements(use flexbox for your actual sites)
    - You can use 0 height width with transparent borders to draw triangles


Have a look at this awesome website to see what else you can do in a single div.

[Single div](https://a.singlediv.com/)

That's all for I have for you this week, I hope you enjoyed it. I think I'm gonna release articles biweekly instead of weekly cause I care a lot about quality and I want to provide original content. My next article will probably be some react based cards so it might be pretty short.

Thanks for reading, leave a comment if you have any questions or if you liked the content or just want to chat.
