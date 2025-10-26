/* eslint-disable max-classes-per-file */

class QuisidoGameSystem {
  public addComponent<P>(component: QuisidoGameComponent<P>): void {}
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

const chao = new Chao({
  name: 'Buddy',
  stats: { intelligence: 5, luck: 7, speed: 6, stamina: 8, strength: 4 },
});

window.console.log(chao);

class QuisidoGameEntity {}

class QuisidoGameSystem {}
