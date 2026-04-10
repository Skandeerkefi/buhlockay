import { useEffect, useState } from "react";
import GraphicalBackground from "@/components/GraphicalBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Trophy, Award, Medal } from "lucide-react";

interface StaticLeaderboardEntry {
	rank: number;
	username: string;
	wagered: number;
	prize: number;
}

const STATIC_BCGAME_LEADERBOARD: StaticLeaderboardEntry[] = [
	{ rank: 1, username: "buhlockay", wagered: 128540, prize: 550 },
	{ rank: 2, username: "spinmamba", wagered: 111220, prize: 300 },
	{ rank: 3, username: "luckrush", wagered: 98300, prize: 200 },
	{ rank: 4, username: "aceofslots", wagered: 87420, prize: 120 },
	{ rank: 5, username: "betstorm", wagered: 74210, prize: 100 },
	{ rank: 6, username: "crownchips", wagered: 65790, prize: 80 },
	{ rank: 7, username: "highrollerjay", wagered: 60110, prize: 60 },
	{ rank: 8, username: "neonwager", wagered: 54880, prize: 40 },
	{ rank: 9, username: "stackedluck", wagered: 49830, prize: 30 },
	{ rank: 10, username: "bluevault", wagered: 45290, prize: 20 },
];

const PRIZE_POOL = STATIC_BCGAME_LEADERBOARD.reduce((sum, player) => sum + player.prize, 0);
const PERIOD_START = "Apr 08, 2026";
const PERIOD_END = "Apr 22, 2026";
const PERIOD_END_ISO = "2026-04-22T23:59:59Z";

const RoobetPage = () => {
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const updateCountdown = () => {
			const now = new Date();
			const end = new Date(PERIOD_END_ISO);
			const diff = end.getTime() - now.getTime();

			if (diff <= 0) {
				setTimeLeft("Leaderboard period has ended. Resetting...");
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='relative flex flex-col min-h-screen'>
			<GraphicalBackground />
			<Navbar />

			<main className='relative z-10 flex-grow w-full max-w-6xl px-6 py-16 mx-auto'>
				<div className='mb-10 text-center'>
					<h1 className='mb-4 text-4xl md:text-6xl font-black text-[#C4C4C4] uppercase'>
						BC.Game Bi-Weekly Leaderboard
					</h1>
					<div className='w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[#004F8E] to-transparent mb-5' />
					<div className='inline-block px-8 py-4 rounded-2xl bg-[#000000]/40 border border-[#004F8E]/40 backdrop-blur-sm'>
						<p className='text-2xl font-bold text-[#C4C4C4]'>
							$ {PRIZE_POOL.toLocaleString()} Prize Pool
						</p>
					</div>
				</div>

				<div className='mb-10 p-8 rounded-3xl bg-gradient-to-r from-[#000000]/50 to-[#000000]/50 border border-[#004F8E]/30 backdrop-blur-md'>
					<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
						<div className='text-center md:text-left'>
							<p className='text-sm uppercase tracking-widest text-[#C4C4C4]/70 mb-2'>
								Event Duration
							</p>
							<p className='text-xl font-bold text-[#C4C4C4]'>
								{PERIOD_START} <span className='text-[#004F8E]'>→</span> {PERIOD_END}
							</p>
							<p className='text-xs text-[#C4C4C4]/50 mt-1'>Bi-Weekly Period</p>
						</div>
						<div className='text-center md:text-right'>
							<p className='text-sm uppercase tracking-widest text-[#C4C4C4]/70 mb-2'>
								Time Remaining
							</p>
							<p className='text-xl font-bold font-mono text-[#004F8E]'>{timeLeft}</p>
							<p className='text-xs text-[#C4C4C4]/50 mt-1'>Until Next Reset</p>
						</div>
					</div>
				</div>

				<div className='mb-16'>
					<h2 className='mb-8 text-2xl font-bold text-[#C4C4C4] uppercase tracking-wide'>
						🏆 Top Champions
					</h2>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
						{STATIC_BCGAME_LEADERBOARD.slice(0, 3).map((player, idx) => (
							<div
								key={player.rank}
								className={`relative p-8 rounded-3xl border-2 border-[#004F8E] shadow-2xl bg-gradient-to-br from-[#004F8E]/20 to-[#000000]/60 backdrop-blur-sm transition-all duration-300 ${
									idx === 0 ? "md:order-2" : idx === 1 ? "md:order-1" : "md:order-3"
								}`}
							>
								<div className='absolute -top-5 left-1/2 transform -translate-x-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#004F8E] to-[#000000] border-2 border-[#C4C4C4] font-black text-lg text-[#C4C4C4] shadow-lg'>
									#{player.rank}
								</div>

								<div className='pt-4 text-center'>
									<div className='mb-4 flex justify-center'>
										{player.rank === 1 && <Trophy className='w-10 h-10 text-yellow-300' />}
										{player.rank === 2 && <Award className='w-9 h-9 text-yellow-400' />}
										{player.rank === 3 && <Medal className='w-8 h-8 text-yellow-500' />}
									</div>
									<p className='text-3xl md:text-4xl font-black text-[#C4C4C4] mb-3'>
										{player.username}
									</p>
									<p className='text-2xl font-bold text-[#8EFFFF] mb-5'>
										$ {player.prize}
									</p>
									<div className='pt-4 border-t border-[#004F8E]/30'>
										<p className='text-sm uppercase tracking-wider text-[#C4C4C4]/70 mb-1'>Wagered</p>
										<p className='text-xl font-bold text-[#004F8E] font-mono'>
											$ {player.wagered.toLocaleString()}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='overflow-x-auto rounded-2xl border border-[#004F8E]/40 shadow-2xl'>
					<table className='w-full text-left border-collapse bg-[#000000]/70'>
						<thead className='text-sm font-bold tracking-wide text-[#000000] uppercase bg-gradient-to-r from-[#004F8E] to-[#004F8E]/80'>
							<tr>
								<th className='p-4'>Rank</th>
								<th className='p-4'>Username</th>
								<th className='p-4 text-right'>Wagered</th>
								<th className='p-4 text-right'>Prize</th>
							</tr>
						</thead>
						<tbody>
							{STATIC_BCGAME_LEADERBOARD.filter((player) => player.rank >= 5).map((player, index) => (
								<tr
									key={player.rank}
									className={`border-t border-[#004F8E]/20 transition-colors ${
										index % 2 === 0 ? "bg-[#000000]/40" : "bg-[#000000]/20"
									} hover:bg-[#004F8E]/15`}
								>
									<td className='p-4 font-bold text-[#C4C4C4]'>#{player.rank}</td>
									<td className='p-4 font-semibold text-[#C4C4C4]'>
										{player.username}
									</td>
									<td className='p-4 text-right text-[#C4C4C4] font-mono'>
										${player.wagered.toLocaleString()}
									</td>
									<td className='p-4 text-right font-bold text-[#8EFFFF]'>
										${player.prize}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default RoobetPage;
