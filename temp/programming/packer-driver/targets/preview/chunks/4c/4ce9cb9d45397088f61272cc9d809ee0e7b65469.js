System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Tween, tween, UIOpacity, Vec3, _dec, _class, _crd, ccclass, property, AnimationScript;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Tween = _cc.Tween;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e458afOCpNJhp0iF2xSsd0T", "AnimationScript", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Tween', 'tween', 'UIOpacity', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AnimationScript", AnimationScript = (_dec = ccclass('AnimationScript'), _dec(_class = class AnimationScript extends Component {
        start() {}

        fadeIn(node, duration, onComplete) {
          var opacity = node.getComponent(UIOpacity);

          if (!opacity) {
            opacity = node.addComponent(UIOpacity); // Ensure UIOpacity is added
          }

          opacity.opacity = 0;
          tween(opacity).to(duration, {
            opacity: 255
          }, {
            easing: 'linear'
          }).call(() => {
            if (onComplete) onComplete();
          }).start();
        }

        fadeOut(node, duration, onComplete) {
          var opacity = node.getComponent(UIOpacity);

          if (!opacity) {
            opacity = node.addComponent(UIOpacity);
          }

          opacity.opacity = 255;
          tween(opacity).to(duration, {
            opacity: 0
          }, {
            easing: 'linear'
          }).call(() => {
            if (onComplete) onComplete();
          }).start();
        }

        pulseAnimation(node) {
          var originalScale = this.node.scale.clone(); // Save the original scale

          var scaleUp = new Vec3(1.3, 1.3, 1); // Scale up factor

          var scaleDown = originalScale; // Return to original scale
          // Create a looping pulse animation

          tween(node).to(0.3, {
            scale: scaleUp
          }, {
            easing: 'sineOut'
          }) // Scale up
          .to(0.3, {
            scale: scaleDown
          }, {
            easing: 'sineIn'
          }) // Scale down
          .union() // Combine the up and down tweens into one sequence
          .repeatForever() // Loop the sequence indefinitely
          .start();
        }

        stopPulseAnimation(node) {
          node.scale = new Vec3(1, 1, 1);
          Tween.stopAllByTarget(node);
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4ce9cb9d45397088f61272cc9d809ee0e7b65469.js.map