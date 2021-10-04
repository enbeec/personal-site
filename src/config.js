const github = {
  username: "enbeec",
  // last ones go on top
  displayRepos: [
    "localserve",
    "qmk_firmware",
    "daily-journal",
    "personal-site",
    "theresumebook",
    "critters",
  ],
};

const about = {
  name: "Val Currie",
  bio: `tl;dr -- avid learner with extra-full-stack experience (networking, hardware, operating systems, infrastructure in addition to application-layer experience) that goes beyond my professional training in web development.

--- The Full Story ---

> The year is 2001 and a tiny, tiny Val is typing "ipconfig /?" into
> something called "cmd" on the family Compaq running Windows 95.
> She doesn't know what any of it means, but the awakening has begun.

In the 20 years since I first discovered the beautiful, information rich internals of modern operating systems I've picked up quite a few skills:

- I think infrastructure is really neat and have dabbled with orchestration and deployment pipelines in my personal time. I would love to try my hand at DevOps!

- Having pestered my parents into signing me up for violin lessons around the same time I started using the computer and those skills have merged in the last 5-6 years. I produce music using a variety of electronics and am comfortable with the theory behind sound and digital audio.

- I am familiar with a variety of operating systems -- I have over a decade of experience with both MacOS and Windows but am most interested in open source offerings, namely FreeBSD, a little OpenBSD and lots of time with Debian-based Linux distros like Ubuntu. Oh, and I've been playing with MUSL/non-GNU Linuxes lately (namely Alpine Linux)!

- Throughout the years, I've spent time playing with microcontrollers like the ESP32/ESP8266, Arduino UNO and the Teensy 32bit line. Most of what I do there is more artistic but I also have some experience with technologies like MQTT that fit more IoT-like applications.

- I know enough about networking to be dangerous and host some services on a private network. I know what the network layers are and even how a few of them work.`,
  handle: "valcuri",
};

const site = {
  projectBoard: {
    cardRemWidth: 18,
    cardRemHeight: 12,
  },
};

export const config = () => {
  const c = {
    github,
    about,
    site,
  };
  c.site.projectBoard.cardWidth = rem2px(site.projectBoard.cardRemWidth);
  c.site.projectBoard.cardHeight = rem2px(site.projectBoard.cardRemHeight);
  return c;
};

// TODO move this so I can support font resizing
const rem2px = (rem) => {
  return rem * parseFloat(getComputedStyle(document.body).fontSize);
};
