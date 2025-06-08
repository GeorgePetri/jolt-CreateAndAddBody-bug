import Jolt from "jolt-physics";

export const jolt = await Jolt();

const settings = new jolt.JoltSettings();
setupCollisionFiltering(settings);
const joltInterface = new jolt.JoltInterface(settings);
jolt.destroy(settings);

export default joltInterface;

const LAYER_MOVING = 1;
const NUM_OBJECT_LAYERS = 1;

const createAndAddBody = () => {
  const shape = new jolt.SphereShape(1);

  const creationSettings = new jolt.BodyCreationSettings(
    shape,
    new jolt.RVec3(0, 0, 0),
    new jolt.Quat(0, 0, 0, 1),
    jolt.EMotionType_Dynamic,
    LAYER_MOVING
  );

  const id = joltInterface
    .GetPhysicsSystem()
    .GetBodyInterface()
    .CreateAndAddBody(creationSettings, Jolt.EActivation_Activate);

  return id;
};

createAndAddBody();

function setupCollisionFiltering(settings: Jolt.JoltSettings) {
  const objectFilter = new jolt.ObjectLayerPairFilterTable(NUM_OBJECT_LAYERS);
  objectFilter.EnableCollision(LAYER_MOVING, LAYER_MOVING);

  const BP_LAYER_MOVING = new jolt.BroadPhaseLayer(0);
  const NUM_BROAD_PHASE_LAYERS = 1;
  const bpInterface = new jolt.BroadPhaseLayerInterfaceTable(
    NUM_OBJECT_LAYERS,
    NUM_BROAD_PHASE_LAYERS
  );
  bpInterface.MapObjectToBroadPhaseLayer(LAYER_MOVING, BP_LAYER_MOVING);

  settings.mObjectLayerPairFilter = objectFilter;
  settings.mBroadPhaseLayerInterface = bpInterface;
  settings.mObjectVsBroadPhaseLayerFilter =
    new jolt.ObjectVsBroadPhaseLayerFilterTable(
      settings.mBroadPhaseLayerInterface,
      NUM_BROAD_PHASE_LAYERS,
      settings.mObjectLayerPairFilter,
      NUM_OBJECT_LAYERS
    );
}
