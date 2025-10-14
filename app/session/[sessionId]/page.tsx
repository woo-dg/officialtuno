import { SessionRoom } from "@/components/session/session-room"

export default function SessionPage({ params }: { params: { sessionId: string } }) {
  return <SessionRoom sessionId={params.sessionId} />
}
