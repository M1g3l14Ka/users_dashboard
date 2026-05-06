
import Image from "next/image";
import { User } from "@/types/types";



export default function UserCard({ user }: { user: User }) {
  return (
    <div className="group relative rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] w-auto">
      
      <div className="flex h-full flex-col gap-4 rounded-2xl bg-[#0f172a] p-6 text-white transition-colors duration-300 group-hover:bg-[#131c31]">
        
        <div className="flex items-center gap-4">
          <Image
            src={user.image}
            alt={user.firstName}
            width={60}
            height={60}
            className="rounded-full bg-gray-800 p-1 ring-2 ring-gray-700/50"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-100">
              {user.firstName} {user.lastName}
            </h2>
            <h3 className="text-sm font-medium text-purple-400">
              {user.company.title}
            </h3>
          </div>
        </div>
        <div className="h-px w-full bg-gray-800/50"></div>
        <div className="flex flex-col gap-2 text-sm text-gray-400">
          <p>
            <span className="font-semibold text-gray-300">Company:</span>{" "}
            {user.company.name}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Email:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Phone:</span>{" "}
            {user.phone}
          </p>
        </div>


      </div>
    </div>
  );
}