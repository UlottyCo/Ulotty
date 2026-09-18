import { ModerationHeader } from "@/components/dashboards/moderation-header";
import { ModerationDetails } from "@/components/dashboards/moderation-details";
import { ModerationChecklist } from "@/components/dashboards/moderation-checklist";
import { ModerationTimeline } from "@/components/dashboards/moderation-timeline";

interface ModerationPageProps {
  params: Promise<{ id: string }>;
}

export default async function ModerationPage({ params }: ModerationPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ModerationHeader propertyId={id} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <ModerationDetails />
          <ModerationChecklist />
        </div>

        {/* Right Column - Timeline */}
        <div>
          <ModerationTimeline />
        </div>
      </div>
    </div>
  );
}
