export function nextPhoto(index: number, delta: number, count: number): number {
  if (count <= 0) return 0;
  return (((index + delta) % count) + count) % count;
}
export function swipeDirection(dx: number, dy: number): number {
  if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 1.4) return 0;
  return dx < 0 ? 1 : -1;
}
