import {
  _decorator,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  resources,
  tween,
  Vec3,
} from 'cc';
import { ChipConfig } from './Config';
const { ccclass, property } = _decorator;

@ccclass('BetZoneComponent')
export class BetZoneComponent extends Component {
  @property(Label)
  zoneLabel: Label = null;
  @property(Label)
  ratioLabel: Label = null;
  @property(Node)
  chipManagerNode: Node = null;
  @property(Label)
  totalStakeLabel: Label = null;
  @property(Node)
  labelNode: Node = null;

  private chipManager: any = null;
  private activeChips: Node[] = [];
  private totalValue: number = 0;
  private lastBet: Node[] = [];
  private previousTotal: number = 0;

  start() {
    if (this.chipManagerNode) {
      this.chipManager = this.chipManagerNode.getComponent('ChipManager');
    }

    this.node.on(Node.EventType.TOUCH_START, this.placeChip, this);
  }

  placeChip() {
    const chipNode = instantiate(this.chipManager.selectedChip.children[0]);

    const chipComponent = chipNode.getComponent('ChipComponent');
    const chipValue = chipComponent?.chipValue || 0;

    this.totalValue += chipValue;
    this.updateLabel();
    this.updateChips();
  }

  updateLabel() {
    this.totalStakeLabel.string = this.totalValue.toString();
    if (this.totalValue > 0) {
      this.labelNode.active = true;
    } else {
      this.labelNode.active = false;
    }
  }

  updateChips() {
    this.activeChips.forEach((chip, index) => {
      tween(chip)
        .to(0.3, { scale: new Vec3(0, 0, 0) }, { easing: 'cubicInOut' })
        .call(() => chip.destroy())
        .start();
    });

    this.activeChips = [];
    let remainingValue = this.totalValue;

    const sortedChips = ChipConfig.sort((a, b) => b.value - a.value);
    let stackHeight = 0;

    sortedChips.forEach((chipConfig) => {
      while (remainingValue >= chipConfig.value) {
        remainingValue -= chipConfig.value;

        resources.load(chipConfig.prefabPath, Prefab, (err, prefab) => {
          if (err) {
            return;
          }

          const chipNode = instantiate(prefab);
          this.animateChipPlacement(chipNode, stackHeight);
          stackHeight += 2;
        });
      }
    });
  }

  animateChipPlacement(chipNode: Node, stackHeight: number) {
    const nodePosition = this.node.getPosition();
    const abovePosition = new Vec3(
      nodePosition.x,
      nodePosition.y + 20,
      nodePosition.z
    );
    const targetPosition = new Vec3(
      nodePosition.x,
      nodePosition.y + stackHeight,
      nodePosition.z
    );
    chipNode.setScale(0.6, 0.6, 0.6);
    chipNode.setPosition(abovePosition);
    this.node.parent.addChild(chipNode);
    this.activeChips.push(chipNode);

    tween(chipNode)
      .to(
        0.3,
        { position: targetPosition, scale: new Vec3(0.4, 0.4, 0.4) },
        { easing: 'bounceOut' }
      )
      .start();
  }

  clearAllChips() {
    this.activeChips.forEach((chip, index) => {
      tween(chip)
        .to(
          0.3,
          { worldPosition: new Vec3(50, 0, 0) },
          { easing: 'cubicInOut' }
        )
        .call(() => chip.destroy())
        .start();
    });

    this.lastBet = this.activeChips;
    this.activeChips = [];
    this.previousTotal = this.totalValue;
    this.totalValue = 0;
    this.updateLabel();
  }

  betAgain() {
    if (this.totalValue == this.previousTotal) return;
    this.activeChips.forEach((chip) => {
      this.lastBet.push(chip);
    });
    this.totalValue = this.previousTotal;

    this.updateChips();
    this.updateLabel();
  }
}
