import {
  _decorator,
  Component,
  Node,
  Prefab,
  resources,
  instantiate,
  Vec3,
  tween,
  math,
} from 'cc';
import { ChipConfig } from './Config';
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;

@ccclass('ChipManager')
export class ChipManager extends Component {
  @property(Node)
  selectedChip: Node = null;

  private radius: number = 100;
  private animationDuration: number = 0.1;
  private isChipsDisplayed: boolean = false;
  private activeChips: Node[] = [];

  @property(AudioController)
  audioController: AudioController = null;

  //initiate touch event
  start() {
    this.selectedChip.on(
      Node.EventType.TOUCH_START,
      this.onSelectedChipClick,
      this
    );
  }

  // when the center chip is clicked, display other chips surrounding it
  onSelectedChipClick() {
    if (this.isChipsDisplayed) {
      this.closeSelection();
      this.audioController.playOnClose();

      return;
    }
    this.audioController.playOnClick();
    this.isChipsDisplayed = true;
    const selectedChipPosition = this.selectedChip.getPosition();
    const chipComponent =
      this.selectedChip.getComponentInChildren('ChipComponent');

    const surroundingChips = ChipConfig.filter(
      (chip) => chip.value !== chipComponent.chipValue
    ).sort((a, b) => a.value - b.value);

    surroundingChips.forEach((chip, index) => {
      this.loadAndAnimateChip(
        chip,
        index,
        surroundingChips.length,
        selectedChipPosition
      );
    });
  }

  replaceChildNode(chipNode: Node) {
    this.selectedChip.children.forEach((child) => {
      if (child !== chipNode) {
        child.destroy();
      }
    });

    this.selectedChip.addChild(chipNode);
    chipNode.setPosition(0, 0, 0);

    this.activeChips = this.activeChips.filter((chip) => chip !== chipNode);
  }

  loadAndAnimateChip(
    chipConfig: any,
    index: number,
    totalChips: number,
    centerPosition: Vec3
  ) {
    resources.load(chipConfig.prefabPath, Prefab, (err, prefab) => {
      const chipNode = instantiate(prefab);
      chipNode.setPosition(centerPosition);
      this.node.addChild(chipNode);
      this.activeChips.push(chipNode);

      const startAngle = 0;
      const totalAngle = 180;
      const angle = math.toRadian(
        startAngle + (totalAngle / (totalChips - 1)) * (totalChips - 1 - index) // Flip the index to start from left to right
      );

      const targetPosition = new Vec3(
        centerPosition.x + Math.cos(angle) * this.radius,
        centerPosition.y + Math.sin(angle) * this.radius,
        centerPosition.z
      );

      tween(chipNode)
        .delay(index * 0.05)
        .to(
          this.animationDuration,
          { position: targetPosition },
          {
            onComplete: (target?: object) => {
              chipNode.on(
                Node.EventType.TOUCH_START,
                () => this.replaceChildNode(chipNode),
                this
              );
            },
          }
        )
        .start();
    });
  }

  closeSelection() {
    const selectedChipPosition = this.selectedChip.getPosition();
    this.activeChips = this.activeChips.filter(
      (chip) => chip !== this.selectedChip
    );

    this.activeChips.forEach((chip) => {
      tween(chip)
        .to(
          this.animationDuration,
          { position: selectedChipPosition },
          { easing: 'cubicIn' }
        )
        .to(
          0,
          { scale: new Vec3(0, 0, 0) },
          {
            easing: 'cubicOut',
            onComplete: () => {
              chip.destroy();
            },
          }
        )
        .start();
    });

    // Clear the list
    this.activeChips = [];
    this.isChipsDisplayed = false;
  }
}
