# AetherMesh

AetherMesh is an upgraded execution layer around the Agency Agents specialist library. It preserves the upstream agent corpus while adding deterministic routing, policy controls, workflow planning, evaluation, and a provider-neutral runtime.

Architecture: agent corpus -> discovery -> router -> policy gate -> workflow planner -> provider adapter -> evaluator.

AetherMesh-specific code lives under runtime/ and is excluded from upstream synchronization.