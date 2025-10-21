import { useMemo } from "react";
import { Group } from "../types";

export default function useGroups(groups: Group[]) {
  return useMemo(
    () => groups.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [groups]
  );
}
