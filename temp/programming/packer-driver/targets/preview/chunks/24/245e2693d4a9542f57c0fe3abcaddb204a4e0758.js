System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Node, Sprite, AnimationScript, BetZoneComponent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, CountdownTimer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfAnimationScript(extras) {
    _reporterNs.report("AnimationScript", "./AnimationScript", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBetZoneComponent(extras) {
    _reporterNs.report("BetZoneComponent", "./BetZoneComponent", _context.meta, extras);
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
      Label = _cc.Label;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      AnimationScript = _unresolved_2.AnimationScript;
    }, function (_unresolved_3) {
      BetZoneComponent = _unresolved_3.BetZoneComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3def3tDkTtDRrJYdE8RPpl8", "CountdownTimer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node', 'Sprite', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CountdownTimer", CountdownTimer = (_dec = ccclass('CountdownTimer'), _dec2 = property(Sprite), _dec3 = property(Label), _dec4 = property(_crd && AnimationScript === void 0 ? (_reportPossibleCrUseOfAnimationScript({
        error: Error()
      }), AnimationScript) : AnimationScript), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = (_class2 = class CountdownTimer extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "timerSprite", _descriptor, this);

          _initializerDefineProperty(this, "timerLabel", _descriptor2, this);

          _initializerDefineProperty(this, "duration", _descriptor3, this);

          _initializerDefineProperty(this, "animationScript", _descriptor4, this);

          _initializerDefineProperty(this, "timer", _descriptor5, this);

          _initializerDefineProperty(this, "tiles", _descriptor6, this);

          this.elapsedTime = 0;
          this.isPulsing = false;
        }

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

        updateTimer(deltaTime) {
          this.elapsedTime += deltaTime;
          var remainingTime = Math.max(this.duration - this.elapsedTime, 0);
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

        updateLabel(time) {
          this.timerLabel.string = "" + time;
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
          this.tiles.children.forEach(childNode => {
            var betZoneComponent = childNode.getComponentInChildren(_crd && BetZoneComponent === void 0 ? (_reportPossibleCrUseOfBetZoneComponent({
              error: Error()
            }), BetZoneComponent) : BetZoneComponent);

            if (betZoneComponent) {
              betZoneComponent.clearAllChips();
            }
          });
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timerSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "duration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "animationScript", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "timer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "tiles", [_dec6], {
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
//# sourceMappingURL=245e2693d4a9542f57c0fe3abcaddb204a4e0758.js.map