import {gatherly} from './gatherly';
import {moolah} from './moolah';
import {ncr} from './ncr';
import {atlanta} from './atlanta';
import {nyc} from './nyc';
import {tokyo} from './tokyo';

export const wallpapers = [
  ...gatherly,
  ...moolah,
  ...ncr,
  ...atlanta,
  ...nyc,
  ...tokyo,
].map(memory => memory.image).filter(image => /\.jpe?g$/i.test(image) && !image.includes('IMG_2017'));
console.log(wallpapers);

export * from './gatherly';
export * from './moolah';
export * from './ncr';
export * from './atlanta';
export * from './nyc';
export * from './tokyo';