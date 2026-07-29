// src/lib/resourceTypes.js
import { FileText, ClipboardList, FlaskConical, BookOpen, ClipboardCheck } from "lucide-react";

export const resourceTypes = {
  notes:       { label: "Notes",        icon: FileText },
  pyqs:        { label: "PYQs",         icon: ClipboardList },
  assignments: { label: "Assignments",  icon: ClipboardCheck },
  labs:        { label: "Lab Manual",   icon: FlaskConical },
  books:       { label: "Books",        icon: BookOpen },
};