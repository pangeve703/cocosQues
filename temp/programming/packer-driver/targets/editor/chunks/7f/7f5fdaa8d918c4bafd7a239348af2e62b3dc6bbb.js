System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, tween, UIOpacity, _dec, _class, _crd, ccclass, property, Animation;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e458afOCpNJhp0iF2xSsd0T", "Animation", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'tween', 'UIOpacity']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Animation", Animation = (_dec = ccclass('Animation'), _dec(_class = class Animation extends Component {
        start() {}

        fadeIn(node, duration, onComplete) {
          let opacity = node.getComponent(UIOpacity);

          if (!opacity) {
            opacity = node.addComponent(UIOpacity); // Ensure UIOpacity is added
          }

          opacity.opacity = 0; // Start fully transparent
          // Fade to fully visible

          tween(opacity).to(duration, {
            opacity: 255
          }, {
            easing: 'linear'
          }).call(() => {
            if (onComplete) onComplete();
          }).start();
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7f5fdaa8d918c4bafd7a239348af2e62b3dc6bbb.js.map