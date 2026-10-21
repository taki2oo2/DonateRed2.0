import { CampCardsGridSkeleton } from "@/components/cards/CampCardSkeleton";

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#0c0d12] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <CampCardsGridSkeleton />
      </div>
    </main>
  );
};

export default Loading;
