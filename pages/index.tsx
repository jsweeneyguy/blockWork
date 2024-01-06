import { CandyMachine, Metaplex } from "@metaplex-foundation/js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading";
import { CANDY_MACHINE_ADDRESS } from "../lib/constants";


export default function Home() {
  const { connection } = useConnection();
  const [candyMachineAddress, setCandyMachineAddress] = useState(undefined);
  const [candyMachineMintAddr, setCandyMachineMintAddr] = useState(undefined);
  const [candyMachineMaxSupply, setCandyMachineMaxSupply] = useState(69);
  const [candyMachineItemsMinted, setCandyMachineItemsMinted] = useState(69);
  const [candyMachineItemsRemaining, setCandyMachineItemsRemaining] = useState(69);

  const [fetchedCM, setFetched] = useState(false);

  const metaplex = Metaplex
    .make(connection)

  const candyMachines = metaplex.candyMachines();

  async function fetchCandyMachine() {
    const fetched = await candyMachines
      .findByAddress({ address: CANDY_MACHINE_ADDRESS });

    console.log("Fetched candy machine!", fetched)
    console.log(fetched.itemsAvailable.toNumber(), fetched.itemsRemaining)
    console.log(fetched.itemsMinted.toNumber() , fetched.symbol, fetched.address, fetched.collectionMintAddress)
    setCandyMachineAddress(fetched.address);
    setCandyMachineMintAddr(fetched.collectionMintAddress);
    setCandyMachineMaxSupply(fetched.itemsAvailable.toNumber());
    setCandyMachineItemsMinted(fetched.itemsMinted.toNumber());
    setCandyMachineItemsRemaining(fetched.itemsRemaining.toNumber());


    //setCandyMachine(fetched);
  }

  useEffect(() => {
    fetchCandyMachine()
  }, [])

  const canMint = candyMachineItemsRemaining > 0

  return (
    <main className="flex flex-col gap-8 md:px-10">
      <video autoPlay loop muted>
      <source  src="./videos/video.mp4" type="video/mp4" />
      </video>
      <PageHeading>Welcome to blockScapes : About Us</PageHeading>
      <p className="text-white text-sm">
      Feel free to customize the styles in the CSS file to match your site's design. The provided styles demonstrate how to center the icons horizontally and vertically, add spacing between icons, and change the color on hover. Adjust these styles based on your specific requirements.
      </p>

      <PageHeading>Upcoming Mint : The Gucci Man</PageHeading>
      <div className="flex flex-row gap-10">
      <div className="flex flex-col gap-8">
      <img src="./images/ap_ex.png"/>
    </div>
    <div className="flex flex-col gap-10 md:px-10 10 width-50%">
      <p className="text-white text-sm">
      Gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci
      </p>
      <p className="text-white text-sm">
      Gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci
      </p>
      <p className="text-white text-sm">
      Gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci gucci gucci gucci gucci gucci gucci gucci Gucci gucci
      </p>
        <a href="/mint">
        <button 
          type="button"
          className="inline-flex position-relative items-center px-60 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md cursor-pointer hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canMint}
        >
          Mint 🦖
        </button>
        </a>
        {candyMachineItemsRemaining ? 
      <p className="text-white text-sm">
        Gucci Man Example work, Cook County Edition Piece. {candyMachineItemsRemaining} / {candyMachineMaxSupply} left to mint!
      </p>
     : <p className="text-white text-sm">Loading...</p>
    }
    </div>
    </div>
      <hr />
    </main>
  )
}
