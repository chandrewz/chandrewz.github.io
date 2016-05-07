# Run a Process in the Background on Linux

I bumped into this question while setting up Selenium on CentOS. Saving this for myself for future reference.

```
nohup java -Dwebdriver.chrome.driver=chromedriver -jar selenium-server-standalone-2.53.0.jar &
```

The importance is `nuhup` and `&`.