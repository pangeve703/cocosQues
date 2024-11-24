System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, resources, instantiate, Vec3, tween, math, ChipConfig, AudioController, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, ChipManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfChipConfig(extras) {
    _reporterNs.report("ChipConfig", "./Config", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAudioController(extras) {
    _reporterNs.report("AudioController", "./AudioController", _context.meta, extras);
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
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      math = _cc.math;
    }, function (_unresolved_2) {
      ChipConfig = _unresolved_2.ChipConfig;
    }, function (_unresolved_3) {
      AudioController = _unresolved_3.AudioController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "76ad0DaXmdOwpNFZK3vkWxc", "ChipManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'resources', 'instantiate', 'Vec3', 'tween', 'math']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ChipManager", ChipManager = (_dec = ccclass('ChipManager'), _dec2 = property(Node), _dec3 = property(_crd && AudioController === void 0 ? (_reportPossibleCrUseOfAudioController({
        error: Error()
      }), AudioController) : AudioController), _dec(_class = (_class2 = class ChipManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "selectedChip", _descriptor, this);

          this.radius = 100;
          this.animationDuration = 0.1;
          this.isChipsDisplayed = false;
          this.activeChips = [];

          _initializerDefineProperty(this, "audioController", _descriptor2, this);
        }

        //initiate touch event
        start() {
          this.selectedChip.on(Node.EventType.TOUCH_START, this.onSelectedChipClick, this);
        } // when the center chip is clicked, display other chips surrounding it


        onSelectedChipClick() {
          if (this.isChipsDisplayed) {
            this.closeSelection();
            this.audioController.playOnClose();
            return;
          }

          this.audioController.playOnClick();
          this.isChipsDisplayed = true;
          var selectedChipPosition = this.selectedChip.getPosition();
          var chipComponent = this.selectedChip.getComponentInChildren('ChipComponent');
          var surroundingChips = (_crd && ChipConfig === void 0 ? (_reportPossibleCrUseOfChipConfig({
            error: Error()
          }), ChipConfig) : ChipConfig).filter(chip => chip.value !== chipComponent.chipValue).sort((a, b) => a.value - b.value);
          surroundingChips.forEach((chip, index) => {
            this.loadAndAnimateChip(chip, index, surroundingChips.length, selectedChipPosition);
          });
        }

        replaceChildNode(chipNode) {
          this.selectedChip.children.forEach(child => {
            if (child !== chipNode) {
              child.destroy();
            }
          });
          this.selectedChip.addChild(chipNode);
          chipNode.setPosition(0, 0, 0);
          this.activeChips = this.activeChips.filter(chip => chip !== chipNode);
        }

        loadAndAnimateChip(chipConfig, index, totalChips, centerPosition) {
          resources.load(chipConfig.prefabPath, Prefab, (err, prefab) => {
            var chipNode = instantiate(prefab);
            chipNode.setPosition(centerPosition);
            this.node.addChild(chipNode);
            this.activeChips.push(chipNode);
            var startAngle = 0;
            var totalAngle = 180;
            var angle = math.toRadian(startAngle + totalAngle / (totalChips - 1) * (totalChips - 1 - index) // Flip the index to start from left to right
            );
            var targetPosition = new Vec3(centerPosition.x + Math.cos(angle) * this.radius, centerPosition.y + Math.sin(angle) * this.radius, centerPosition.z);
            tween(chipNode).delay(index * 0.05).to(this.animationDuration, {
              position: targetPosition
            }, {
              onComplete: target => {
                chipNode.on(Node.EventType.TOUCH_START, () => this.replaceChildNode(chipNode), this);
              }
            }).start();
          });
        }

        closeSelection() {
          var selectedChipPosition = this.selectedChip.getPosition();
          this.activeChips = this.activeChips.filter(chip => chip !== this.selectedChip);
          this.activeChips.forEach(chip => {
            tween(chip).to(this.animationDuration, {
              position: selectedChipPosition
            }, {
              easing: 'cubicIn'
            }).to(0, {
              scale: new Vec3(0, 0, 0)
            }, {
              easing: 'cubicOut',
              onComplete: () => {
                chip.destroy();
              }
            }).start();
          }); // Clear the list

          this.activeChips = [];
          this.isChipsDisplayed = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedChip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "audioController", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f6f4fd92542f8e3c06e0db1dde151384f39517c2.js.map