export interface FengShuiElement {
  id: string;
  name: string;
  elementType: 'NgũHành';
  characteristics: string;
  applications: string;
}

export interface CelestialStar extends FengShuiElement {
  yinYang: 'Âm' | 'Dương';
}

export interface Gate extends FengShuiElement {}

export interface Spirit extends FengShuiElement {}

export interface Formation {
  id: string;
  name: string;
  components: string;
  meaning: string;
  auspiciousness: 'Cát' | 'Hung' | 'Tùy thuộc';
  applications: string;
}

export type FengShuiData = CelestialStar | Gate | Spirit | Formation;

export type Category = 'CửuTinh' | 'BátMôn' | 'BátThần' | 'CáchCục';