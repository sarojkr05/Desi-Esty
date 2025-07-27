import { useSelector } from "react-redux";

export default function Topbar() {
  const currentUser = useSelector((state) => state.auth.userData);
  const { name } = currentUser || {};

  return (
    <div className="w-full h-14 bg-gray-200 px-4 flex items-center justify-between border-b">
      <h1 className="text-base sm:text-lg font-medium">
        Welcome, <span className="font-semibold text-amber-600">{name}</span>
      </h1>
    </div>
  );
}