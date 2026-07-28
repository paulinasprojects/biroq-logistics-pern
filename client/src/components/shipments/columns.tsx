import { Shipment } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { formatDate } from "@/utils/format-date";

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "id",
    header: "Id",
    size: 120,
    meta: { label: "ID" },
    cell: ({row}) => (
      <div className="line-clamp-1">
        {row.original.id}
      </div>
    )
  },
  {
  id: "warehouseName",
  header: "Warehouse Name",
  meta: { label: "Warehouse Name" },
  accessorFn: (row) => row.warehouse?.name ?? "—",
  cell: ({ getValue }) => (
    <span>{getValue<string>()}</span>
  )
},
  {
    id: "Dimensions",
    header: "Dimensions h/l/w",
    size: 60,
    accessorFn: (row) => <div>
      {`${row.packageHeight}cm x ${row.packageLength}cm x ${row.packageWidth}cm`}
    </div>,
     cell: ({ getValue }) => (
    <span>{getValue<string>()}</span>
  )
  },
  {
    accessorKey: "packageWeight",
    header: "Package Weight",
    meta: {label: "Package Weight"},
    size: 120,
    cell: ({row}) => (
      <div>
        {row.original.packageWeight}kg
      </div>
    )
  },
  {
    accessorKey: "senderName",
    header: "Sender Name",
    meta: { label: "Sender Name" },
  },
  {
    accessorKey: "receiverName",
    header: "Receiver Name",
    meta: { label: "Receiver Name" },
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
    meta: { label: "Delivery Address" },
  },
  {
    accessorKey: "pickupAddress",
    header: "Pickup Address",
    meta: { label: "Pickup Address" },
  },
    {
    accessorKey: "createdAt",
    size: 120,
    header: "Creation date",
    meta: { label: "Creation date" },
    cell: ({row}) => (
      <span className="text-sm">
        {formatDate(row.original.createdAt)}
      </span>
    )
  },
  {
      accessorKey: "action",
      header: "Action",
      id: "actions",
      meta: { label: "Actions" },
      cell: ({row}) => <CellAction data={row.original}/>
    }
]