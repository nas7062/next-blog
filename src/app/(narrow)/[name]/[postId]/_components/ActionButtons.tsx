import { Heart, Share2 } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex flex-col h-44 w-20 rounded-4xl justify-between items-center py-2 bg-gray-100">
      <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center border border-gray-200">
        <Heart className="w-8 h-8" />
      </div>
      <p className="text-lg font-semibold">1</p>
      <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center border border-gray-200">
        <Share2 className="w-8 h-8" />
      </div>
    </div>
  );
}
