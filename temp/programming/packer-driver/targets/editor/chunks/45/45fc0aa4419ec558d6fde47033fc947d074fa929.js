System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, tween, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, RadialTimer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Sprite = _cc.Sprite;
      tween = _cc.tween;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2ecf6A7Qo1HIaeNc9xiKfAT", "RadialTimer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Sprite', 'tween', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("RadialTimer", RadialTimer = (_dec = ccclass('RadialTimer'), _dec2 = property(Sprite), _dec(_class = (_class2 = class RadialTimer extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "timerSprite", _descriptor, this);

          // Drag the Sprite node to this property in the Inspector
          _initializerDefineProperty(this, "duration", _descriptor2, this);
        }

        // Duration of the timer in seconds
        start() {
          this.startTimer();
        }

        startTimer() {
          // Set the initial fillRange to 1 (full circle)
          this.timerSprite.fillRange = 1; // Animate fillRange from 1 (full) to 0 (empty)

          tween(this.timerSprite).to(this.duration, {
            fillRange: 0
          }, {
            easing: 'linear'
          }) // Linear by default
          .call(() => {
            console.log('Timer completed!');
            this.onTimerComplete();
          }).start();
        }

        onTimerComplete() {
          this.clearChipsInAllZones(); // Add logic when the timer completes
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timerSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "duration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=45fc0aa4419ec558d6fde47033fc947d074fa929.js.map