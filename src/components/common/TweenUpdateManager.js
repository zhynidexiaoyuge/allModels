/**
 * tween 驱动器
 */
import TWEEN from '@tweenjs/tween.js';
import {Timer} from '@jusfoun-vis/common';

const timer = new Timer(Timer.REQUEST_ANIMATION_FRAME);
timer.on('timer', function () {
  TWEEN.update();
});
timer.start();

export default {TWEEN};
