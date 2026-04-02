const getAssetUrl = (path) => new URL(path, import.meta.url).href;

// GLOBAL UI TEXT (STATIC FOOTER)
export const studioContent = {
  title: 'FACILITY // WE DO MORE STUDIOS',
  text: 'OPERATING WITHIN ONE OF THE PREMIER ACOUSTIC ENVIRONMENTS IN THE DUBAI REGION. A MASTER-CLASS ARCHITECTURE DESIGNED FOR HIGH-FIDELITY SONIC CAPTURE.',
  notation: 'REF_STUDIO_DXB // 2026_COLLECTION'
};

// IMAGE ASSETS
export const studioData = [
  {
    id: '01',
    title: 'TRACKING ROOM // MAIN HALL',
    meta: 'ASSET-01 // ACOUSTIC_LARGE',
    desc: 'Grand tracking space featuring wood-slat diffusion and a Yamaha C7 grand piano. Optimized for natural reverb and ensemble recording.',
    images: {
      webp: "/studioimages/studio1.webp",
    }
  },
  {
    id: '02',
    title: 'ISO BOOTH // DRUM SECTOR',
    meta: 'ASSET-02 // ISOLATED_CAPTURE',
    desc: 'High-density isolation booth featuring a professional drum kit. Dead-space configuration for clinical percussion clarity.',
    images: {
      webp: "/studioimages/studio2.webp",
    }
  },
  {
    id: '03',
    title: 'LIVE ROOM // PERSPECTIVE B',
    meta: 'ASSET-03 // SPATIAL_FLOW',
    desc: 'Visual line-of-sight between the main hall and control room. Integrated structural pillars providing natural sound dispersion.',
    images: {
      webp: "/studioimages/studio3.webp",
    }
  },
  {
    id: '04',
    title: 'CONTROL ROOM // COMMAND',
    meta: 'ASSET-04 // ANALOG_INTERFACE',
    desc: 'The nerve center. Houses a world-class outboard rack, custom monitoring, and an ergonomic workstation for precision mixing.',
    images: {
      webp: "/studioimages/studio4.webp",
    }
  },
  {
    id: '05',
    title: 'LOUNGE // CLIENT SUITE',
    meta: 'ASSET-05 // MONITOR_REAR',
    desc: 'Rear control room view featuring leather seating and secondary monitoring. Designed for client comfort and critical listening.',
    images: {
      webp: "/studioimages/studio5.webp",
    }
  }
];