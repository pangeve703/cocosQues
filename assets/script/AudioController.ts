import { _decorator, Component, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
  @property(AudioSource)
  public audioSource: AudioSource = null!;
  @property({ type: [AudioClip] }) // Define an array of AudioClips
  audioClips: AudioClip[] = [];

  playOnClick() {
    this.audioSource.playOneShot(this.audioClips[0], 1);
  }
  playOnClose() {
    this.audioSource.playOneShot(this.audioClips[1], 1);
  }
}
