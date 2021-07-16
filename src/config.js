const github = {
  username: "enbeec",
  // last ones go on top
  displayRepos: [
    "qmk_firmware",
    "daily-journal",
    "personal-site",
    "theresumebook",
  ],
};

const about = {
  name: "Val Currie",
  bio: ` Ut officia incididunt proident adipisicing eu eiusmod occaecat ea. Voluptate sunt est excepteur amet incididunt tempor voluptate incididunt dolor dolor. Eiusmod mollit mollit duis magna ipsum culpa ut ullamco tempor aute do voluptate occaecat. Ullamco eiusmod duis nostrud duis est est est do quis officia dolore cupidatat. Pariatur ad ad commodo nulla elit ipsum elit reprehenderit. Nostrud sunt est labore reprehenderit ipsum. Ex ipsum sit labore pariatur amet et aliquip aliquip est. Culpa reprehenderit occaecat sint voluptate officia non in. Ea officia consectetur officia mollit incididunt officia ea in exercitation aliquip velit deserunt esse. Ut eu cillum dolor velit laborum sit dolore nisi sunt. Fugiat id elit excepteur dolore pariatur cillum officia. Ipsum laborum laborum proident enim Lorem eiusmod sint eu sint. Tempor occaecat Lorem ad consectetur esse consectetur velit. Dolore consequat labore proident veniam nostrud cillum consequat excepteur. Consectetur excepteur culpa ex dolore. Fugiat proident qui eiusmod enim mollit quis ex officia sit ea cillum anim minim.`,
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
