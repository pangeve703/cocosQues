import { _decorator, Component, Label, Node, Sprite, tween } from 'cc';
import { AnimationScript } from './AnimationScript';
import { BetZoneComponent } from './BetZoneComponent';
const { ccclass, property } = _decorator;

@ccclass('CountdownTimer')
export class CountdownTimer extends Component {
  @property(Sprite)
  timerSprite: Sprite = null;
  @property(Label)
  timerLabel: Label = null;
  @property
  duration: number = 10;
  @property(AnimationScript)
  animationScript: AnimationScript = null;
  @property(Node)
  timer: Node = null;
  @property(Node)
  tiles: Node = null;

  private elapsedTime: number = 0;
  private isPulsing: boolean = false;
  start() {
    this.startTimer();
  }

  startTimer() {
    this.elapsedTime = 0;
    this.timerSprite.fillRange = 1;
    this.updateLabel(this.duration);
    this.animationScript.fadeIn(this.timer, 1, () => {
      this.schedule(this.updateTimer, 0); // 0 means run every frame
    });
  }

  updateTimer(deltaTime: number) {
    this.elapsedTime += deltaTime;

    const remainingTime = Math.max(this.duration - this.elapsedTime, 0);
    this.timerSprite.fillRange = remainingTime / this.duration;
    this.updateLabel(Math.ceil(remainingTime));

    if (remainingTime <= 3 && !this.isPulsing) {
      this.isPulsing = true;
      this.animationScript.pulseAnimation(this.timerLabel.node);
    }

    if (remainingTime <= 0) {
      this.animationScript.stopPulseAnimation(this.timerLabel.node);
      this.unschedule(this.updateTimer);
      this.onTimerComplete();
      this.isPulsing = false;
    }
  }

  updateLabel(time: number) {
    this.timerLabel.string = `${time}`;
  }

  onTimerComplete() {
    this.animationScript.fadeOut(this.timer, 1, () => {
      this.scheduleOnce(() => {
        this.startTimer();
      }, 10);
    });
    this.clearChipsInAllZones();
  }

  clearChipsInAllZones() {
    this.tiles.children.forEach((childNode) => {
      const betZoneComponent =
        childNode.getComponentInChildren(BetZoneComponent);
      if (betZoneComponent) {
        betZoneComponent.clearAllChips();
      }
    });
  }

  update(deltaTime: number) {}
}
