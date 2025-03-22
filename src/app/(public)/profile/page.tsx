import ProfileServer from "./components/user-server";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 cursor-default">Profile</h1>
      <ProfileServer />
    </div>
  );
}
