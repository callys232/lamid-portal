"use client";
interface MemberItemProps {
  name: string;
  role: string;
}
export function MemberItem({ name, role }: MemberItemProps) {
  return (
    <li className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md hover:ring-2 hover:ring-red-500 transition">
      <span>{name}</span>
      <span className="text-sm text-gray-400">{role}</span>
    </li>
  );
}
