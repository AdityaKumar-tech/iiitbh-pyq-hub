// src/components/ResourceList.jsx
import ResourceRow from "./ResourceRow";
import { resourceTypes } from "../lib/resourceTypes";

export default function ResourceList({ items, type }) {
  const Icon = resourceTypes[type]?.icon;

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20 text-sm text-muted">
        Nothing uploaded here yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <ResourceRow key={item.id} resource={item} Icon={Icon || resourceTypes[item.type]?.icon} />
      ))}
    </div>
  );
}