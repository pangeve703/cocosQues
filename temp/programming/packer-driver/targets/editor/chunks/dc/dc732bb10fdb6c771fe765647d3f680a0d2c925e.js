System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, resources, instantiate, Vec3, tween, math, ChipConfig, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, ChipManager;

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
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      math = _cc.math;
    }, function (_unresolved_2) {
      ChipConfig = _unresolved_2.ChipConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "76ad0DaXmdOwpNFZK3vkWxc", "CoinSelection", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'resources', 'instantiate', 'Vec3', 'tween', 'math']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ChipManager", ChipManager = (_dec = ccclass('ChipManager'), _dec2 = property(Node), _dec(_class = (_class2 = class ChipManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "selectedChip", _descriptor, this);

          // The default coin node
          _initializerDefineProperty(this, "radius", _descriptor2, this);

          // Distance from the default coin
          _initializerDefineProperty(this, "animationDuration", _descriptor3, this);

          // Animation duration
          this.isChipsDisplayed = false;
          // To prevent multiple displays
          this.activeChips = [];
          // Track all instantiated chips
          this.isAnimating = false;
        }

        start() {
          // Add click listener for the default coin
          this.selectedChip.on(Node.EventType.TOUCH_START, this.onselectedChipClick, this);
        }

        onselectedChipClick() {
          if (this.isAnimating) {
            return; // If animation is in progress, ignore the click
          }

          if (this.isChipsDisplayed) {
            this.closeSelection();
            return;
          }

          this.isChipsDisplayed = true; // Get the position of the default chip

          const selectedChipPosition = this.selectedChip.getPosition(); // Exclude the selected chip and sort the remaining chips by value in ascending order

          const surroundingChips = (_crd && ChipConfig === void 0 ? (_reportPossibleCrUseOfChipConfig({
            error: Error()
          }), ChipConfig) : ChipConfig).filter(chip => chip.value !== this.selectedChip.getComponentInChildren('ChipComponent').chipValue).sort((a, b) => a.value + b.value); // Create and animate each chip except the selected one

          surroundingChips.forEach((chip, index) => {
            this.loadAndAnimateChip(chip, index, surroundingChips.length, selectedChipPosition);
          });
        }

        replaceChildNode(chipNode) {
          if (this.selectedChip.children.includes(chipNode)) {
            return;
          } // Destroy all children except the selected chipNode


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
          // Load the prefab dynamically
          resources.load(chipConfig.prefabPath, Prefab, (err, prefab) => {
            if (err) {
              console.error(`Failed to load prefab: ${chipConfig.prefabPath}`, err);
              return;
            } // Instantiate the prefab


            const chipNode = instantiate(prefab); // Set its initial position to the center (default coin position)

            chipNode.setPosition(centerPosition); // Parent the chip to the scene

            this.node.addChild(chipNode);
            this.activeChips.push(chipNode);
            const startAngle = 0;
            const totalAngle = 180;
            const angle = math.toRadian(startAngle + totalAngle / (totalChips - 1) * (totalChips - 1 - index) // Flip the index to start from left to right
            );
            const targetPosition = new Vec3(centerPosition.x + Math.cos(angle) * this.radius, centerPosition.y + Math.sin(angle) * this.radius, centerPosition.z);
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
          const selectedChipPosition = this.selectedChip.getPosition();
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
              onComplete: target => {
                chip.destroy();
              }
            }).start();
          }); // Clear the list after all animations

          this.activeChips = [];
          this.isChipsDisplayed = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedChip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "radius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 100;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animationDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dc732bb10fdb6c771fe765647d3f680a0d2c925e.js.map