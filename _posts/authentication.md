---
title: "Modern Authentication"
date: "2020-11-06"
excerpt: 'Security has become an essential service for any modern application. So, it has much more important than ever to question the first line of defence for every application, Authentication! This article covers a discussion about how mdoern authentication is implemented'
coverImage: '/assets/blog/authentication/cover.jpg'
author:
  name: Humaid Khan
  picture: '/assets/blog/authors/hk2.jpeg'
ogImage:
  url: '/assets/blog/authentication/cover.jpg'
categories: 
  - "development"
  - "security"
  - "web"
tags: 
  - "authentication"
  - "discussion"
  - "security"
  - "session"
  - "token"
---

Today's post is about authentication. Authentication is the process of verifying someone's identity and well there are lots of ways to go about it. I've read that a lot of frameworks come with prepackaged ways of handling authentication like [ruby on rails](https://guides.rubyonrails.org/security.html) and [Feathers.js](https://docs.feathersjs.com/guides/basics/authentication.html). There are a lot of ways to handle authentication and they continuously keep evolving. Everyone has their own opinion about how to handle it and you should too.

As a developer, Authentication is just one of those problems that you need to research and find a solution to once and then repeat the solution every time you come by it again. It's like choosing a front end framework, React, Angular, Vue, they're all good and each has their own advantages/disadvantages. You just need to figure out what suits you best and stick with it.

There are a lot of articles on authentication, lots of research, and books too, and everyone has their opinion. You have to be really careful though, especially with articles on the internet, so make sure to check the comments, don't be afraid to ask questions and verify the sources the article provides.

Ok so what do I know about authentication?

The idea is simple, you've been doing it for a long time, you use it every day. When you pick up your phone and enter your pin/fingerprint/face scanning, that right there is a form of authentication. More standard for the web is this

![](/assets/blog/authentication/images/image.png)

Login screen

You enter your username/email and password and the application loads your data and use the application.

**Why do we need username and password?**

Well the application is trying to figure out who you are so you need to enter your own details.

**Why doesn't the application just ask for my username?**

Well then anyone who knows your username can login to your account. Imagine your mom, who knows your username, accessing and posting on your Facebook. OOF right.

Another issue is if two users had the same username, "Bob", and one of them logged in, who's identity would you verify?

This is exactly why we need one piece of unique user information as part of the auth process. Either you can force the user to a unique username or have them login with their email. If usernames are not unique, then the user would have to login with their email(unique email). If usernames are unique, users can login with either their email or username.

**Why doesn't the application just ask for my password then just like my phone?**

With your phone, the phone already knows who is logging in, since only your data is stored on your phone. On the other hand, with the web, we're storing all users information on the back-end and so we need to **uniquely identify** the user by having a username or email. For example, if two users had the same password, and one tried to login with only a password, we would not know who to login.

**How do we verify the username and passwords are valid? Do we store the password and compare them?**

Developers should never store plain text passwords because it's not safe from hackers and other developers. Imagine your company did this and you had a lazy employee who had database access. One day, you decide this to fire this lazy employee, the employee could publicize those passwords, threaten the company, or sell those accounts.

Similarly, if a hacker/attacker got access to the database reading those passwords is horrible. In case of a breach, you can always rollback databases as they have backups and follow the ACID(atomic, consistent, isolation, durable) principle. Databases are pretty sturdy, but there is not much you can do for having plaintext passwords being revealed.

This is really important, please do not store plaintext passwords. A lot of companies are guilty of it and [Google](https://thehackernews.com/2019/05/google-gsuite-plaintext-password.html), [Twitter](https://www.zdnet.com/article/twitter-says-bug-exposed-passwords-in-plaintext/#:~:text=Twitter%20has%20admitted%20that%20user,users%20to%20change%20their%20passwords.), and [Yahoo](https://thenextweb.com/insider/2012/07/12/yahoo-gets-hacked-as-400000-plaintext-credentials-are-posted-online/)

**So How do we verify passwords?**

We store Hashes of the password. **Hashing** is a **one-way** function that produces the same output string for the same input string. The one-way part means that it's almost impossible to reverse the process, we can't get the input string from the output hash.

Let me just show you,

![](/assets/blog/authentication/images/image-2.png)

Hashing files command in Bash

If you followed my git installation tutorial in my first tutorial or you're on Linux/Mac, you should have bash setup and this'll work

Here I used three strings as input: "cool hash", "cool hashes", "cool hash"

When the inputs were the same, it produced the exact same hash: 98e...  
When thee input was changed by only 2 characters, it produced a completely different hash: 9b5...

Hashing functions are really good for verifying passwords because:

1. You always get the same hash for the correct password
2. You can't guess the password string from the Hash

When the user signs up, we ensure they're username is unique so we can identify them. Also we store the hash of the user's password so that we can verify their identity.

When the user logs in, we look for the user with the entered username in the database. We hash the input password and compare the produced hash with the stored hash. If the hashes match, we allow the user to access the application. This process securely authenticates the user

So far, our system allows users to sign up and login, but what if a user signed up with someone else's email? How can we ensure that the email user used was actually theirs and not someone else's?

**How do we verify emails?**

When the user signs up, we'll need to verify their email. To verify the email, I have come across two popular solutions:

1. On login, the application generates and sends a verification code to the user's email. Then, The user is prompted to enter the code. Finally, the entered code is verified, the user account status is set to active, and the user is able to login.
2. The application generates a JSON web token(I'll cover what this is later, but basically it's a string that can hold some data, can be signed, and verified) with some unique data(username, email, userid). The application attaches the token as a parameter to a link. The link is then emailed to the user provided email address. i.e. https://<url>/verifyemail?token=<token>. When the users clicks on the link, the token is verified and an active status is set for the user whose data is stored in the token.

Ok so we have covered signing up(unique info), verifying user's email, and verifying user's identity. Currently though, the application will require you to enter your credentials every time you use the application. Imagine your email provider asked for your email/password every time you want to check your email, it would be secure, but a horrible user experience. Most likely, you'll end up switching to gmail or something.

Basically, we need a way of telling the application that you've already logged in and who you are. The old way of doing things were session based auth. These were later replaced with JSON tokens and now with OAUTH 2.0 connect standard which also uses JSON tokens.

Something to think about before jumping in, is how do we store that the user is logged in:

1. Local Storage, this means we'll store the login state on the client side and with every request, we will pass the user's login state.
2. The other option is cookies. Cookies are just information that are sent with every request for a specific site. Thus, making it a good place to store information that is required with every request.

Alright, let me dive into the differences between session based auth and JSON token based auth:

## Session based auth

So you want to keep the user logged in across different pages and different requests. With session based auth, the user logs in once, a "session" is created and stored in the backend usually in a quick small database. A session is basically some information(state) about the actions the user has performed since they've logged in. A good example of possible session data is items stored in your e-commerce cart. If a user adds items to their cart on the website and you would like to display the same items when the user accesses the mobile version of the application. Either you'd need to store the cart data in a database or you need to use sessions.

Each session data, like our login state, is stored in a database, usually fast caching databases like Redis and each session has a unique session id. This session id is added to the cookie so that every time the user performs a request, the session data is looked up using the session id and confirms the user is logged in.

![](/assets/blog/authentication/images/session-based-auth.png)

session based auth flow: 1-user enter username/password, 2-create session, set cookie, 3-user tries to access api, 4-server finds session using session id that was stored in cookie, 5-api resource is returned

Pros

- Easy to implement, you just need to create a session(database entry) and store the id in the cookie and look up the session every request
- Forget password can be implemented easily and securely. If the user is worried someone logged in to their account, you just need to delete the session for that user and you're done.

Cons

- Stateful servers, breaks [REST](https://restfulapi.net/). REST services is a pattern of designing your servers so that they are easy to scale. Same thing with the [12 factor app](https://12factor.net/), professional developers came together to define best practices to build any good scalable app and stateful servers are an anti-pattern.
- Not good for scaling as everything depends on the session. Imagine you have more than a million users, you'd want to break your authentication in to different auth servers. The issue is that only the auth server can't be broken up and so all requests will have to go through this huge database lookup. There have been case studies of session based auth scaling but generally it becomes a real pain.

## Token based auth

This is the more modern approach to authentication.

[JWT](https://jwt.io/) \- JSON web tokens. Tokens are strings that hold 3 pieces of data

- Header - which holds the token hashing algorithm, giving us an idea of how to verify it.
- Payload - Data we can store, for authentication, this would be username, email - any data we store here is public so don't put secure info like passwords/phone numbers in the payload.
- Verify signature - This is **hash** of the header + '.' + payload + public secret(password). Remember earlier when we were talking about verifying passwords, we mentioned **hashing** and how it's a **one-way** process. So if someone somehow got access to the hash, they can't figure out the secret and thus can't generate or verify this hash.

The signature of the token gives token based auth a lot of flexibility, because anyone with the secret can generate the token and verify the token. Another important feature of the token is that you can set an expiry date for the token, so that it becomes invalid after a certain period and the user will have to login again to get a new token.

When the user logs in and verifies their username/email and password. A token(JWT) is generated using an application specific token secret(password). The token is sent to the user and stored either in the cookie or local storage. The token is sent with every request and the server uses the secret to verify the token.

![](/assets/blog/authentication/images/basic-token-based-auth.png)

Token based auth, 1-enter username/password, 2- generate access token, 3-pass access token with every request, 4-api verifies and returns resource

Pros

- Tokens are stateless. Anybody with the token secret can verify the token. This allows developers to set up virtually infinite servers that could all authenticate the same token.
- Simple to setup as you just need a [jwt library](https://www.npmjs.com/package/jsonwebtoken) and [a token secret](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback), then you'll be able to verify and sign any request

Cons

- If the token was stolen, depending on the expiry set, the attacker could get complete access to the user's account forever.

**That con is pretty big** so why do people still use tokens

## OAUTH2.0: A better approach with Tokens

This authentication scheme works as follows. When the user logs in and we verify their username/email and password, we generate a refresh token using a refresh token secret. The refresh token is stored as a valid token on a database and has a long expiry(1 week - infinite). The refresh token is then sent to the user and stored on the client side. Once the client has the refresh token, it will exchange the refresh token for an access token. The access token that has the same information as the refresh token but uses an access token secret and has a short expiry(10-15mins). All api servers have access to the access token secret, but not only the auth server has access to the refresh token secret. Every subsequent request has the access token attached to it and verified before processing the request. When the access token expires, a new access token is exchanged using the refresh token. When the refresh token expires or revoked, the user is asked to log in.

![](/assets/blog/authentication/images/better-token-based-auth.png)

Oauth2.0 - 1-send username/password, 2-verify and send back refresh token, 3,4-refresh token is exchanged for an access token, 5,6-every request has the access token attached to it

Looking at this scheme, you may say that someone could steal the refresh token similar to the previous token approach. Yup they possibly could, but this time it won't be game over, since we are keeping track of valid refresh tokens. The user can reset their password and we can remove their refresh token from the list.

Pros

- Easy to scale as again any server with the access token secret can verify the access token
- If the refresh token is stolen, we can reset it. If the access token is stolen, it expires in 10-15mins, so it's not a big issue.

Cons

- Kinda complicated to set up and understand. If you're just starting out the other options are easieer to set up

In my opinion, I was a big fan of the cookie based approach cause of how easy it was to setup and lots of libraries supported it, like [passport](http://www.passportjs.org/) makes the job super easy and the cookie didn't have anything inheritably wrong with it. But after personally, having broken down an app into back-end and front-end services, I realized it really is a pain to scale cookie based authentication. Recently I have been learning docker and I like to build a lot of projects and switch between them quickly. So I think that having a single completely separate auth server is a great approach as I can just spin up a new auth server for a new project without changing any code. I think that's a huge advantage and I will be following the 'better token approach with tokens', aka OAUTH2.0, for my projects.

Look the thing is sessions, tokens, hashing, cookies, local storage, these are all tools you can use to build any auth service. If you have a good understanding of these tools, then nothing can throw you off. Most of the major companies combines these tools to build their authentication service. So if you see someone using a different approach to authentication than yours, don't start pointing figures, just learn from it, check for security flaws, and discuss any issues.

Summary

- Have one piece of unique user information for signup and login: username and email
- Verify emails
    - with a code
    - with a jwt link
- Verify passwords
    - finding unique user by username
    - hashing password and comparing it to stored hashed password
- Session based auth
    - Verify user, then create session and store session id in cookie
    - Get session on every request
    - Easy to setup, hard to scale
- Token based auth
    - Verify user, then generate token with token secret and store in localstorage or cookie
    - Verify token with every request
    - Easy to setup, good scaling, but vulnerable as if token is stolen, it can never be revoked
- Better token solution
    - Verify user, then generate refresh token and store in localstorage or cookie and on auth database
    - Verify refresh token, then return access token
    - Send access token with every request, verify access token with every request
    - Good scaling, Safe as refresh token can be removed and access token expires, Hard to setup
- My opinion
    - Previously, I liked session based auth as it's easy to setup and no real vulnerability
    - OAuth2.0 gives the freedom of setting up a single auth server and cloning it for every application so it's my preferred option

Other security tips

- Be careful where you store the tokens. If using cookies, encrypt them and use CSRF tokens to prevent iframe attacks. If using local storage or cookies, be careful of XSS attacks, clean your inputs.
- HTTPS, all your requests, it's really a standard at this point. HTTPS exchanges keys at the start of communication and then encrypts all further communication. So if you were using HTTP and someone launched a MITM(man in the middle) hack, they could read all your data.
- Use HTTPS-ONLY cookies, this encrypts your cookies ensuring they are kept secret.
- 2fa(two factor authentication) this is a great service you can provide that ensures the users identity. Look into making use of authenticator apps.
- Third party authentication, adding sign in with [Google](https://support.google.com/a/answer/60224?hl=en) or Facebook is a good option as it makes the user's life easier. You can add it to your application easily these services usually provide an access token/refresh token and a verification endpoint. You can trade a verified third party token with your own auth server refresh token and treat it as normal authentication
- [Magic links](https://magic.link/) - this is a different approach to auth, where a link is sent to the user and when the user clicks on the link, they are logged in. I can imagine using tokens and/or sockets to set this up, but I haven't done so myself

Alright, that's all I have for you this week. Sorry about the delay again, I promised weekly articles but it's been 4 weeks. I'm not used to writing and authentication is a really heavy topic. I will keep trying to get faster, but no promises. The next article will be small and CSS related so I think it'll be out by next week, Hopefully.

Oh yeah if you want to see some code on authentication, leave me a comment or check out this [super awesome video by the web dev simplified channel](https://www.youtube.com/watch?v=mbsmsi7l3r4).

Leave me a comment if you have any questions or if you liked my article or just want to chat.

Thanks for reading, persist, be patient, and take care.
