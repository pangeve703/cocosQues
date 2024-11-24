import { _decorator, Component, Node } from 'cc';
import { BetZoneComponent } from './BetZoneComponent';
const { ccclass, property } = _decorator;

@ccclass('BetAgain')
export class BetAgain extends Component {
  @property(Node)
  tiles: Node = null;
  start() {}

  update(deltaTime: number) {}

  betAllAgain() {
    this.tiles.children.forEach((childNode) => {
      const betZoneComponent =
        childNode.getComponentInChildren(BetZoneComponent);
      if (betZoneComponent) {
        betZoneComponent.betAgain();
      }
    });
  }
}
