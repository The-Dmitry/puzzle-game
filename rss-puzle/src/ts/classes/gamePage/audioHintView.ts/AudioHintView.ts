import View from '../../common/view/VIew';

const URL_TO_AUDIO = 'https://github.com/rolling-scopes-school/rss-puzzle-data/raw/main/';

export default class AudioHintView extends View {
  private audioSrc: string | null = null;

  constructor() {
    super({
      tag: 'button',
      css: ['audio-hint'],
      text: 'play audio',
      callback: () => this.playAudio(),
    });
  }

  private playAudio() {
    if (!this.audioSrc) return;
    (this.viewCreator.node as HTMLButtonElement).disabled = true;
    const audio = new Audio();
    audio.src = `${URL_TO_AUDIO}${this.audioSrc}`;
    audio.play();
    audio.onended = () => {
      (this.viewCreator.node as HTMLButtonElement).disabled = false;
    };
  }

  public set setAudioSrc(src: string) {
    this.audioSrc = src;
  }
}
