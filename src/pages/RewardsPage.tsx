import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import GraphicalBackground from "@/components/GraphicalBackground";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Trash2 } from "lucide-react";

const STORAGE_KEY = "buhlockay_rewards_entries_v1";

const GIVEAWAY_TYPES = [
	"gws",
	"wager",
	"wheel",
	"tourney+pred",
	"call",
	"gtb",
	"tourney+gws",
	"battle",
	"meme signup",
	"depo",
] as const;

type GiveawayType = (typeof GIVEAWAY_TYPES)[number];

interface RewardEntry {
	id: string;
	winner: string;
	amount: string;
	giveawayTypes: GiveawayType[];
	ltcAddress: string;
	paid: boolean;
	createdAt: string;
}

function RewardsPage() {
	const { user } = useAuthStore();
	const { toast } = useToast();
	const isAdmin = user?.role === "admin";

	const [entries, setEntries] = useState<RewardEntry[]>([]);
	const [winner, setWinner] = useState("");
	const [amount, setAmount] = useState("");
	const [ltcAddress, setLtcAddress] = useState("");
	const [selectedTypes, setSelectedTypes] = useState<GiveawayType[]>([]);
	const [paid, setPaid] = useState(false);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				setEntries(JSON.parse(saved));
			}
		} catch (error) {
			console.error("Failed to load rewards entries", error);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
	}, [entries]);

	const typeSummary = useMemo(() => {
		if (selectedTypes.length === 0) {
			return "No type selected";
		}
		return selectedTypes.join(", ");
	}, [selectedTypes]);

	const toggleType = (type: GiveawayType) => {
		setSelectedTypes((prev) =>
			prev.includes(type)
				? prev.filter((item) => item !== type)
				: [...prev, type]
		);
	};

	const handleAddEntry = () => {
		if (!isAdmin) {
			toast({
				title: "Admin only",
				description: "Only admins can add rewards entries.",
				variant: "destructive",
			});
			return;
		}

		if (!winner.trim() || !amount.trim() || !ltcAddress.trim()) {
			toast({
				title: "Missing details",
				description: "Winner, amount, and LTC address are required.",
				variant: "destructive",
			});
			return;
		}

		if (selectedTypes.length === 0) {
			toast({
				title: "Select giveaway type",
				description: "Pick at least one giveaway type.",
				variant: "destructive",
			});
			return;
		}

		const newEntry: RewardEntry = {
			id: crypto.randomUUID(),
			winner: winner.trim(),
			amount: amount.trim(),
			giveawayTypes: selectedTypes,
			ltcAddress: ltcAddress.trim(),
			paid,
			createdAt: new Date().toISOString(),
		};

		setEntries((prev) => [newEntry, ...prev]);
		setWinner("");
		setAmount("");
		setLtcAddress("");
		setSelectedTypes([]);
		setPaid(false);

		toast({
			title: "Entry added",
			description: "Rewards entry was saved successfully.",
		});
	};

	const togglePaid = (id: string) => {
		if (!isAdmin) {
			return;
		}
		setEntries((prev) =>
			prev.map((entry) =>
				entry.id === id ? { ...entry, paid: !entry.paid } : entry
			)
		);
	};

	const deleteEntry = (id: string) => {
		if (!isAdmin) {
			return;
		}
		setEntries((prev) => prev.filter((entry) => entry.id !== id));
	};

	return (
		<div className='relative flex flex-col min-h-screen text-white'>
			<GraphicalBackground />
			<Navbar />

			<main className='container relative z-10 flex-grow max-w-7xl px-4 py-8 mx-auto'>
				<div className='flex items-center gap-3 mb-6'>
					<Trophy className='w-7 h-7 text-[#8EFFFF]' />
					<h1 className='text-3xl font-bold'>Rewards Section</h1>
				</div>

				<div className='p-6 mb-8 rounded-xl border border-[#004F8E] bg-[#000000]/70 backdrop-blur-sm'>
					<p className='text-[#C4C4C4]'>
						Track winners and payouts. Giveaway type supports multi-select in one entry.
					</p>
				</div>

				<div className='grid gap-8 lg:grid-cols-5'>
					<div className='lg:col-span-2 p-5 rounded-xl border border-[#004F8E] bg-[#000000]/70 backdrop-blur-sm'>
						<h2 className='text-xl font-semibold text-[#8EFFFF]'>Admin Entry</h2>
						<p className='text-sm text-[#C4C4C4] mt-1 mb-4'>
							Only admin can create and edit reward rows.
						</p>

						{!isAdmin && (
							<p className='mb-4 text-sm text-red-300'>
								You are viewing only. Log in as admin to add entries.
							</p>
						)}

						<div className='space-y-3'>
							<Input
								placeholder='Winner'
								value={winner}
								onChange={(e) => setWinner(e.target.value)}
								className='bg-[#C4C4C4] text-black border border-[#004F8E] placeholder:text-[#334155]'
								disabled={!isAdmin}
							/>
							<Input
								placeholder='Amount'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className='bg-[#C4C4C4] text-black border border-[#004F8E] placeholder:text-[#334155]'
								disabled={!isAdmin}
							/>
							<Input
								placeholder='LTC address'
								value={ltcAddress}
								onChange={(e) => setLtcAddress(e.target.value)}
								className='bg-[#C4C4C4] text-black border border-[#004F8E] placeholder:text-[#334155]'
								disabled={!isAdmin}
							/>
						</div>

						<div className='mt-5'>
							<p className='text-sm font-medium text-[#8EFFFF] mb-2'>Giveaway Type</p>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
								{GIVEAWAY_TYPES.map((type) => (
									<label
										key={type}
										className='flex items-center gap-2 text-sm text-[#C4C4C4] cursor-pointer'
									>
										<Checkbox
											checked={selectedTypes.includes(type)}
											onCheckedChange={() => toggleType(type)}
											disabled={!isAdmin}
										/>
										<span className='capitalize'>{type}</span>
									</label>
								))}
							</div>
							<p className='mt-2 text-xs text-[#C4C4C4]'>Selected: {typeSummary}</p>
						</div>

						<div className='mt-5 flex items-center gap-2'>
							<Checkbox
								checked={paid}
								onCheckedChange={(checked) => setPaid(Boolean(checked))}
								disabled={!isAdmin}
							/>
							<span className='text-sm text-[#C4C4C4]'>Mark as paid</span>
						</div>

						<Button
							onClick={handleAddEntry}
							disabled={!isAdmin}
							className='mt-5 w-full bg-[#004F8E] hover:bg-[#8EFFFF] hover:text-black text-white'
						>
							Save Winner Entry
						</Button>
					</div>

					<div className='lg:col-span-3 p-5 rounded-xl border border-[#004F8E] bg-[#000000]/70 backdrop-blur-sm overflow-x-auto'>
						<table className='w-full min-w-[760px] text-left'>
							<thead>
								<tr className='border-b border-[#004F8E]/40 text-white'>
									<th className='py-2 pr-4 font-semibold'>Winner</th>
									<th className='py-2 pr-4 font-semibold'>Amount</th>
									<th className='py-2 pr-4 font-semibold'>Giveaway Type</th>
									<th className='py-2 pr-4 font-semibold'>LTC ADDY</th>
									<th className='py-2 pr-4 font-semibold'>Paid?</th>
									<th className='py-2 pr-2 font-semibold'>Action</th>
								</tr>
							</thead>
							<tbody>
								{entries.length === 0 && (
									<tr>
										<td colSpan={6} className='py-6 text-center text-[#C4C4C4]'>
											No reward entries yet.
										</td>
									</tr>
								)}
								{entries.map((entry) => (
									<tr key={entry.id} className='border-b border-[#004F8E]/20'>
										<td className='py-3 pr-4 text-[#8EFFFF]'>{entry.winner}</td>
										<td className='py-3 pr-4 text-[#C4C4C4]'>{entry.amount}</td>
										<td className='py-3 pr-4 text-[#C4C4C4]'>
											{entry.giveawayTypes.join(", ")}
										</td>
										<td className='py-3 pr-4 text-[#C4C4C4]'>{entry.ltcAddress}</td>
										<td className='py-3 pr-4'>
											<button
												type='button'
												onClick={() => togglePaid(entry.id)}
												disabled={!isAdmin}
												className={`px-2 py-1 text-xs rounded-md border transition-colors ${
													entry.paid
														? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50"
														: "bg-red-500/20 text-red-300 border-red-400/50"
												}`}
											>
												{entry.paid ? "Yes" : "No"}
											</button>
										</td>
										<td className='py-3 pr-2'>
											<button
												type='button'
												onClick={() => deleteEntry(entry.id)}
												disabled={!isAdmin}
												className='inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md border border-[#004F8E]/40 text-[#C4C4C4] hover:text-white hover:bg-[#004F8E]/30 disabled:opacity-50'
											>
												<Trash2 className='w-3.5 h-3.5' />
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default RewardsPage;
