Getting Selenium + Chrome + CentOS up was a nightmare. I give up on Chrome and  ChromeDriver on CentOS. I had Selenium and Chrome working locally on my Mac, but the exact steps do not rollover. After hours, I switched over to Firefox and it worked in 5 minutes. No additional driver needed either.

Here's my steps for running Selenium WebDriver in PHP on CentOS 7, using ***Firefox***. I had a fresh server with nothing installed. You'll want to check out the repo ([facebook/php-webdriver](https://github.com/facebook/php-webdriver)) and get things running locally before proceeding.

### Check version of CentOS

I used an older server running CentOS 5 and ran into complications, so I made sure I was on CentOS 7.

```
$ cat /etc/redhat-release
CentOS Linux release 7.2.1511 (Core) 
```

### Install Java & PHP on CentOS

Skip this if Java and PHP are installed. Make sure you have root privileges as well.

#### Java

```
$ yum install java-1.7.0-openjdk-devel
```

The `java` command should be available.

```
$ java -version
java version "1.7.0_101"
OpenJDK Runtime Environment (rhel-2.6.6.1.el7_2-x86_64 u101-b00)
OpenJDK 64-Bit Server VM (build 24.95-b01, mixed mode)
```

#### PHP

```
$ yum install php
```

### Install Firefox on CentOS

I read so many articles on Selnium and CentOS, but this gist saved the day: https://gist.github.com/textarcana/5855427

```
$ yum -y install firefox Xvfb libXfont Xorg
$ yum -y groupinstall "X Window System" "Desktop" "Fonts" "General Purpose Desktop"
```

Launch an XWindows Virtual Frame Buffer(XVFB) session on display port 99:

```
$ Xvfb :99 -ac -screen 0 1280x1024x24 &
```

Tell all XWindows applications in this terminal session to use the new Xvfb display port:

```
$ export DISPLAY=:99
```

### Download Selenium Server

You're looking for the Selenium server as `selenium-server-standalone-#.jar` provided here: http://selenium-release.storage.googleapis.com/index.html. I'm using `selenium-server-standalone-2.53.0.jar`.

#### Run it as a background process

The importance is `nuhup` and `&` to run a process in the background on Linux.

```
nohup java -jar selenium-server-standalone-2.53.0.jar &
```

#### Kill the process

TIL: If you want to kill the process, use `ps` to view running processes.

```
$ ps
  PID TTY          TIME CMD
 5260 pts/1    00:00:00 bash
 5527 pts/1    00:00:00 java
 5550 pts/1    00:00:00 ps
```

And to terminate:

```
$ kill 5527
```

### Run a test

Make sure libraries have been moved over or installed properly to the server. 

```
$ wget https://raw.githubusercontent.com/facebook/php-webdriver/community/example.php
$ php example.php
```

Finally. I can begin running my test cases.