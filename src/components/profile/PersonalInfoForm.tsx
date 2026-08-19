import { User as UserIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MyButton from "@/components/MyButton";

interface PersonalInfoFormProps {
  initialFullName: string;
  initialEmail: string;
}

export default function PersonalInfoForm({
  initialFullName,
  initialEmail,
}: PersonalInfoFormProps) {
  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Personal Information
        </h2>
        <UserIcon className="w-4 h-4 text-zinc-400" />
      </div>

      {/* Information Display */}
      <div className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="fullname"
            className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold"
          >
            Full Name
          </Label>
          <Input
            id="fullname"
            value={initialFullName || "Not provided"}
            readOnly
            disabled
            className="w-full bg-[#181a22]/80 border-zinc-800/70 text-zinc-200 text-sm h-10 rounded-lg disabled:opacity-90 disabled:cursor-default disabled:bg-[#181a22]/60 focus-visible:ring-0"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={initialEmail || "Not provided"}
            readOnly
            disabled
            className="w-full bg-[#181a22]/80 border-zinc-800/70 text-zinc-200 text-sm h-10 rounded-lg disabled:opacity-90 disabled:cursor-default disabled:bg-[#181a22]/60 focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        <MyButton
          disabled
          className="bg-[#FB2C36]/80 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md shadow-red-950/40 opacity-70 cursor-default"
        >
          Update Personal Info
        </MyButton>
      </div>
    </div>
  );
}
