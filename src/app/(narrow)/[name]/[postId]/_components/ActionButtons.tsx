import { Heart, Share2 } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex flex-col h-44 w-20 rounded-4xl justify-between items-center py-2 text-primary bg-gray-400 border border-gray-400">
      <div className="w-14 h-14  rounded-full flex justify-center items-center border border-primary cursor-pointer group hover:border-gray-600">
        <Heart className="w-8 h-8 group-hover:fill-red-500" />
      </div>
      <p className="text-lg font-semibold">1</p>
      <div className="w-14 h-14  rounded-full flex justify-center items-center border border-primary group hover:border-gray-600 cursor-pointer">
        <Share2 className="w-8 h-8  group-hover:fill-black" />
      </div>
    </div>
  );
}
