"use client";

interface ProfileFormProps {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
}

export default function ProfileForm({
  firstName,
  lastName,
  nickname,
  email,
}: ProfileFormProps) {
  return (
    <form className="flex flex-col gap-2 mt-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p>First Name</p>
          <input
            type="text"
            name="First Name"
            defaultValue={firstName}
            className="border-2 border-gray-300 rounded-md p-2 min-w-96"
          />
        </div>

        <div>
          <p>Last Name</p>
          <input
            type="text"
            name="Last Name"
            defaultValue={lastName}
            className="border-2 border-gray-300 rounded-md p-2 min-w-96"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p>Nickname</p>
        <input
          type="text"
          name="nickname"
          defaultValue={nickname}
          className="border-2 border-gray-300 rounded-md p-2 min-w-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p>Email</p>
        <input
          type="text"
          name="email"
          defaultValue={email}
          className="border-2 border-gray-300 rounded-md p-2 min-w-50"
        />
      </div>

      <button className="bg-blue-500 text-white p-2 rounded-md">Update</button>
    </form>
  );
}
