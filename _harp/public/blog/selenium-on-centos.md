Here's my steps for running Selenium WebDriver in PHP on CentOS 7. I had a fresh server with nothing installed. I also opt for using ChromeDriver. You'll want to check out the repo ([facebook/php-webdriver](https://github.com/facebook/php-webdriver)) and get things running locally before proceeding.

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
yum install java-1.7.0-openjdk-devel
```

The `java` command should be available.

```
$ java -version
java version "1.7.0_101"
OpenJDK Runtime Environment (rhel-2.6.6.1.el7_2-x86_64 u101-b00)
OpenJDK 64-Bit Server VM (build 24.95-b01, mixed mode)
```

Cool, I'm also on a 64-bit machine.

#### PHP

```
yum install php
```

### Install Google Chrome on CentOS

This step is optional if Chrome isn't your thing. For my project, this is all I need. I followed the instructions from [chrome.richardlloyd.org.uk](http://chrome.richardlloyd.org.uk/).

```
wget http://chrome.richardlloyd.org.uk/install_chrome.sh
chmod u+x install_chrome.sh
./install_chrome.sh
```

Confirm that `google-chrome` works.

```
$ google-chrome --version
Google Chrome 50.0.2661.94 
```

### Download Selenium Server & ChromeDriver

#### Selenium Server

You're looking for the Selenium server as `selenium-server-standalone-#.jar` provided here: http://selenium-release.storage.googleapis.com/index.html. I'm using `selenium-server-standalone-2.53.0.jar`.

#### ChromeDriver

Next, I need [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads). Download the appropriate release. I'm sure there's other ways to install ChromeDriver but I download the file directly.

FTP into the server upload them. I keep these 2 files in the project folder.

Go ahead and make `chromedriver` executable.

```
chmod +x chromedriver
```

### Run as a background process

The importance is `nuhup` and `&` to run a process in the background on Linux.

```
nohup java -Dwebdriver.chrome.driver=chromedriver -jar selenium-server-standalone-2.53.0.jar &
```

#### Kill the process

Use `ps` to view running processes.

```
$ ps
  PID TTY          TIME CMD
 5260 pts/1    00:00:00 bash
 5527 pts/1    00:00:00 java
 5550 pts/1    00:00:00 ps
```

And to terminate:

```
kill 5527
```

### Run a test

Make sure lib

```
php example.php
```