import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { FaKickstarterK } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='py-6 mt-16 border-t border-[#000000] bg-black text-white'>
			<div className='container mx-auto'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
					{/* About */}
					<div>
						<h3 className='mb-3 text-lg font-bold text-white'>Buhlockay</h3>
						<p className='text-sm text-white/80'>
							Join Buhlockay&apos;s community for exciting gambling streams,
							giveaways, and more. Use affiliate code{" "}
							<span className='font-semibold text-[#8EFFFF]'>buhlockay</span> on
							BC.Game.
						</p>
					</div>

					{/* Links */}
					<div>
						<h3 className='mb-3 text-lg font-bold text-white'>Links</h3>
						<div className='grid grid-cols-2 gap-2'>
							<Link
								to='/'
								className='text-sm text-white/70 transition-colors hover:text-[#004F8E]'
							>
								Home
							</Link>
							<Link
								to='/leaderboard'
								className='text-sm text-white/70 transition-colors hover:text-[#004F8E]'
							>
								Leaderboard
							</Link>
							<Link
								to='/terms'
								className='text-sm text-white/70 transition-colors hover:text-[#004F8E]'
							>
								Terms & Conditions
							</Link>
							<Link
								to='/privacy'
								className='text-sm text-white/70 transition-colors hover:text-[#004F8E]'
							>
								Privacy Policy
							</Link>
						</div>
					</div>

					{/* Social & Affiliates */}
					<div>
						<h3 className='mb-3 text-lg font-bold text-white'>Connect</h3>
						<div className='flex flex-wrap gap-3'>
							<a
								href='https://kick.com/buhlockay'
								target='_blank'
								rel='noreferrer'
								className='flex items-center justify-center transition-colors bg-[#000000] rounded-full w-9 h-9 hover:bg-[#004F8E] text-white'
							>
								<FaKickstarterK className='w-5 h-5' />
							</a>
							<a
								href='https://x.com/buhlockay'
								target='_blank'
								rel='noreferrer'
								className='flex items-center justify-center transition-colors bg-[#000000] rounded-full w-9 h-9 hover:bg-[#004F8E] text-white'
							>
								<FaXTwitter className='w-5 h-5' />
							</a>
							<a
								href='https://www.youtube.com/@buhlockay'
								target='_blank'
								rel='noreferrer'
								className='flex items-center justify-center transition-colors bg-[#000000] rounded-full w-9 h-9 hover:bg-[#004F8E] text-white'
							>
								<FaYoutube className='w-5 h-5' />
							</a>
							<a
								href='https://bc.game/i-buhlockay-n/'
								target='_blank'
								rel='noreferrer'
								className='flex items-center justify-center transition-colors bg-[#000000] rounded-full w-9 h-9 hover:bg-[#004F8E] p-1'
							>
								<img
									src='https://i.ibb.co/bg9jhGLs/3dgifmaker54349.gif'
									alt='BC.Game'
									className='object-contain w-full h-full'
								/>
							</a>
						</div>
					</div>

					{/* Gambling Warning */}
					<div className='md:pl-6 border-l border-[#000000]'>
						<h4 className='text-lg font-bold text-[#004F8E] mb-2'>
							BEWARE GAMBLING
						</h4>
						<p className='text-sm text-white/80 leading-relaxed'>
							We are not responsible for illegal gambling activities.
							<br />
							Play responsibly — gambling involves financial risks.
							<br />
							Ensure compliance with your local laws.
							<br />
							Seek help if you experience gambling issues.
						</p>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='pt-4 mt-8 text-sm text-center text-white/70 border-t border-[#000000]'>
					<p className='flex flex-wrap items-center justify-center gap-1 text-sm'>
						© {currentYear} Buhlockay. Made with
						<Heart className='w-3 h-3 mx-1 text-[#004F8E]' />
						for the community by{" "}
						<a
							href='https://www.linkedin.com/in/skander-kefi/'
							target='_blank'
							rel='noreferrer'
							className='font-medium text-white hover:text-[#004F8E]'
						>
							Skander
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
