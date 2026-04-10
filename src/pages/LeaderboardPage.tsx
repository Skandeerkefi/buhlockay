import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import {
	useLeaderboardStore,
	LeaderboardPlayer,
} from "@/store/useLeaderboardStore";
import { Crown, Info, Loader2, Trophy, Award, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import GraphicalBackground from "@/components/GraphicalBackground";

function LeaderboardPage() {
	const { monthlyLeaderboard, fetchLeaderboard, isLoading, error, periodInfo } =
		useLeaderboardStore();

	useEffect(() => {
		fetchLeaderboard();
	}, [fetchLeaderboard]);

	const [timeLeft, setTimeLeft] = useState<string>("");

	useEffect(() => {
		if (!periodInfo) return;

		const interval = setInterval(() => {
			const endDate = new Date(periodInfo.endDate);
			const now = new Date();
			const diff = endDate.getTime() - now.getTime();

			if (diff <= 0) {
				setTimeLeft("Leaderboard period has ended. Resetting...");
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
		}, 1000);

		return () => clearInterval(interval);
	}, [periodInfo]);

	return (
		<div className='relative flex flex-col min-h-screen text-white '>
			{/* Background Canvas */}
			<GraphicalBackground />

			<Navbar />

			<main className='container relative z-10 flex-grow max-w-6xl px-6 py-12 mx-auto'>
				{/* Header */}
				<div className='flex flex-col items-center justify-between gap-4 mb-10 sm:flex-row'>
					<div className='flex items-center gap-3 text-[#004F8E]'>
						<Crown className='w-7 h-7' />
						<h1 className='text-3xl font-extrabold tracking-tight'>
							Rainbet Bi-Weekly Leaderboard
						</h1>
					</div>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									className='flex items-center gap-1 text-sm font-semibold text-[#004F8E] hover:text-[#004F8E] transition-colors'
									aria-label='How the leaderboard works'
								>
									<Info className='w-5 h-5' />
									How It Works
								</button>
							</TooltipTrigger>
							<TooltipContent className='max-w-xs bg-[#000000] text-white border border-[#004F8E] shadow-lg rounded-md p-3 text-sm'>
								The leaderboard ranks players based on their total wager amount
								using the MisterTee affiliate code on Rainbet. Higher wagers
								result in a better ranking.
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				{/* Affiliate Info */}
				<div className='p-6 mb-10 rounded-lg bg-gray-300/20 border border-[#004F8E] text-white shadow-md'>
					<p className='mb-4 leading-relaxed text-gray-100'>
						Use affiliate code{" "}
						<span className='font-semibold text-[#004F8E]'>MisterTee</span> on{" "}
						<a
							href='https://rainbet.com'
							target='_blank'
							rel='noreferrer'
							className='text-[#004F8E] hover:underline'
						>
							Rainbet
						</a>{" "}
						to appear on this leaderboard and compete for rewards!
					</p>

					<div className='inline-flex items-center gap-3 rounded-md bg-[#004F8E]/30 px-4 py-2 w-max select-text'>
						<span className='font-semibold text-[#004F8E]'>
							Affiliate Code:
						</span>
						<span className='font-bold text-white'>MisterTee</span>
					</div>
				</div>

				{/* Error Alert */}
				{error && (
					<Alert
						variant='destructive'
						className='mb-8 bg-[#004F8E]/40 border-[#004F8E] text-white shadow-md'
					>
						<AlertDescription>
							Failed to load leaderboard: {error}
						</AlertDescription>
					</Alert>
				)}

				{/* Reward Cards */}
				<section className='mb-12'>
					<h2 className='mb-8 text-3xl font-bold text-center text-[#004F8E] tracking-wide'>
						Top Players
					</h2>
					<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
						{monthlyLeaderboard.length > 0 ? (
							<>
								<RewardCard
									position='2nd Place'
									reward='$250 Cash + Special Role'
									backgroundColor='from-[#000000] to-[#004F8E]'
									player={monthlyLeaderboard[1]}
									icon={<Award className='text-yellow-400 w-9 h-9' />}
									lightBg
								/>
								<RewardCard
									position='1st Place'
									reward='$500 Cash + Special Role'
									backgroundColor='from-[#004F8E] to-[#000000]'
									player={monthlyLeaderboard[0]}
									icon={<Trophy className='w-10 h-10 text-yellow-300' />}
									lightBg
								/>
								<RewardCard
									position='3rd Place'
									reward='$100 Cash + Special Role'
									backgroundColor='from-[#000000] to-[#000000]'
									player={monthlyLeaderboard[2]}
									icon={<Medal className='w-8 h-8 text-yellow-500' />}
									lightBg
								/>
							</>
						) : (
							<>
								<RewardCard
									position='1st Place'
									reward='$500 Cash + Special Role'
									backgroundColor='from-[#004F8E] to-[#000000]'
									icon={<Trophy className='w-10 h-10 text-yellow-300' />}
									lightBg
								/>
								<RewardCard
									position='2nd Place'
									reward='$250 Cash + Special Role'
									backgroundColor='from-[#000000] to-[#004F8E]'
									icon={<Award className='text-yellow-400 w-9 h-9' />}
									lightBg
								/>
								<RewardCard
									position='3rd Place'
									reward='$100 Cash + Special Role'
									backgroundColor='from-[#000000] to-[#000000]'
									icon={<Medal className='w-8 h-8 text-yellow-500' />}
									lightBg
								/>
							</>
						)}
					</div>
				</section>

				{/* Leaderboard Table */}
				<section>
					<div className='flex flex-col items-center justify-center mb-6'>
						<h2 className='text-2xl font-semibold text-center text-[#004F8E] border-2 border-[#004F8E] rounded-md py-2 px-8 inline-block'>
						Bi-Weekly Leaderboard
					</h2>
					<p className='mt-2 text-sm text-gray-300 select-none'>
						Period: {periodInfo?.start_at} → {periodInfo?.end_at}
					</p>
					<p className='mt-1 text-sm text-gray-300 select-none'>{timeLeft}</p>
				</div>

				{isLoading ? (
					<div className='flex items-center justify-center h-52'>
						<Loader2 className='w-10 h-10 text-[#004F8E] animate-spin' />
					</div>
				) : (
					<LeaderboardTable period='monthly' data={monthlyLeaderboard} />
				)}
			</section>
			</main>

			<Footer />
		</div>
	);
}

interface RewardCardProps {
	position: string;
	reward: string;
	backgroundColor: string;
	player?: LeaderboardPlayer;
	icon?: React.ReactNode;
	lightBg?: boolean;
}

function RewardCard({
	position,
	reward,
	backgroundColor,
	player,
	icon,
	lightBg = false,
}: RewardCardProps) {
	return (
		<div
			className={`flex flex-col h-full overflow-hidden rounded-xl shadow-lg border border-[#004F8E] ${
				lightBg ? "bg-gray-300/20 text-[#C4C4C4]" : "text-white"
			}`}
			style={{
				background: lightBg
					? undefined
					: `linear-gradient(to right, var(--tw-gradient-stops))`,
			}}
		>
			<div className={`h-2 bg-gradient-to-r ${backgroundColor}`} />
			<div className='flex flex-col items-center flex-grow p-6 text-center'>
				<div className='mb-5'>{icon}</div>
				<h3 className='mb-3 text-xl font-bold tracking-wide'>{position}</h3>

				{player ? (
					<>
						<p className='text-lg font-semibold'>{player.username}</p>
						<p className='text-lg font-medium'>
							$ {player.wager.toLocaleString()}
						</p>
						<a
							href='https://discord.gg/YmvDexVt'
							target='_blank'
							rel='noreferrer'
							className='w-full mt-6'
						>
							<Button
								className={`w-full ${
									lightBg
										? "bg-[#004F8E] hover:bg-[#000000] text-black font-semibold"
										: "bg-[#004F8E] hover:bg-[#000000] text-black font-semibold"
								}`}
							>
								Claim Prize
							</Button>
						</a>
					</>
				) : (
					<p className={`text-lg font-medium ${lightBg ? "" : "text-white"}`}>
						{reward}
					</p>
				)}
			</div>
		</div>
	);
}

export default LeaderboardPage;
