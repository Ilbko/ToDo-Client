import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import type { Status } from "../../../types/task";

import "./status-column.scss";

export const StatusColumn = ({
  status,
  children,
}: {
  status: Status;
  children: React.ReactNode;
}) => {
  const { setNodeRef } = useDroppable({ id: status.toString() });

  return (
    <Box ref={setNodeRef} className="status-column">
      {children}
    </Box>
  );
};
