const musicPlugins = [
  {
    name: '歌词千寻',
    methods: () => import('./music/geciqianxun')
  },
  {
    name: 'bilibili',
    methods: () => import('./music/bilibili')
  },
  {
    name: 'Audiomack',
    methods: () => import('./music/audiomack')
  },
  {
    name: '歌词网',
    methods: () => import('./music/geciwang')
  },
  {
    name: '快手',
    methods: () => import('./music/kuaishou')
  },
  {
    name: 'Navidrome',
    methods: () => import('./music/navidrome')
  },
  {
    name: '猫耳FM',
    methods: () => import('./music/maoerfm')
  },
  {
    name: 'suno',
    methods: () => import('./music/suno')
  },
  {
    name: 'WebDAV',
    methods: () => import('./music/webdav')
  },
  {
    name: 'udio',
    methods: () => import('./music/udio')
  },
  {
    name: '音悦台',
    methods: () => import('./music/yinyuetai')
  },
  {
    name: 'Youtube',
    methods: () => import('./music/youtube')
  }
]
const videoPlugins = []
export default [...musicPlugins, ...videoPlugins]
