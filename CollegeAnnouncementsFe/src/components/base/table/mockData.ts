import { HeadCell } from ".";

type UserData = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};
export const mockData: UserData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Administrator",
    createdAt: new Date("2023-07-14 GMT+0200").toISOString(),
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    createdAt: new Date("2023-07-12").toISOString(),
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    role: "User",
    createdAt: new Date("2023-07-10").toISOString(),
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    role: "Moderator",
    createdAt: new Date("2023-07-18").toISOString(),
  },
  {
    id: 5,
    name: "Eve Davis",
    email: "eve@example.com",
    role: "User",
    createdAt: new Date("2023-05-16").toISOString(),
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@example.com",
    role: "Administrator",
    createdAt: new Date("2023-03-14").toISOString(),
  },
  {
    id: 7,
    name: "Grace Wilson",
    email: "grace@example.com",
    role: "User",
    // add gmt+2 timezone offset
    createdAt: new Date("2023-01-27").toISOString(),
  },
  {
    id: 8,
    name: "Henry Taylor",
    email: "henry@example.com",
    role: "Moderator",
    createdAt: new Date("2023-09-12").toISOString(),
  },
  // ... add more entries as needed
];

// Define column structure for your table
export const mockDataColumns: HeadCell<UserData>[] = [
  {
    id: "id",
    label: "ID",
    sortable: true,
    dataType: "number",
    filterType: "text",
    filterValue: "",
  },
  { id: "name", label: "Name", sortable: true, dataType: "string" },
  { id: "email", label: "Email", sortable: true, dataType: "string" },
  { id: "role", label: "Role", dataType: "string" },
  {
    id: "createdAt",
    label: "Created At",
    sortable: true,
    dataType: "date",
    filterType: "date",
  },
];

export const searchOptions = [
  { value: "id", label: "ID" },
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
];
