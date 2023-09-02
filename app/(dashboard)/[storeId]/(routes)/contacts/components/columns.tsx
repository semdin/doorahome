"use client"

import { ColumnDef } from "@tanstack/react-table"


export type ContactColumn = {
  id: string
  email: string
  title: string
  message: string
  createdAt: string
}

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
