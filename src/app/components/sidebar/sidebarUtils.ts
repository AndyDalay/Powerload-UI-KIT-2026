import type { SidebarNavEntry } from "./sidebarTypes";

export function pathMatches(activePath: string, href: string): boolean {
  if (activePath === href) return true;
  return activePath.startsWith(`${href}/`);
}

export function findActiveInEntries(
  entries: SidebarNavEntry[],
  activePath: string,
): { groupId?: string; href?: string } {
  for (const entry of entries) {
    if (entry.type === "link" && pathMatches(activePath, entry.href)) {
      return { href: entry.href };
    }
    if (entry.type === "group") {
      for (const child of entry.children) {
        if (pathMatches(activePath, child.href)) {
          return { groupId: entry.id, href: child.href };
        }
      }
    }
  }
  return {};
}

export function buildInitialOpenGroups(
  entries: SidebarNavEntry[],
  activePath: string,
): Set<string> {
  const open = new Set<string>();
  const { groupId } = findActiveInEntries(entries, activePath);

  for (const entry of entries) {
    if (entry.type === "group") {
      if (entry.defaultOpen || entry.id === groupId) {
        open.add(entry.id);
      }
    }
  }
  return open;
}
