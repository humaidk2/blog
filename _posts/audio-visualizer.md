---
title: "Audio Visualizer"
date: "2020-12-06"
excerpt: "HTML5 has made the web cooler than ever. One of the things HTML5 has brought is the audio api and the ability to draw based on this data on the canvas. Here I go over how to draw graphs using canvas and the web audio api."
coverImage: '/assets/blog/audio-visualizer/cover.jpg'
author:
  name: Humaid Khan
  picture: '/assets/blog/authors/hk2.jpeg'
ogImage:
  url: '/assets/blog/audio-visualizer/cover.jpg'
categories: 
  - "coding"
  - "development"
  - "tutorial"
tags: 
  - "audio"
  - "audio-visualizer"
  - "javascript"
  - "web"
  - "web-audio"
---

Hi,

Welcome to my quiet little corner of the internet. Today, I'll be going over building an audio visualizer.

In a time before the modern web, before the responsiveness, circular borders, and sleek shadows, there were loads of wonky, crazy looking, and out right broken websites. But they always had really cool parts to them that matured well, got tuned out, and have become the web as we know it now.

One wonky feature that was lost to the sands of web development were audio visualizers. In this article, I'll be remembering and demonstrating how you can build your own cool audio visualizer using HTML5, CSS, and JavaScript.

An audio visualizer is a cool widget like feature that displays the playing audio data in a pleasant visual graphical form. Here's what we're building:

![](images/wallpaper.png)

audio visualizer in action

You can view it here: [https://undertale.humaidkhan.com/](https://undertale.humaidkhan.com/)

To start with, I'm gonna list the html elements we need:

- A canvas tag, I'm going to be using the canvas tag to draw the audio information as there is a lot of animating data so the canvas data helps animate many moving parts easily
- An audio tag, to play any audio, we need the audio element.
- Lastly, the button to play and pause the audio, as we want the user to have control of their computer audio

The general idea is that we will retrieve the audio from a link, set the retrieved audio to the source of the audio tag and at the same time use it to draw some visuals on the canvas. The audio data that we retrieve is actually just an object whose key is the frequency and value is amplitude of that frequency.

One last thing before coding, when I started this project, I wanted to get the currently playing audio data and display a visualizer using it. To do that you would need to do program operating system dependent code so I left it for another time. The audio that you can use is limited, due to copyright issues, to your computer audio files or SoundCloud (you still have to give credit to the owner and add SoundCloud logo). You can't use famous providers like Spotify or YouTube. Don't worry too much if it's just for your personal projects, just be aware if they find out that you're not following their terms of service, they will send you a cease and desist and you'll have to pull down your site.

So as I said, we need a canvas, audio, and button element:

<p class="codepen" data-height="333" data-theme-id="dark" data-default-tab="css,result" data-user="humaidk2" data-slug-hash="eYzqGEE" style="height: 333px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Audio Vis"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/eYzqGEE">Audio Vis</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Here, I've added the required HTML elements: the visualizer canvas, the audio-player, and the play-btn . I've also added [fontawesome](https://fontawesome.com/) to get a nice looking play icon.

For CSS, I've centered the play button by moving it top 50% screen height, left 50% screen width and transforming it's x and y by the button's width and height respectively. I've also added a circle border by setting the border-radius to 100%. Fontawesome uses the font-size to determine the icon size, which I've set to 40px. I've also removed the button outline on focus (outline:none), so that the button doesn't have a weird circle border. Note that this is bad for accessibility, as many screen readers use outline and focus to find buttons, but this is an audio "visualizer" so by definition it's not good for accessibility.

Now we're done with the HTML and CSS, let's start with the JavaScript.

<iframe src="https://carbon.now.sh/embed?bg=rgba%2829%2C61%2C127%2C1%29&amp;t=twilight&amp;wt=none&amp;l=javascript&amp;ds=true&amp;dsyoff=20px&amp;dsblur=68px&amp;wc=true&amp;wa=false&amp;pv=56px&amp;ph=56px&amp;ln=false&amp;fl=1&amp;fm=Hack&amp;fs=14px&amp;lh=133%25&amp;si=false&amp;es=2x&amp;wm=false&amp;code=var%2520visualCanvas%2520%253D%2520document.getElementById%28%27visualizer%27%29%250Avar%2520audioPlayer%2520%253D%2520document.getElementById%28%27audio-player%27%29%250Avar%2520playBtn%2520%253D%2520document.getElementById%28%27play-btn%27%29%250A%250Avar%2520playingState%2520%253D%2520%27stopped%27%250AplayBtn.onclick%2520%253D%2520%28%29%2520%253D%253E%2520%257B%250A%2520%2520switch%2520%28playingState%29%2520%257B%250A%2520%2520%2520%2520case%2520%27stopped%27%253A%250A%2520%2520%2520%2520%2520%2520getTrack%28url%29%250A%2520%2520%2520%2520%2520%2520playingState%2520%253D%2520%27playing%27%250A%2520%2520%2520%2520%2520%2520playBtn.children%255B0%255D.classList.remove%28%27fa-play%27%29%250A%2520%2520%2520%2520%2520%2520playBtn.children%255B0%255D.classList.add%28%27fa-pause%27%29%250A%2520%2520%2520%2520%2520%2520break%250A%2520%2520%2520%2520case%2520%27playing%27%253A%250A%2520%2520%2520%2520%2520%2520audioPlayer.pause%28%29%250A%2520%2520%2520%2520%2520%2520playingState%2520%253D%2520%27paused%27%250A%2520%2520%2520%2520%2520%2520playBtn.children%255B0%255D.classList.remove%28%27fa-pause%27%29%250A%2520%2520%2520%2520%2520%2520playBtn.children%255B0%255D.classList.add%28%27fa-play%27%29%250A%2520%2520%2520%2520%2520%2520break%250A%2520%2520%2520%2520case%2520%27paused%27%253A%250A%2520%2520%2520%2520%2520%2520audioPlayer.play%28%29%250A%2520%2520%2520%2520%2520%2520playingState%2520%253D%2520%27playing%27%250A%2520%2520%2520%2520%2520%2520playBtn.children%255B0%255D.classList.remove%28%27fa-play%27%29%250A%2520%2520%2520%2520%2520%2520playBtn.children%255B0%255D.classList.add%28%27fa-pause%27%29%250A%2520%2520%2520%2520%2520%2520break%250A%2520%2520%257D%250A%257D%250AaudioPlayer.onended%2520%253D%2520%28%29%2520%253D%253E%2520%257B%250A%2520%2520playingState%2520%253D%2520%27stopped%27%250A%2520%2520playBtn.children%255B0%255D.classList.remove%28%27fa-pause%27%29%250A%2520%2520playBtn.children%255B0%255D.classList.add%28%27fa-play%27%29%250A%257D%250A" style="width: 837px; height: 793px; border:0; transform: scale(1); overflow:hidden;" sandbox="allow-scripts allow-same-origin"></iframe>

Here I've stored the three HTML elements as JavaScript variables using their ids.

Then, I stored the audio player state in the variable playingState, initializing it to the stopped state as the player is not playing and the track hasn't been loaded yet.

When the user clicks the play button for the first time, the switch case state will pass through to the **stopped case**, **load the track info**, **play the audio**, **set the state to playing** (this happens in the getTrack function), and **change the play icon to a pause icon** (by removing fa-play class and adding the fa-pause icon).

Once the **audio is playing** and the user clicks the button, the **audio player is paused**, t**he play state is changed to paused**, and **the pause icon is replaced by the play icon** (as we are now paused).

If the **audio is paused** and the user clicks the button, **the audio is set to playing**, **the play state is set to playing**, and **the pause icon is replaced by the play icon**.

When all the audio has finished the audio player calls the **onended method** ("ended is emitted"), which I have used to set **the play state to stopped** and **replaced the pause icon with the play icon**.

So, we need to complete the getTrack function which fetches the music stream, sets the source, and plays the audio. As mentioned above, I'll be using SoundCloud to get my music, if you're using local music just move your file to the same project folder, set the source (src) to the file and call the play method.

To use SoundCloud was a challenge as they haven't provided API keys for a while. Also, the SoundCloud API has been update to API-V2 which means a lot of articles and methods to fetch the client id are deprecated.

Before looking at the code, I need to tell you a bit about CORS (cross origin resource sharing). When you build a website, there's two parts to the site, the front-end (what the user sees) and the back-end (where the data is stored). Now when a user visits a site like www.google.com, the front-end is loaded in and displayed. As the user interacts with the website, data is loaded from the back-end (lets say it's located at backend.google.com). By default, the browser has a security feature enabled that ensures the frontend only interacts with the url that the user has entered, which in this case is www.google.com. So the browser prevents access to backend.google.com.

One solution is that you can configure the backend to accept requests from www.google.com or any site which is perfect if we were building the backend. Another solution is to note that this is a "browser security feature", so we can develop our own cors enabled "backend server" that simply passes all requests to backend.google.com, a proxy. One famous proxy is [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/), just do a request https://cors-anywhere.herokuapp.com/<backend\_url> and the browser will be able to bypass cors. I've used this proxy for the soundcloud api requests.

<iframe src="https://carbon.now.sh/embed?bg=rgba%2829%2C61%2C127%2C1%29&amp;t=twilight&amp;wt=none&amp;l=javascript&amp;ds=true&amp;dsyoff=20px&amp;dsblur=68px&amp;wc=true&amp;wa=false&amp;pv=56px&amp;ph=56px&amp;ln=false&amp;fl=1&amp;fm=Hack&amp;fs=14px&amp;lh=133%25&amp;si=false&amp;es=2x&amp;wm=false&amp;code=audioPlayer.crossOrigin%2520%253D%2520%27anonymous%27%250AaudioPlayer.volume%2520%253D%25200.2%250A%250Alet%2520trackId%2520%253D%2520%27TRACK_ID%27%250Alet%2520clientId%2520%253D%2520%27CLIENT_ID%27%250Alet%2520url%2520%253D%2520%2560https%253A%252F%252Fcors-anywhere.herokuapp.com%252Fhttps%253A%252F%252Fapi-v2.soundcloud.com%252Ftracks%252F%2524%257BtrackId%257D%253Fclient_id%253D%2524%257BclientId%257D%2560%250A%250Aasync%2520function%2520getTrack%28url%29%2520%257B%250A%2520%2520let%2520res%2520%253D%2520await%2520fetch%28url%29%250A%2520%2520let%2520data%2520%253D%2520await%2520res.json%28%29%250A%250A%2520%2520let%2520media%2520%253D%2520await%2520fetch%28%250A%2520%2520%2520%2520%2560https%253A%252F%252Fcors-anywhere.herokuapp.com%252F%2524%257Bdata.media.transcodings%255B1%255D.url%257D%253Fclient_id%253D%2524%257BclientId%257D%2560%250A%2520%2520%29%250A%2520%2520let%2520mediaData%2520%253D%2520await%2520media.json%28%29%250A%250A%2520%2520audioPlayer.src%2520%253D%2520await%2520%2560%2524%257BmediaData.url%257D%2560%250A%2520%2520await%2520audioPlayer.play%28%29%250A%257D%250A" style="width: 720px; height: 609px; border:0; transform: scale(1); overflow:hidden;" sandbox="allow-scripts allow-same-origin"></iframe>

In the code above, I've done an api request to get track info to [https://api-v2.soundcloud.com/tracks/](https://api-v2.soundcloud.com/tracks/)<trackId>?client\_id=<clientId> to get the track streams (transcodings). I found the url for the stream within the media.transcodings\[1\].url. Then, I performed an api request to this url which returned an object with the stream url. If you set the audio element source to the stream url and call the play method, the music will begin streaming from SoundCloud. Also note I've used async await to perform the get requests, since we need to load the urls before playing the audio.

Also note that I've added the anonymous cross audioplayer crossorigin requests to prevent any cors issue with the audio player.

To play the SoundCloud, you need retrieve the track id for the song you select and your own client id. To do so, go to the song you want to add, hit F12 to open the network panel and refresh the page. Look for the "/comments" request and you'll be able to get your track id and client\_id.

Add the track id and client\_id and test out your application.

![](images/Screenshot-1429.png)

Visit the soundcloud link, hit F12, check for the comments request to get the track id and client\_id

Here my track id is 272083179.

Add the track id and the client\_id to the code below and you've got a working music player.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="js,result" data-user="humaidk2" data-slug-hash="LYRNRZQ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Audio Vis step 2"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/LYRNRZQ">Audio Vis step 2</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Now we just need to get the audio data and draw the visuals on the canvas. To capture the audio data, we need to create an analyzer component that intercepts the audio data from the audio element and passes it back to the audio element.

<iframe src="https://carbon.now.sh/embed?bg=rgba%2829%2C61%2C127%2C1%29&amp;t=twilight&amp;wt=none&amp;l=javascript&amp;ds=true&amp;dsyoff=20px&amp;dsblur=68px&amp;wc=true&amp;wa=false&amp;pv=56px&amp;ph=56px&amp;ln=false&amp;fl=1&amp;fm=Hack&amp;fs=14px&amp;lh=133%25&amp;si=false&amp;es=2x&amp;wm=false&amp;code=%252F%252F%2520webkitAudioContext%2520for%2520safari%250Avar%2520audioCtx%2520%253D%2520new%2520AudioContext%28%29%250Alet%2520analyser%2520%253D%2520audioCtx.createAnalyser%28%29%250A%252F%252F%2520we%2520need%2520to%2520set%2520the%2520fftsize%250A%252F%252F%2520which%2520%2520will%2520be%2520divided%2520by%25202%250A%252F%252F%2520and%2520should%2520contain%2520the%2520array%2520size%250A%252F%252F%2520and%2520it%2520has%2520to%2520be%2520a%2520power%2520of%25202%250A%252F%252F%25202048%2520is%2520the%2520max%2520apparently%250Aanalyser.fftSize%2520%253D%25202048%250A%252F%252F%2520can%2520only%2520connect%2520once%250A%252F%252F%2520create%2520source%2520from%2520audio%2520html%2520element%250Alet%2520source%2520%253D%2520audioCtx.createMediaElementSource%28audioPlayer%29%250A%252F%252F%2520pass%2520audio%2520from%2520source%2520to%2520analyser%250Asource.connect%28analyser%29%250A%252F%252F%2520%252F%252F%2520connect%2520it%2520back%2520to%2520speakers%2520or%2520headphones%250Aanalyser.connect%28audioCtx.destination%29%250A%252F%252F%2520unsigned%2520array%2520to%2520store%2520audio%2520data%250A%252F%252F%2520same%2520size%2520as%2520fftSize%2520divided%25202%250Avar%2520data%2520%253D%2520new%2520Uint8Array%28analyser.frequencyBinCount%2520-%2520382%29%250A%252F%252F%2520to%2520fill%2520the%2520data%2520array%250A%252F%252F%2520analyser.getByteFrequencyData%28data%29%253B%250A" style="width: 720px; height: 591px; border:0; transform: scale(1); overflow:hidden;" sandbox="allow-scripts allow-same-origin"></iframe>

So I created an audioContext based on the web audio api and use it to create our analyser. I set the fast fourier time to 2048 (max), this is the amount of frequency range you want from your data. I captured the source audio and passed it to the analyser which then forwards it back to the audio destination(pass it back to the player). Finally, I defined a data that will store the amplitudes for each frequency. Note I've reduced it by 382 because the last few frequencies appeared to be really quiet (empty) and the visualizer didn't look that good. Now that I have the analyser setup, I can read the data in to the data array using the getByteFrequencyData method on the analyser.

Note: we also need to add await audioCtx.resume(); to the getTrack function because the analyser context does not start when the browser loads unless stated explicitly.

Now that we have the data, we need to draw the information using the canvas tag.

<iframe src="https://carbon.now.sh/embed?bg=rgba%2829%2C61%2C127%2C1%29&amp;t=twilight&amp;wt=none&amp;l=javascript&amp;ds=true&amp;dsyoff=20px&amp;dsblur=68px&amp;wc=true&amp;wa=false&amp;pv=56px&amp;ph=56px&amp;ln=false&amp;fl=1&amp;fm=Hack&amp;fs=14px&amp;lh=133%25&amp;si=false&amp;es=2x&amp;wm=false&amp;code=var%2520centerX%2520%253D%2520visualCanvas.width%2520%252F%25202%252C%250A%2520%2520centerY%2520%253D%2520visualCanvas.height%2520%252F%25202%250Awindow.onload%2520%253D%2520window.onresize%2520%253D%2520function%2520%28%29%2520%257B%250A%2520%2520visualCanvas.width%2520%253D%2520window.innerWidth%250A%2520%2520visualCanvas.height%2520%253D%2520window.innerHeight%250A%2520%2520centerX%2520%253D%2520visualCanvas.width%2520%252F%25202%250A%2520%2520centerY%2520%253D%2520visualCanvas.height%2520%252F%25202%250A%257D%250A%250A%252F%252F%2520loops%252060%2520frames%2520per%2520second%250A%252F%252F%2520requestAnimationFrame%28loopingFunction%29%253B%250Afunction%2520loopingFunction%28%29%2520%257B%250A%2520%2520requestAnimationFrame%28loopingFunction%29%250A%2520%2520%252F%252F%2520read%2520data%2520from%2520analyser%250A%2520%2520analyser.getByteFrequencyData%28data%29%250A%250A%2520%2520%252F%252F%2520can%2520be%2520used%2520to%2520smooth%2520the%2520curve%2520by%2520deault%2520is%25200.8%250A%2520%2520%252F%252F%2520analyser.smoothingTimeConstant%2520%253D%25200.85%253B%250A%2520%2520%252F%252F%2520draw%2520based%2520on%2520data%250A%2520%2520draw%28data%29%250A%2520%2520%252F%252F%2520drawCircle%28data%29%253B%250A%257D%250A" style="width: 720px; height: 609px; border:0; transform: scale(1); overflow:hidden;" sandbox="allow-scripts allow-same-origin"></iframe>

So we set the width and height of the canvas when the page loads, to take the whole page (window.innerHeight/window.innerWidth). We also center the starting point to the middle of the canvas by setting it to half the height and half the width.

Canvas animations use a looping function that gets called at a rate of 60fps. The requestAnimationFrame sets the looping function and ensures its called at 60fps. In our looping function, we need to call the requestAnimationFrame function to move to ensure we move to the next frame. Also every loop, we get the audio data from the analyser and draw the visual graph. To do so, I've defined a draw function that takes the audio data.

Alright now for the math part. So we are going to be drawing lines while moving in a circle. The first thing to remember is that our button height and width were 120px by 120px, so the radius of our circle is 120.

![](images/circle-4.png)

A circle has 2 \* pi radians (360 degrees) angles. The starting angle that canvas is the right side of the center at 0 radians. Since we want to start drawing at the top of the circle we need to set our start angle to 75% \* 2 \* pi = (2 \* pi \*3)/4

Also to get a position on the circle, we use the angle and radius to get the x-value as r \* cos(angle) and the y-value as r \* sin(angle) from the center. In our case, the coordinates would be x-value = centerX + r \* cos(angle), y-value=centerY + r \* sin(angle)

Finally, the number of values we need to display is data.length and to divide the circle equally between them, we equate the space between each as 2 \* pi/data.length.

For each freq, amplitude pair, we have to display a line whose length depends on the amplitude starting from 75% \* 2 \* pi and adding space each time.

<iframe src="https://carbon.now.sh/embed?bg=rgba%2829%2C61%2C127%2C1%29&amp;t=twilight&amp;wt=none&amp;l=javascript&amp;ds=true&amp;dsyoff=20px&amp;dsblur=68px&amp;wc=true&amp;wa=false&amp;pv=56px&amp;ph=56px&amp;ln=false&amp;fl=1&amp;fm=Hack&amp;fs=14px&amp;lh=133%25&amp;si=false&amp;es=2x&amp;wm=false&amp;code=let%2520ctx%2520%253D%2520visualCanvas.getContext%28%272d%27%29%250Afunction%2520draw%28data%29%2520%257B%250A%2520%2520%252F%252F%2520conver%2520data%2520from%2520unsigned%2520uint8%2520array%2520to%2520regular%2520array%250A%2520%2520data%2520%253D%2520%255B...data%255D%250A%2520%2520%252F%252F%2520clear%2520canvas%250A%2520%2520ctx.clearRect%280%252C%25200%252C%2520visualCanvas.width%252C%2520visualCanvas.height%29%250A%2520%2520let%2520radius%2520%253D%252060%250A%2520%2520let%2520currAngle%2520%253D%2520%28Math.PI%2520*%25202%2520*%25203%29%2520%252F%25204%250A%2520%2520let%2520nextX%2520%253D%2520centerX%2520%252B%2520radius%2520*%2520Math.cos%28currAngle%29%250A%2520%2520let%2520nextY%2520%253D%2520centerY%2520%252B%2520radius%2520*%2520Math.sin%28currAngle%29%250A%2520%2520let%2520spaceArc%2520%253D%2520%28Math.PI%2520*%25202.0%29%2520%252F%2520data.length%250A%2520%2520%252F%252F%2520increase%2520radius%250A%2520%2520%252F%252F%2520and%2520calculate%250A%2520%2520data.forEach%28%28value%252C%2520i%29%2520%253D%253E%2520%257B%250A%2520%2520%2520%2520ctx.beginPath%28%29%250A%2520%2520%2520%2520ctx.moveTo%28nextX%252C%2520nextY%29%250A%2520%2520%2520%2520ctx.lineTo%28%250A%2520%2520%2520%2520%2520%2520nextX%2520%252B%2520value%2520*%2520Math.cos%28currAngle%29%252C%250A%2520%2520%2520%2520%2520%2520nextY%2520%252B%2520value%2520*%2520Math.sin%28currAngle%29%250A%2520%2520%2520%2520%29%250A%2520%2520%2520%2520var%2520gradient%2520%253D%2520ctx.createLinearGradient%28%250A%2520%2520%2520%2520%2520%2520nextX%252C%250A%2520%2520%2520%2520%2520%2520nextY%252C%250A%2520%2520%2520%2520%2520%2520nextX%2520%252B%2520value%2520*%2520Math.cos%28currAngle%29%252C%250A%2520%2520%2520%2520%2520%2520nextY%2520%252B%2520value%2520*%2520Math.sin%28currAngle%29%250A%2520%2520%2520%2520%29%250A%2520%2520%2520%2520gradient.addColorStop%28%270%27%252C%2520%27rgba%28121%252C%2520224%252C%2520201%252C%25201%29%27%29%250A%2520%2520%2520%2520gradient.addColorStop%28%270.3%27%252C%2520%27%252300193F%27%29%250A%2520%2520%2520%2520gradient.addColorStop%28%271%27%252C%2520%27black%27%29%250A%2520%2520%2520%2520ctx.strokeStyle%2520%253D%2520gradient%250A%2520%2520%2520%2520ctx.stroke%28%29%250A%2520%2520%2520%2520nextX%2520%253D%2520centerX%2520%252B%252060%2520*%2520Math.cos%28currAngle%29%250A%2520%2520%2520%2520nextY%2520%253D%2520centerY%2520%252B%252060%2520*%2520Math.sin%28currAngle%29%250A%2520%2520%2520%2520currAngle%2520%252B%253D%2520spaceArc%250A%2520%2520%257D%29%250A%257D%250A" style="width: 720px; height: 867px; border:0; transform: scale(1); overflow:hidden;" sandbox="allow-scripts allow-same-origin"></iframe>

I initialized all the values as mentioned and cleared the canvas as the previous frame drawing will still be present.

The way we draw on the canvas is using paths, we begin a path, move to where we want to draw from, draw lines to other points, and finally closing our path. For every frequency, amplitude pair, I've drawn a line from a point on the circle at the current angle to the point + amplitude at the current angle. I've also colored the line using a gradient from the start point to the finish point using 3 colors at 0%, 30%, and 100%. I've also updated the x, y using the current angle value and updated the current angle value using the space variable.

Challenge: Something I added was that to only loop the canvas drawing animation (requestAnimationFrame) if the state is playing. Try adding that feature by yourself.

That's it, we've learned how to build an audio visualizer. Here's the completed code, just add your client\_id from SoundCloud and try it out.

<p class="codepen" data-height="409" data-theme-id="dark" data-default-tab="js,result" data-user="humaidk2" data-slug-hash="mdrPKKP" style="height: 409px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Audio Vis step 3"><span>See the Pen <a href="https://codepen.io/humaidk2/pen/mdrPKKP">Audio Vis step 3</a> by Humaid (<a href="https://codepen.io/humaidk2">@humaidk2</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

If you really want to get a good handle on the audio data, use the audio data to build another style of visualization, like maybe transform some divs using [animejs](https://animejs.com/).

So here's a reflection on what you've learned:

- Using web audio html element to build your own player
- Using web audio api to get audio data from a source
- Getting the SoundCloud client\_id and track id from any track
- Getting audio data stream from SoundCloud
- Drawing simple diagrams on the canvas in 2d
- Animating the canvas in 2d
- Using angles to compute positions across a circle
- Drawing audio data on the canvas based frequency and amplitude

Awesome work learning all that.

Thanks for reading, leave a comment if you like this sort of content and want to see more. I have 3 article ideas so far: the interview, building a react book carousel, and one on docker. Hope you enjoy them.
