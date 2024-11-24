System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Label, Node, Prefab, resources, tween, Vec3, ChipConfig, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, BetZoneComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfChipConfig(extras) {
    _reporterNs.report("ChipConfig", "./Config", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ChipConfig = _unresolved_2.ChipConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8045alsXTJFEa9UGyzfbkuV", "BetZoneComponent", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Label', 'Node', 'Prefab', 'resources', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BetZoneComponent", BetZoneComponent = (_dec = ccclass('BetZoneComponent'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Node), _dec5 = property(Label), _dec6 = property(Node), _dec(_class = (_class2 = class BetZoneComponent extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "zoneLabel", _descriptor, this);

          _initializerDefineProperty(this, "ratioLabel", _descriptor2, this);

          _initializerDefineProperty(this, "chipManagerNode", _descriptor3, this);

          _initializerDefineProperty(this, "totalStakeLabel", _descriptor4, this);

          _initializerDefineProperty(this, "labelNode", _descriptor5, this);

          this.chipManager = null;
          this.activeChips = [];
          this.totalValue = 0;
          this.lastBet = [];
          this.previousTotal = 0;
        }

        start() {
          if (this.chipManagerNode) {
            this.chipManager = this.chipManagerNode.getComponent('ChipManager');
          }

          this.node.on(Node.EventType.TOUCH_START, this.placeChip, this);
        }

        placeChip() {
          const chipNode = instantiate(this.chipManager.selectedChip.children[0]);
          const chipComponent = chipNode.getComponent('ChipComponent');
          const chipValue = (chipComponent == null ? void 0 : chipComponent.chipValue) || 0;
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
            tween(chip).to(0.3, {
              scale: new Vec3(0, 0, 0)
            }, {
              easing: 'cubicInOut'
            }).call(() => chip.destroy()).start();
          });
          this.activeChips = [];
          let remainingValue = this.totalValue;
          const sortedChips = (_crd && ChipConfig === void 0 ? (_reportPossibleCrUseOfChipConfig({
            error: Error()
          }), ChipConfig) : ChipConfig).sort((a, b) => b.value - a.value);
          let stackHeight = 0;
          sortedChips.forEach(chipConfig => {
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

        animateChipPlacement(chipNode, stackHeight) {
          const nodePosition = this.node.getPosition();
          const abovePosition = new Vec3(nodePosition.x, nodePosition.y + 20, nodePosition.z);
          const targetPosition = new Vec3(nodePosition.x, nodePosition.y + stackHeight, nodePosition.z);
          chipNode.setScale(0.6, 0.6, 0.6);
          chipNode.setPosition(abovePosition);
          this.node.parent.addChild(chipNode);
          this.activeChips.push(chipNode);
          tween(chipNode).to(0.3, {
            position: targetPosition,
            scale: new Vec3(0.4, 0.4, 0.4)
          }, {
            easing: 'bounceOut'
          }).start();
        }

        clearAllChips() {
          this.activeChips.forEach((chip, index) => {
            tween(chip).to(0.3, {
              worldPosition: new Vec3(50, 0, 0)
            }, {
              easing: 'cubicInOut'
            }).call(() => chip.destroy()).start();
          });
          this.lastBet = this.activeChips;
          this.activeChips = [];
          this.previousTotal = this.totalValue;
          this.totalValue = 0;
          this.updateLabel();
        }

        betAgain() {
          if (this.totalValue == this.previousTotal) return;
          this.activeChips.forEach(chip => {
            this.lastBet.push(chip);
          });
          this.totalValue = this.previousTotal;
          this.updateChips();
          this.updateLabel();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "zoneLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ratioLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "chipManagerNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "totalStakeLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d6a22fbd670444abb7307e8e34e3c64c2c19187e.js.map