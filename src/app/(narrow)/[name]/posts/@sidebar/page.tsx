export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen mt-96 ">
      <h2 className="text-xl font-semibold py-2 border-b-2 border-gray-200">
        태그 목록
      </h2>
      <div className="flex flex-col gap-1">
        <p>프론트(1)</p>
        <p>백엔드(1)</p>
        <p>react(1)</p>
        <p>next(1)</p>
        <p>react native(1)</p>
        <p>github(1)</p>
      </div>
    </div>
  );
}
