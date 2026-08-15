# Umbra consumer installation issues

Umbra's current distribution and local-development workflows have two verified problems that should be resolved before treating consumer setup as streamlined.

## Git dependency blocked by npm policy

Umbra's documented primary installation method is:

```bash
npm install git+https://github.com/JedWag/umbra-ui.git
```

The current machine reports:

```text
allow-git = "none"
```

As a result, npm rejects the documented dependency with `EALLOWGIT` before installing the consumer project. The consumer cannot rely on the Git declaration in this npm environment.

Publishing Umbra as a versioned npm or GitHub package would remove the Git-fetch requirement and let a consumer install Umbra through the normal registry workflow.

## Local source link can create duplicate React types

Umbra documents a sibling-checkout workflow for coordinated development:

```bash
npm install file:../umbra-ui
```

This exposes Umbra's raw TypeScript source and its local `node_modules` to the consumer compiler. If the consumer and Umbra checkouts install different `@types/react` patch versions, TypeScript can load both React type identities and reject otherwise valid Umbra components.

Observed example:

- consumer: `@types/react` 19.2.18
- Umbra checkout: `@types/react` 19.2.17
- result: incompatible `React.Ref` identities while compiling `src/components/ui/skeleton.tsx`

Vite's runtime aliases for `react`, `react-dom`, and `@base-ui/react` do not resolve this compiler-level type duplication.

Umbra needs a documented and verified local-consumer setup that guarantees one React runtime and one React type identity without requiring every new consumer to discover and pin Umbra's locally installed type versions.
