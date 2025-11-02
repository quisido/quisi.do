/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

type ComponentTuple<S, P = unknown> = [
  (state: S) => P,
  QuisidoGameComponent<P>,
];

class QuisidoGameSystem<S> {
  #components: ComponentTuple<S>[] = [];
  #state: S;

  public constructor(initialState: S) {
    this.#state = initialState;
  }

  public addComponent<P>(
    selector: (state: S) => P,
    setter: (props: P) => S,
    Component: new (
      system: QuisidoGameSystem<S>,
      props: P,
    ) => QuisidoGameComponent<P>,
  ): void {
    const props: P = selector(this.#state);
    const component: QuisidoGameComponent<P> = new Component(this, props);
    this.#components.push([selector, component]);
  }

  public dispatch(action: string, payload: unknown): void {
    // TODO
  }

  public get state(): S {
    return this.#state;
  }
}

class QuisidoGameComponent<P> {
  #props: P;
  #world: QuisidoGameSystem;

  public constructor(world: QuisidoGameSystem, props: P) {
    this.#props = props;
    this.#world = world;
  }

  public get props(): P {
    return this.#props;
  }
}

interface ChaoProps {
  readonly name: string;
  readonly stats: {
    readonly intelligence: number;
    readonly luck: number;
    readonly speed: number;
    readonly stamina: number;
    readonly strength: number;
  };
}

class Chao extends QuisidoGameComponent<ChaoProps> {
  public constructor(props: ChaoProps) {
    super(props);
  }
}

class MyGame extends QuisidoGameSystem<{ characters: Chao[] }> {
  public constructor() {
    super({ characters: [] });

    this.addComponent(
      state => state.score,
      score => ({ score }),
      ScoreComponent,
    );
  }
}

const chao = new Chao({
  name: 'Buddy',
  stats: { intelligence: 5, luck: 7, speed: 6, stamina: 8, strength: 4 },
});

window.console.log(chao);
