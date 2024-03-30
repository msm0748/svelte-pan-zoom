import { get, writable } from 'svelte/store';

class State {
  public _scale = writable(1);

  get scale() {
    return get(this._scale);
  }

  setScale(n: number) {
    this._scale.set(n);
  }
}

export const state = new State();
