Bumped into this question while setting up Selenium and ChromeDriver on CentOS. Note to self for future reference. The importance is `nuhup` and `&` to run the process in the background.

```
nohup java -Dwebdriver.chrome.driver=chromedriver -jar selenium-server-standalone-2.53.0.jar &
```