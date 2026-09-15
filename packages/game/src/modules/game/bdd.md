# Game Engine Behavior-Driven Test Suites

## `describe('using deterministic engine math', ...)`

- `it('should return the same result when called twice with the same input', ...)`
- `it('should return the same result whenever a deterministic math function receives the same input', ...)`
- `it('should return exact values when evaluating documented anchor inputs', ...)`
- `it('should approximate native sine within EPSILON across sampled periods', ...)`
- `it('should preserve the Pythagorean identity across sampled inputs', ...)`
- `it('should match frozen anchors for every exported deterministic math function', ...)`
- `it('should reject direct native transcendental math calls when linting engine systems', ...)`
- `it('should reject exponentiation operators when linting engine systems', ...)`
- `it('should reject ambient random and wall-clock APIs when linting engine code', ...)`
- `it('should allow finite basic arithmetic and square root in engine systems', ...)`

## `describe('creating a world', ...)`

- `it('should start at the supplied timestamp when I create a world', ...)`
- `it('should preserve the supplied seed when I create a world', ...)`
- `it('should start with an empty entity collection when I create a world', ...)`
- `it('should start nextEntityId and rngCursor at zero', ...)`
- `it('should deep-equal the original world after JSON stringify and parse', ...)`
- `it('should contain no functions, classes, maps, or sets when I inspect it', ...)`
- `it('should remain JSON-serializable after spawning, stepping, and reducing events', ...)`
- `it('should accept world numbers that are finite and not negative zero', ...)`
- `it('should reject NaN, infinity, and negative zero anywhere in world state', ...)`
- `it('should reject a fractional genesis timestamp when I create a world', ...)`
- `it('should preserve the genesis seed through every world transition', ...)`

## `describe('spawning entities', ...)`

- `it('should assign the next monotonic integer id when I spawn an entity', ...)`
- `it('should advance nextEntityId when I spawn an entity', ...)`
- `it('should preserve existing entities when I spawn another entity', ...)`
- `it('should leave the input world unchanged when I spawn an entity', ...)`
- `it('should isolate the spawned entity from later mutation of supplied component data', ...)`
- `it('should reproduce entity ids when I replay the same spawns', ...)`

## `describe('mutating entity components', ...)`

- `it('should update one component when I set its value', ...)`
- `it('should preserve other components when I set one component', ...)`
- `it('should remove one component when I request its removal', ...)`
- `it('should leave the input world unchanged when I update a component', ...)`
- `it('should return the original world when the entity id does not exist', ...)`
- `it('should isolate world state from later mutation of supplied component data', ...)`
- `it('should reject invalid numeric component data before storing it', ...)`

## `describe('building a derived component index', ...)`

- `it('should return exactly the entity ids satisfying the membership rule', ...)`
- `it('should list moving entity ids in ascending order when I query velocity', ...)`
- `it('should exclude entities with absent or zero velocity when I query velocity', ...)`
- `it('should drop an entity when I set its velocity to zero', ...)`
- `it('should rebuild identically after I serialize and reload the world', ...)`
- `it('should match a fresh rebuild after each spawn, update, and removal', ...)`
- `it('should remain absent from serialized world state when I save a snapshot', ...)`
- `it('should query component intersections in ascending entity-id order', ...)`
- `it('should hide entity storage layout behind the public query API', ...)`

## `describe('registering systems', ...)`

- `it('should run systems in registration order when I step the world', ...)`
- `it('should preserve execution order after I mutate the source systems array', ...)`
- `it('should produce the same result when I register the same ordered systems', ...)`
- `it('should keep registered system code outside serialized world state', ...)`

## `describe('stepping the simulation', ...)`

- `it('should advance the world by exactly one millisecond when I step it', ...)`
- `it('should return a new world without mutating the previous world', ...)`
- `it('should run every registered system once when I step it', ...)`
- `it('should derive collision outcomes from world state during each step', ...)`
- `it('should derive timer-fire outcomes from world state during each step', ...)`
- `it('should derive clamp outcomes from world state during each step', ...)`
- `it('should keep emergent transitions out of the GameEvent log', ...)`
- `it('should resolve simultaneous collisions by ascending entity id', ...)`
- `it('should expose the pre-increment tick to systems and increment once afterward', ...)`
- `it('should reject invalid numeric state returned by a system', ...)`
- `it('should reject a system that changes the simulation tick directly', ...)`
- `it('should update position from old velocity before applying acceleration', ...)`
- `it('should update velocity from acceleration once per millisecond', ...)`
- `it('should let entities spawned by one system enter later systems that tick', ...)`
- `it('should fire a timer once at its interval boundary and not on adjacent ticks', ...)`
- `it('should update a spawner lastSpawnTick when its interval elapses', ...)`
- `it('should consume and persist each random draw used by a spawning system', ...)`
- `it('should remove zero-velocity entities from later movement ticks without a callback', ...)`

## `describe('advancing the simulation to a target tick', ...)`

- `it('should run each registered system once per elapsed millisecond', ...)`
- `it('should stop at the requested tick when I advance the world', ...)`
- `it('should return the original world when the target tick is not later', ...)`
- `it('should equal advancing through an intermediate tick to the final tick', ...)`
- `it('should stop a moving object at the wall and zero its velocity without tunneling', ...)`
- `it('should use swept collision when one step can cross a collider', ...)`
- `it('should leave position unchanged when velocity is absent or zero', ...)`
- `it('should reject a fractional target tick before advancing the world', ...)`

## `describe('applying a timestamped event', ...)`

- `it('should integrate to the event timestamp before reducing the event', ...)`
- `it('should apply same-timestamp events without advancing between them', ...)`
- `it('should throw when an event timestamp precedes the world tick', ...)`
- `it('should return equal state for the same world, event, reducer, and registry', ...)`
- `it('should reject a fractional event timestamp before applying the event', ...)`
- `it('should reject invalid numeric state returned by a reducer', ...)`
- `it('should reject a reducer that changes the simulation tick directly', ...)`
- `it('should preserve the event source and serializable payload when reducing an event', ...)`

## `describe('ordering game events', ...)`

- `it('should sort by timestamp before sequence when I compare events', ...)`
- `it('should use sequence as the tiebreaker when timestamps match', ...)`
- `it('should use published timestamp and sequence order regardless of client receive order', ...)`
- `it('should identify duplicate events by authority-assigned sequence', ...)`
- `it('should preserve event source through transport, persistence, and replay', ...)`
- `it('should reject fractional timestamps and authority-assigned sequences', ...)`

## `describe('replaying an event log', ...)`

- `it('should return byte-identical state when I replay identical inputs twice', ...)`
- `it('should produce the same state regardless of input event arrival order', ...)`
- `it('should match canonical replay and change baseline after an effective past event', ...)`
- `it('should match uninterrupted replay when I reload a mid-replay snapshot', ...)`
- `it('should reproduce emergent collisions when I replay discrete inputs', ...)`
- `it('should leave the snapshot and event array unchanged when I replay them', ...)`
- `it('should keep equal-timestamp sequence order stable after cold load', ...)`
- `it('should return the snapshot unchanged when I replay an empty event log', ...)`
- `it('should stop at the final event timestamp without reading the wall clock', ...)`
- `it('should produce byte-identical client and server state from independent copies of the same inputs', ...)`
- `it('should remain unchanged when ambient wall-clock and random state differ between replays', ...)`

## `describe('drawing replayable random values', ...)`

- `it('should return the same value and cursor for the same seed and cursor', ...)`
- `it('should reproduce a sequence from only its seed and starting cursor', ...)`
- `it('should return values in [0, 1) for boundary and representative inputs', ...)`
- `it('should advance the cursor exactly once when I draw a value', ...)`
- `it('should wrap the cursor as uint32 when it reaches its limit', ...)`
- `it('should return the frozen value for a cursor queried before earlier cursors', ...)`
- `it('should match frozen PRNG vectors for documented seeds and cursors', ...)`
- `it('should resume the frozen PRNG sequence from a serialized cursor', ...)`

## `describe('projecting a world for rendering', ...)`

- `it('should project from authoritative state using the injected clock', ...)`
- `it('should draw the projected world when animation frames arrive', ...)`
- `it('should leave authoritative state unchanged after rendering a frame', ...)`
- `it('should provide a complete projected World on every animation frame', ...)`
- `it('should not invoke rendering from step, advanceTo, applyEvent, or replay', ...)`
- `it('should project each frame from confirmed state instead of prior projection', ...)`
- `it('should advance projected worlds only to integer target ticks', ...)`
- `it('should smooth rollback corrections without mutating authoritative state', ...)`
- `it('should let a renderer diff consecutive complete worlds without requiring a full-frame redraw', ...)`

## `describe('loading and saving a session record', ...)`

- `it('should persist one versioned snapshot and its timestamped event log', ...)`
- `it('should survive a JSON round trip when I serialize a complete session record', ...)`
- `it('should reject a SessionRecord whose version differs from the engine version', ...)`
- `it('should omit per-event resulting state when I save a session', ...)`
- `it('should save the canonical event log in timestamp-and-sequence order', ...)`
- `it('should replay only events whose timestamp is greater than snapshot.tick', ...)`
- `it('should restore identical state when I load and replay a saved session', ...)`
- `it('should not invent unsaved wall-clock progress after the final logged event', ...)`
- `it('should keep rejected acknowledgements out of the canonical event log', ...)`
- `it('should replay a frozen same-version session fixture to expected bytes', ...)`

## `describe('compacting a session record', ...)`

- `it('should advance the snapshot to the caller-supplied floor tick', ...)`
- `it('should fold events through the floor into the compacted snapshot', ...)`
- `it('should retain post-floor events needed to reconstruct current state', ...)`
- `it('should remain independent of netcode window constants when I compact', ...)`
- `it('should match uncompacted replay when both records replay through the same final event', ...)`
- `it('should fold floor events and replay only events strictly after the floor', ...)`
- `it('should integrate passive simulation to the floor when no event occurs there', ...)`
- `it('should preserve pre-floor catch-up history outside rollback state', ...)`
- `it('should exclude pre-floor catch-up history from rollback replay', ...)`
- `it('should produce identical output when compacted twice to the same floor', ...)`

## `describe('authorizing a client timestamp', ...)`

- `it('should preserve claimed time when absolute delta is at most TRUST_WINDOW', ...)`
- `it('should adjust time when delta exceeds TRUST_WINDOW but is at most ADJUST_WINDOW', ...)`
- `it('should derive adjusted time from authority-measured ping', ...)`
- `it('should ignore client-supplied ping when deriving an adjusted timestamp', ...)`
- `it('should reject claimed time when absolute delta exceeds ADJUST_WINDOW', ...)`
- `it('should reject adjustment when estimatedPing is at least ADJUST_WINDOW', ...)`
- `it('should prevent delayed heartbeat acknowledgements from moving accepted events to or before the snapshot floor', ...)`
- `it('should use one serverNow value for acceptance and compaction in a pass', ...)`
- `it('should require TRUST_WINDOW <= ADJUST_WINDOW <= CATCHUP_WINDOW <= BOOT_WINDOW', ...)`

## `describe('retaining authoritative history', ...)`

- `it('should set the snapshot tick to serverNow minus ADJUST_WINDOW', ...)`
- `it('should retain events at or after serverNow minus CATCHUP_WINDOW', ...)`
- `it('should discard events before serverNow minus CATCHUP_WINDOW', ...)`
- `it('should allow retained history to predate the snapshot floor', ...)`
- `it('should request a full resync when a client last synced before retained history', ...)`
- `it('should boot a client when its silence exceeds BOOT_WINDOW', ...)`
- `it('should bound rollback replay by ADJUST_WINDOW even when retained history is longer', ...)`

## `describe('receiving an authoritative event', ...)`

- `it('should append an event when its canonical order follows the current tail', ...)`
- `it('should insert a late event at its timestamp and sequence position', ...)`
- `it('should replay from the snapshot floor when a late event arrives', ...)`
- `it('should never rewind earlier than the snapshot floor', ...)`
- `it('should reconcile pending optimistic events after applying authority', ...)`
- `it('should use published timestamps and sequences without re-deriving them', ...)`
- `it('should replay when a newly received event sorts before the applied tail at the same timestamp', ...)`
- `it('should apply a duplicated authoritative sequence exactly once', ...)`
- `it('should request resync when one sequence identifies conflicting events', ...)`
- `it('should request resync when an authoritative event cannot be replayed from the snapshot floor', ...)`

## `describe('handling optimistic client events', ...)`

- `it('should apply an emitted event locally before authority acknowledgement', ...)`
- `it('should retain an emitted event as pending until authority responds', ...)`
- `it('should preserve visible state when authority confirms identical ordering', ...)`
- `it('should remove an acknowledged event from the pending buffer', ...)`
- `it('should replay when authority changes timestamp or interleaves an event', ...)`
- `it('should remove and replay without an event when authority rejects it', ...)`
- `it('should correlate acknowledgements by client sequence instead of payload', ...)`
- `it('should reconcile every remaining pending event after a canonical timestamp adjustment', ...)`
- `it('should rebase pending events after adopting a full-resync bundle', ...)`

## `describe('incrementally catching up a client', ...)`

- `it('should replay missed retained events from the client local state', ...)`
- `it('should confirm incremental catch-up with an authoritative state hash', ...)`
- `it('should request a full resync when the state hash differs', ...)`
- `it('should request a full resync when retained history cannot bridge the gap', ...)`
- `it('should request a full resync when a client joins without replayable local state', ...)`
- `it('should hash the same canonical state and watermark identically after cold load', ...)`
- `it('should select missed events by sequence watermark despite timestamp inversion', ...)`
- `it('should catch up from acknowledged state instead of projected render state', ...)`

## `describe('performing a full resync', ...)`

- `it('should subscribe to live events before requesting a snapshot bundle', ...)`
- `it('should buffer live events while the snapshot bundle downloads', ...)`
- `it('should adopt the downloaded snapshot before replaying its event log', ...)`
- `it('should apply buffered events after replaying through bundle send time', ...)`
- `it('should converge across representative download delays and event timings', ...)`
- `it('should deduplicate subscribed events already included in the bundle', ...)`
- `it('should merge a buffered event whose timestamp predates the bundle tail', ...)`
- `it('should reject a mismatched bundle before changing state or emitting effects', ...)`

## `describe('emitting side effects', ...)`

- `it('should emit an effect immediately during optimistic forward play', ...)`
- `it('should emit both non-equal descriptors produced on the same tick', ...)`
- `it('should deduplicate structurally equal descriptors on the same tick', ...)`
- `it('should deduplicate the same descriptor regardless of originating entity', ...)`
- `it('should treat every perceptible descriptor difference as a distinct effect', ...)`
- `it('should skip effect-history lookups while advancing beyond the highest previously simulated tick', ...)`
- `it('should suppress an already-played effect when replay revisits its tick', ...)`
- `it('should apply the same deduplication to system-emitted and observer-derived effects', ...)`
- `it('should keep effect history outside serialized game state', ...)`
- `it('should prune effect history at or before the new compaction floor', ...)`

## `describe('confirming an optimistic side effect', ...)`

- `it('should move the provisional effect-history key to the confirmed tick', ...)`
- `it('should not emit again when confirmation changes only the effect tick', ...)`
- `it('should emit a replayed effect when its canonical descriptor changes', ...)`
- `it('should migrate one effect key without dropping unrelated tick keys', ...)`

## `describe('using a transport adapter', ...)`

- `it('should assign unique increasing sequences across concurrent event sources', ...)`
- `it('should broadcast canonical fields for every accepted event', ...)`
- `it('should reject multiplayer initialization without one sequence authority', ...)`
- `it('should authorize loopback events immediately in single-player mode', ...)`
- `it('should avoid rollback and resync when loopback authority confirms the optimistic event unchanged', ...)`
- `it('should deliver service-worker authorizations asynchronously without changing canonical behavior', ...)`
- `it('should continue monotonic session sequences after an adapter restart', ...)`

## `describe('using engine ports', ...)`

- `it('should obtain wall time only from an injected clock adapter', ...)`
- `it('should perform persistence only through an injected store adapter', ...)`
- `it('should exchange authoritative events only through a transport adapter', ...)`
- `it('should draw worlds only through a renderer adapter', ...)`
- `it('should reject engine-core imports from DOM, network, storage, and I/O modules', ...)`
- `it('should keep networking constants and reconciliation code out of the engine core', ...)`
- `it('should expose snapshot adoption and buffered application through resync ports', ...)`
- `it('should run a complete single-player simulation without the networking layer', ...)`

## `describe('serializing input events', ...)`

- `it('should store keyboard input as plain key data instead of a DOM event', ...)`
- `it('should store pointer input as serializable coordinates and actions', ...)`
- `it('should represent touch, click, and drag interactions as serializable pointer actions', ...)`
- `it('should store gamepad input as serializable axes and button values', ...)`
- `it('should reject raw DOM events in serialized game input payloads', ...)`
- `it('should survive a JSON round trip when I serialize an input event', ...)`
