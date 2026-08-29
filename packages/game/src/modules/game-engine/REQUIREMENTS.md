# Requirements

## Renderer

- It should be able to render sprites: images representing characters, objects,
  and user interfaces.
- It should be able to render tiles: grid-based maps.
- It should be able to render user interfaces.

## Input

- It should accept keyboard input.
- It should accept mouse input.
- It should accept touch input.
- It should accept game pad input.

## Audio

- It should be able to play looping music.
- It should be able to play a sound bite.

## Physics

- It should be able to detect collision.
  - It can use Axis-Aligned Bounding Boxes (AABB).
- It should be able to process acceleration, e.g. gravity.

## Scenes

- It should support sceness with modularized logic, e.g. battle, overworld.
- It should support registering its own systems, entities, and resources.
- It should be sandboxed.
  - It should unload previous entities when the scene switches.
  - It should unload previous systems when the scene switches.

## Game loop

- It should be able to produce ~60 frames per second.
- It should update logic and rendering.

## Entities

- TBD

## State

- It should support state machines, e.g. for menus, battle phases, and
  animations.

## Scene Manager

- It should control which scene is active.
- It should handle transitions.
- It should delegate updates, renders, and inputs.

## Entity Manager

- It should manage entities and their components.
- It should support ECS queries.
- It should support lifecycles (spawn and despawn).

## Open questions

I've heard "game loop" defined different ways in reference to a game engine. When you say a game engine handles a game loop, what does this mean? What would be an behaviorally-driven acceptance criteria for a game engine regarding state machines, e.g. in the format "Given... when... then..."?

You listed state machines as a core concept of a 2D game engine, but did not list state machines under "what a game engine handles." Do state machines fall under any of those initial categories? What would be an behaviorally-driven acceptance criteria for a game engine regarding state machines, e.g. in the format "Given... when... then..."?
