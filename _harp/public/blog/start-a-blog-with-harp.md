I had [chandrewz.github.io](http://chandrewz.github.io) up for a while with nothing on it. I decided to put up a blog and I'd write down things I google at work and TIL's. I was considering Pelican before stumbling upon Harp.js. I found Harp's installation process much easier and that converted me.

### Installing Harp (make sure `npm` is installed)

```bash
sudo npm install -g harp
```

### Initiate a harp project (using Boilerplate)

Yeah, you can use `harp init` by itself, but I wanted something up quickly. I also had my blog repo, so I `cd`'ed in there. I used the [Simurai](https://github.com/kennethormandy/hb-simurai) boilerplate.

For a full list of templates, see: https://github.com/harp-boilerplates/registry/blob/master/index.json

```bash
harp init --boilerplate kennethormandy/hb-simurai _harp
```
That imports all the boilerplate files into the `_harp` directory.

### Compile & Serve

From my project directory:

```bash
harp compile _harp ./
harp server
```

I'm compiling the `_harp` directory and generating the static content into the root directory of my project. The generated website can be accessed on [localhost:9000](http://localhost:9000).

### Push it live

```bash
git push origin master
```

And we're done.
