"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCamp } from "@/actions/camp.action";

interface DeleteCampButtonProps {
    campId: string;
    campTitle: string;
}

const DeleteCampButton = ({ campId, campTitle }: DeleteCampButtonProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                const res = await deleteCamp({ campId });
                if (res.success) {
                    toast.success(`"${campTitle}" has been deleted.`);
                } else {
                    toast.error(res.error?.message || "Failed to delete camp.");
                }
            } catch {
                toast.error("Something went wrong. Please try again.");
            } finally {
                setShowConfirm(false);
            }
        });
    };

    if (showConfirm) {
        return (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/80 rounded-xl px-3 py-2 shadow-xl">
                <span className="text-[11px] text-zinc-300 font-medium mr-1">Delete?</span>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md bg-red-600/90 hover:bg-red-600 text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                    {isPending ? (
                        <Loader2 className="size-3 animate-spin" />
                    ) : (
                        "Yes"
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    disabled={isPending}
                    className="px-2 py-1 text-[11px] font-semibold rounded-md bg-zinc-700/80 hover:bg-zinc-600/80 text-zinc-300 transition-colors cursor-pointer disabled:opacity-50"
                >
                    No
                </button>
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/60 hover:bg-red-600/90 hover:border-red-500/60 text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer shadow-lg"
            title="Delete camp"
        >
            <Trash2 className="size-4" />
        </button>
    );
};

export default DeleteCampButton;
