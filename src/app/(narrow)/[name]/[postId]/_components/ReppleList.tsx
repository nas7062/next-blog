import { IRepple, IUser } from "@/src/app/_components/PostDetail";
import Repple from "./Repple";

export default function ReppleList({
  repples,
  user,
}: {
  repples: IRepple[] | null;
  user: IUser | null;
}) {
  if (!repples) return;
  return repples.map((repple) => (
    <Repple key={repple.id} repple={repple} user={user} />
  ));
}
