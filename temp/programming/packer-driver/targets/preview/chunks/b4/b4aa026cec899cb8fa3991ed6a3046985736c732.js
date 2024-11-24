System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, BetZoneComponent, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, BetAgain;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

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
      Node = _cc.Node;
    }, function (_unresolved_2) {
      BetZoneComponent = _unresolved_2.BetZoneComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "441daR7CaZPlp4bLQItGJ3l", "BetAgain", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BetAgain", BetAgain = (_dec = ccclass('BetAgain'), _dec2 = property(Node), _dec(_class = (_class2 = class BetAgain extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "tiles", _descriptor, this);
        }

        start() {}

        update(deltaTime) {}

        betAllAgain() {
          this.tiles.children.forEach(childNode => {
            var betZoneComponent = childNode.getComponentInChildren(_crd && BetZoneComponent === void 0 ? (_reportPossibleCrUseOfBetZoneComponent({
              error: Error()
            }), BetZoneComponent) : BetZoneComponent);

            if (betZoneComponent) {
              betZoneComponent.betAgain();
            }
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tiles", [_dec2], {
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
//# sourceMappingURL=b4aa026cec899cb8fa3991ed6a3046985736c732.js.map