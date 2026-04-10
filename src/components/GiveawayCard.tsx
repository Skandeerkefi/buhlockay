import { Button } from "@/components/ui/button";
import { Clock, Users, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export type GiveawayStatus = "active" | "completed" | "upcoming";

interface GiveawayCardProps {
	id: string;
	title: string;
	prize: string;
	endTime: string;
	participants: number;
	maxParticipants?: number;
	status: GiveawayStatus;
	isEntered?: boolean;
	onEnter?: (id: string) => void;
}

export function GiveawayCard({
	id,
	title,
	prize,
	endTime,
	participants,
	maxParticipants = 100,
	status,
	isEntered = false,
	onEnter,
}: GiveawayCardProps) {
	const participationPercentage = Math.min(
		100,
		Math.floor((participants / maxParticipants) * 100)
	);

	return (
		<div className='overflow-hidden rounded-lg border border-[#004F8E] bg-[#000000]'>
			{/* Accent top bar */}
			<div className='h-3 bg-gradient-to-r from-[#004F8E] via-[#004F8E] to-[#000000]' />

			<div className='p-5 text-[#C4C4C4]'>
				<div className='flex items-start justify-between'>
					<h3 className='text-lg font-bold text-[#004F8E]'>{title}</h3>
					<StatusPill status={status} />
				</div>

				<div className='flex items-center gap-2 mt-4'>
					<Gift className='w-5 h-5 text-[#004F8E]' />
					<span className='text-lg font-semibold'>{prize}</span>
				</div>

				<div className='mt-4 space-y-3'>
					<div className='flex justify-between text-sm text-[#C4C4C4]'>
						<div className='flex items-center gap-1.5'>
							<Users className='w-4 h-4' />
							<span>{participants} participants</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<Clock className='w-4 h-4' />
							<span>{endTime}</span>
						</div>
					</div>

					<Progress
						value={participationPercentage}
						className='h-2 bg-[#C4C4C4]'
						color='#004F8E'
					/>

					<div className='text-xs text-right text-[#C4C4C4]'>
						{participants} / {maxParticipants} entries
					</div>
				</div>

				<div className='mt-4'>
					{status === "active" && !isEntered && (
						<Button
							className='w-full bg-[#004F8E] hover:bg-[#004F8E] text-[#C4C4C4]'
							onClick={() => onEnter && onEnter(id)}
						>
							Enter Giveaway
						</Button>
					)}

					{status === "active" && isEntered && (
						<Button
							variant='outline'
							className='w-full text-[#004F8E] border-[#004F8E]'
							disabled
						>
							Entered
						</Button>
					)}

					{status === "completed" && (
						<Button
							variant='outline'
							className='w-full text-[#C4C4C4] border-[#C4C4C4]'
							disabled
						>
							Giveaway Ended
						</Button>
					)}

					{status === "upcoming" && (
						<Button
							variant='outline'
							className='w-full text-[#C4C4C4] border-[#C4C4C4]'
							disabled
						>
							Coming Soon
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

function StatusPill({ status }: { status: GiveawayStatus }) {
	if (status === "active") {
		return (
			<div className='px-2 py-0.5 rounded-full bg-[#004F8E]/20 text-[#004F8E] text-xs'>
				Active
			</div>
		);
	} else if (status === "completed") {
		return (
			<div className='px-2 py-0.5 rounded-full bg-[#C4C4C4]/20 text-[#C4C4C4] text-xs'>
				Completed
			</div>
		);
	} else {
		return (
			<div className='px-2 py-0.5 rounded-full bg-[#C4C4C4]/20 text-[#C4C4C4] text-xs'>
				Upcoming
			</div>
		);
	}
}
