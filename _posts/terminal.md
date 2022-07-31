---
title: "The Terminal"
date: "2022-07-31"
excerpt: "The terminal is one of those tools that I use everyday, so learning a bit more about and spending some time configuring it can lead to a huge amount of time saved in the long run."
coverImage: "/assets/blog/terminal/cover.jpg"
author:
  name: Humaid Khan
  picture: "/assets/blog/authors/hk2.jpeg"
ogImage:
  url: "/assets/blog/terminal/cover.jpg"
categories:
  - "coding"
tags:
  - "terminal"
  - "commands"
  - "command line"
---

The terminal is one of the developer defining tools. I mean if you watch any movie or tv show, they always show the tech guy typing super fast on their terminal. Although the typing fast part of it is all fiction, the terminal is a must know tool for any developer. Learning a bit more about it here will help save a lot of your time in the long run. Here's what I'm gonna go over:

1. My Setup
2. Basic Commands
3. Advanced Commands
4. Scripting

# Basic Commands

These are commands that anybody who's ever opened a terminal should know.

## ls

ls is a command used to list the all files and folders in the current directory.

![ ls](/assets/blog/terminal/images/ls.png)

The -a option shows all files/folders including hidden ones.
Hidden Files/Folders are named so that they start with the '.' character.
They don't usually show up in File explorer or Finder.
Common examples of hidden files are .git folder which is used to store details about your project by git. Another example is .ssh, which is a folder that stores keys in your computer.

The -l option lists more details about the files/folders such as the size, the permissions, and the number of files within the file/fodler

![ ls commands](/assets/blog/terminal/images/ls-la.png)

File permissions are represented as drwxrw-rwx. The first character, 'd', represents whether it's a file or folder(directory). The rest of the 9 characters represent permissions for 3 different groups of users.

1. owner of the file
   The owner of the file is normally you, the person who created the file.
2. group of owners
   This represents the group of users who can access this file.
3. others
   This is anyone else on the system who has access to the system and is not the person

You can control how each of these types of users can access the file.
When you typed in the command ls -la, you could see the current owner and the group the file belonged to right after the file count.

The 3 characters rwx represent read, write and execute. Read and write are obviously permissions for reading and writing from/to the file. Execute permissions allow users to run the file, this is especially important to scripting which we'll cover at the end of this article.

By default ls runs on the current directory but you can pass it the name or path of a folder and it will list the files in that folder

```
ls pages
```

## pwd

Normally you can see your current directory on the same line you're typing in the terminal, but this isn't the full path. To get the full path, you can use the command pwd, which stands for print working directory

## cd

To move to another folder(directory), you have to use the change directory command
cd <folder-name>

You can move to the previous directory by running cd ..

'..' in general refers the parent directory, while '.' represents the current directory.

![ cd commands](/assets/blog/terminal/images/cd.png)

Try these steps to get an understanding of the commands we've learned so far.

1. get the current directory location
2. find what files are in the current directory
3. navigate to one of the folders in the current directory
4. get the current directory location
5. find what files are in the current directory

## cp

The copy command is used to create a duplicate of any file on your system

It takes 2 arguments the location of the file and the location where you would copy it to.

```
cp <file-name> <newPath>
```

When we select a file, we can select by choosing any file in the current directory,
in which case, we simply put the file name in the command or we could pick any file from anywhere on our computer. In which case, we need to pass the entire path to the file. For example check out the screenshot below

![cp commands](/assets/blog/terminal/images/cp.png)

Here you notice for the last command, I've copied the file from the desktop to my current folder, this path(location) is known as the absolute path to the file. Also note the path that starts with './' or '../../../' are known as relative paths as they depend on the what your current directory is.

Note to copy folders, you need to use the -r option with cp, this option stands for recursive copy, which means that it'll copy all the files in the folder and all files within any folder within the folder.

```
cp -r <folder-name> <newPath>
```

## mv

The move command is really similar to the copy command except it doesn't create a duplicate but instead moves the location of the original file.

## rm

The remove command is used to delete files. Be careful, these files are deleted forever, there's no recycle bin in the terminal.

```
rm <path-to-file>
```

Note similar to the copy command, to delete folders, you will have to use the -rf option which recursively deletes folders and files within the folder.

```
rm -rf <folder-name>
```

## mkdir

If you want to create a new folder use the make directory commadn,

```
mkdir <path-to-folder>
```

The -p option allows you to create folders, sub folders, and sub sub folders all in one go

```
mkdir -p <path-to-folder>/<sub-folder>
```

## echo

echo is a super simple command to print any string to the terminal

e.g. echo "hello world"

## Redirection operators - >/>>/<<

You can use the > operator after any command to print the output into a file.

The > operator will create a new file if one does not exist, it will also overwrite the file if it already exists.

```
echo "hello" > test.txt
```

The >> operator is used to append to an existing file, it will also create a new file if one does not already exist.

The < operator is used to read files and run commands off of them. Remember you need permissions to run commands on files.

```
cat < text.txt
```

![redirect input command](/assets/blog/terminal/images/redirect.png)

## cat

cat is a simple command for printing the contents of a file to the terminal, you can add line numbers with the -n option

```
cat -n test.txt
```

## The pipe operator - |

This operator is used to pass arguments from one command to the next one

```
ls | wc -l
```

ls is the list files/folders command, wc is the word count command, with the -l option wc prints the number of lines.

Hence, this compound command will print the number of files in the current directory

# Advanced Commands

Alright enough of the basics, time to go look in a it deeper

## ln

Symbolic linking, sounds complicated but it's basically used to create a shortcut to other folders in your system. It's used to teleport from one folder to another.

You could use it to organize your folders without storing all your files in one place.
Though as a software engineer, I'm a fan of one location for one folder.

I guess a use-case that I could imagine is linking to external hard drive. That way you can access files easily without copying it over to your actual computer.

They're also used in some libraries to link dependencies.

```
ln -s <path-to-target-folder> <path-to-link>
```

![ln commands](/assets/blog/terminal/images/ln-s.png)

## find

Ok so that last one may not have seemed that useful to most people, but this next one will definitely help everyone.

Have you tried to search for a file and it takes ages?

Well look no further, here we have the find command, which will search through folders and files and quickly and actively give you results.

Simply type in:

```
find . -iname "test.txt"
```

'.' here represents the current folder but you can pass in any directory you like.

The script above, will search through all the files and folders in the current directory for the file named test.txt

The trick here though is that the tools are only as powerful if you know how to use them well or else it will take a long time.

What I'm trying to say is that when you are searching for files you need to provide as much information as possible and find lets you do that.

- You can look for specific types of files by using the file extension e.g. jpg files(images) "\*.jpg"
- You can tell find to look only a certain level deep by passing the maxdepth option, e.g. -maxdepth 2
- You can pass in the minimum size of the file by using the size option, e.g. -size +5M 2

![find commands](/assets/blog/terminal/images/find.png)

## grep

Grep is an awesome tool that searches for strings in your files.

A real world use is looking for errors in log file

```
grep <string-to-be-searched> <path-to-file>
```

You can search through folders and all files using the -R option:
e.g. -R \<string-to-be-searched> \<path-to-folder>

You can also find a certain number of lines before and after the matched string, by using the -B before and -A after option.

e.g. grep -B 2 -A 2 test cool.txt will find the line with test in the file cool.txt. It will also print 2 lines before and 2 lines after the matched line.

You can also tell grep to avoid the matched line, this could be used to delete lines from files. To do this, you have to use the -v option.

e.g. grep -v test cool.txt will print all lines that don't have the word test in the cool.txt

![grep commands](/assets/blog/terminal/images/grep.png)

Example of creating a new file after deleting matched lines

![grep remove matched line command](/assets/blog/terminal/images/grep-2.png)

A cool example of combining commands is searching through all txt files

```
find <path-to-search> -name '*.txt' | xargs grep <search-string>
```

## sed

The replace command, sed is used to replace any text in a file or stream

Simply define the regex that matches the text and you can replace all the matches in the file.

```
sed 's/COOL_VARIABLE/false/g' <file>
```

^This will output the replaced command to the shell. To replace the text inside the file, use the -i option as in:

```
sed -i 's/COOL_VARIABLE/false/g' <file>
```

## ssh

If you want to run commands on another computer, you have to use a secure shell, ssh.
You can connect connect to any computer on your network

To connect to a secure shell, you need to enable ssh by running:

```
sudo systemctl start ssh
```

ssh runs on port 22 by default, so if you have some firewalls rules, you'd need to make sure the port 22 is not blocked.

Note: if you have a raspberry Pi, this is one of the ways to connect to it.

Normally there's 2 types of security with ssh, password based, where you connect with ssh and enter the ssh password and it connects a shell to the machine.

```
ssh  <user>@<host>
```

A more secure approach that's often used in real machines is private/public keys,
generate a private/public key pair on the machine you want to connect from and set a password for the key.

Then, copy over the public key to the machine you want to connect to the allowed list of keys.
You can then connect to the server using the following command:

```
ssh -i <private_key> <user>@<host>
```

## scp

Connecting to ssh is cool, but what if you want to copy files to this machine or copy files back. The cp command only works on the machine it's currently on. To copy files over the network, you need to use the secure copy command, scp. It's basically a combination of cp and ssh.

```
scp <file> <user>@<host>:<dest>
```

```
scp <user>@<host>:<src> <dest>
```

## curl

To perform http requests from the terminal, we use curl. It's the perfect tool to quickly test if api are reachable or if websites are up.

```
curl <url>
```

## awk

awk is a pretty much a programming language built into the shell. You can use it to do some computations.

I had to use this for an assignment for a cinema management system. It was really not fun to write.

Not sure why, you would use an language in the shell, when you can easily install node and run js with tons of libraries.

I guess the best use case would be cleaning data in files

It's also a bit out of scope of this article, but here's a Hello world program:

```
awk 'BEGIN { printf "Hello World\n" }'
```

You can read more about awk here:
[awk tutorial to manipulate text](https://digitalocean.com/community/tutorials/how-to-use-the-awk-language-to-manipulate-text-in-linux)

## cheat

Alright if you managed to get this far in the article and you think you're going to forget all these commands, you're probably right, even I don't remember the exact way to use some of these commands.

I have a trick for you though. This is the one thing I want you to take from this article.

You can install a program called [cheat](https://github.com/cheat/cheat).
On mac, it's simply:

```
brew install cheat
```

and then whenever you want to know how to run a program, run:

```
cheat <program>
```

For example:

![cheat cp](/assets/blog/terminal/images/cheat.png)

And it'll give you small cheat sheet of the common ways to use a program.

# Scripting

Now that you know some commands, what if you want to run a bunch of them together to perform a certain task. Rather than repeat the same commands over and over again, we use a script file.

## Creating a script file

Create a new file:

```
echo #!/bin/bash > test.sh
echo "echo Hello World" >> test.sh
```

Here I've used redirection to create a new file called test.sh and set the first line to be #!/bin/bash.
I've also appended the command "echo hello world" in the script file. So when we run the script file, it will print hello world in the terminal.

Note the .sh extension implies that it's a shell script file.

## Permissions

To run this file, you simply need to type in the absolute or relative path to the file, i.e:

```
/Users/humaidkhan/Desktop/test.sh
```

or if you're in the desktop directory:

```
./test.sh
```

If you try to run this file right now, it won't work cause by default, for security concerns, the os doesn't give you execute permissions on new files.

```
ls -la test.sh
```

You can see that you have 'r'(read) permissions but not 'x'(execute) permissions.

To change permissions, we use the chmod command, since we want to add execute permissions for the current user, we can use it as follows:

```
chmod u+x test.sh
```

Now if you check the permissions, you can see the 'x':

```
ls -la test.sh
```

and run the script:

```
./test.sh
```

![ script commands](/assets/blog/terminal/images/script.png)

Now you're setup to running and understanding script files.

## bashrc/zshrc

bash is the default shell that runs by default on linux/mac machines. You can replace with zsh, which is more modern and has support for many plugins and can be configured for autocompletions for many commands.

You can configure your shell using rc files, as in configuration files. By default, these are in the root directory of your computer and run when you start the shell.

```
cd
cat .zshrc
```

One of the cool ways you can configure it is adding aliases for any command or group of commands.

For zshrc files, this would be like so:

```
g = git
gs = g status
listAll = ls -la
fileCount = 'ls | wc -l'
```

We can also read the arguments passed to the function, using the $ operator, where $1 is the first argument, $2 is the second,etc... For a group of commands, functions, this would be as follows:

```
helloWorld() {
  echo hello
  echo world
  echo !!!!!
  echo $1
}
```

Then we can run the command as follows:

```
helloWorld wow
```

It's very similar in the bashrc files, functions are exactly the same and aliases are like this:

```
alias fileCount = 'ls | wc -l'
```

and functions are the exact same way as zshrc.

## crontab

Cron tabs allow you to run tasks recurringly, every few minutes or every day or every hour.

To setup cron jobs, you need to modify the crontab file, run:

```
crontab -e
```

Modify the file, and add the recurring task to be performed,

I highly recommend you use cheat crontab, to look at the format of the command:

```
*/10 * * * * * echo hello
```

This will run test.sh every minute

# Conclusion

That's all the basics of getting started with shell scripting

Shell scripting is a pretty nifty tool to solving lots of issues on the fly. You can setup a bunch of aliases and have a nice toolkit to save you a lot of time.

I recommend getting some practice in using shell and docker. It would be actually cool to keep some cron jobs in a docker container to keep your shell scripts secure and easy to start/stop
Also, If you're a beginner, I really recommend you use the cheat command to get a small cheat sheet.

This article took me longer than expected, I get busy pretty easily, but it was def worth it, I referenced it a bit while working on it. Hope you enjoyed it.
