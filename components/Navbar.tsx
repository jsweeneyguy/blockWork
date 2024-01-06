import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTwitter } from '@fortawesome/free-brands-svg-icons';
import PageHeading from "../components/PageHeading";

export default function Navbar() {
  return (
    <nav className="flex w-full h-full gap-4 pt-4 pb-10 font-sans text-white md:px-10 md:gap-10">
      <a href='/'>
      <PageHeading>blockScapes</PageHeading>
      </a>
      <a href='https://x.com/blockscapes'>
      <FontAwesomeIcon icon={faTwitter} color='white' size='2x' />
      </a>
      <Link href="/">
        <a className="text-2xl no-underline hover:text-slate-300">
          About
        </a>
      </Link>
      <Link href="/gallery">
        <a className="text-2xl no-underline text-grey-darkest hover:text-slate-300">
          Gallery
        </a>
      </Link>
      <Link href="/mint">
      <a className="text-2xl no-underline text-grey-darkest grow">
        Mint
      </a>
      </Link>
      <WalletMultiButton />
    </nav>
  )
}
