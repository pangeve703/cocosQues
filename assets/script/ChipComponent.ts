import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChipComponent')
export class ChipComponent extends Component {
  @property
  chipValue: number = 0;
  @property
  type: string = '';
}
