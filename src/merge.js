import * as THREE from 'three';
import { mergeGeometries } from '../vendor/BufferGeometryUtils.js';

// ─────────────────────────────────────────────────────────────────────────────
// Merge static meshes that share a material into one draw call. This is the
// single biggest win for software renderers: hundreds of crates, rails and
// props collapse into a couple of dozen batches without changing the look.
// ─────────────────────────────────────────────────────────────────────────────
export function mergeByMaterial(parent, { includeTransparent = false } = {}) {
  parent.updateMatrixWorld(true);
  const parentInverse = new THREE.Matrix4().copy(parent.matrixWorld).invert();
  const groups = new Map();
  const remove = [];

  parent.traverse((obj) => {
    if (!obj.isMesh || obj.isInstancedMesh || obj.isSkinnedMesh) return;
    if (!obj.geometry || Array.isArray(obj.material)) return;
    if (obj.userData.noMerge) return;
    if (!includeTransparent && (obj.material.transparent || obj.material.opacity < 1)) return;

    let list = groups.get(obj.material);
    if (!list) { list = []; groups.set(obj.material, list); }
    list.push(obj);
  });

  const created = [];
  for (const [material, meshes] of groups) {
    if (meshes.length < 2) continue;
    const geometries = [];
    let castShadow = false;
    let receiveShadow = false;
    for (const mesh of meshes) {
      const geo = mesh.geometry.clone();
      const rel = new THREE.Matrix4().copy(parentInverse).multiply(mesh.matrixWorld);
      geo.applyMatrix4(rel);
      // BoxGeometry and friends may have differing index types; merging
      // non-indexed copies is the safest common denominator.
      const normalized = geo.index ? geo.toNonIndexed() : geo;
      if (normalized !== geo) geo.dispose();
      geometries.push(normalized);
      castShadow ||= mesh.castShadow;
      receiveShadow ||= mesh.receiveShadow;
      remove.push(mesh);
    }

    const merged = mergeGeometries(geometries, false);
    for (const g of geometries) g.dispose();
    if (!merged) continue;
    merged.computeBoundingSphere();
    const mesh = new THREE.Mesh(merged, material);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    parent.add(mesh);
    created.push(mesh);
  }

  for (const mesh of remove) {
    mesh.parent?.remove(mesh);
    mesh.geometry?.dispose();
  }
  return created;
}

// Collects the opaque, shootable results after a merge pass.
export function collectOpaqueMeshes(root) {
  const list = [];
  root.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh) return;
    if (Array.isArray(o.material) || o.material.transparent || o.material.opacity < 1) return;
    if (o.userData.noShoot) return;
    list.push(o);
  });
  return list;
}
