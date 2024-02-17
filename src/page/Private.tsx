import { useAuth } from "../hooks/useAuth.ts";

export default function Private() {
  const { logout } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl font-bold">Private</div>
      <button onClick={logout} className="ml-4">
        Logout
      </button>
    </div>
  );
}
