import { _decorator, Component, Node, Tween, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationScript')
export class AnimationScript extends Component {
  start() {}

  fadeIn(node: Node, duration: number, onComplete?: () => void) {
    let opacity = node.getComponent(UIOpacity);
    if (!opacity) {
      opacity = node.addComponent(UIOpacity); // Ensure UIOpacity is added
    }

    opacity.opacity = 0;

    tween(opacity)
      .to(duration, { opacity: 255 }, { easing: 'linear' })
      .call(() => {
        if (onComplete) onComplete();
      })
      .start();
  }
  fadeOut(node: Node, duration: number, onComplete?: () => void) {
    let opacity = node.getComponent(UIOpacity);
    if (!opacity) {
      opacity = node.addComponent(UIOpacity);
    }

    opacity.opacity = 255;

    tween(opacity)
      .to(duration, { opacity: 0 }, { easing: 'linear' })
      .call(() => {
        if (onComplete) onComplete();
      })
      .start();
  }

  pulseAnimation(node: Node) {
    const originalScale = this.node.scale.clone(); // Save the original scale
    const scaleUp = new Vec3(1.3, 1.3, 1); // Scale up factor
    const scaleDown = originalScale; // Return to original scale

    // Create a looping pulse animation
    tween(node)
      .to(0.3, { scale: scaleUp }, { easing: 'sineOut' }) // Scale up
      .to(0.3, { scale: scaleDown }, { easing: 'sineIn' }) // Scale down
      .union() // Combine the up and down tweens into one sequence
      .repeatForever() // Loop the sequence indefinitely
      .start();
  }

  stopPulseAnimation(node: Node) {
    node.scale = new Vec3(1, 1, 1);
    Tween.stopAllByTarget(node);
  }

  update(deltaTime: number) {}
}
