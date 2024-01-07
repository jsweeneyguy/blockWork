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
      <PageHeading>Welcome to blockScapes : About</PageHeading>
      <p className="text-white text-sm">
      Once an artist finishes a work it exists in the world of its own right and an artist cannot interpret their creation on behalf of the viewer or tell another heart what to feel. With that philosophy in mind blockScapes will primarily be a series of abstract generative art collections rendered using applied data and/or algorithms in p5.js. However, that said, each collection will use applied real world data or algorithms to explore a wide array of topics in math, science, and culture. The first release, American Problems, will explore the census tract data used to construct our counties and determine the well-being of our neighborhoods. The next release, a blockScapes self-titled collection, will look into visualizing landscapes in deep time. More to come in the future.
      </p>
      <p className="text-white text-sm">
      Where I plan to remain anonymous (for now) I will say that I am a data scientist based in Chicago working in Financial Services. I have been around in the crypto space since 2021 working as a freelance solidity developer and moonlighting as a degen trader. My generative art experience is mixed mostly amongst p5.js/processing and blender. I hope you enjoy, follow the twitter for more. 
      </p>
      <PageHeading>Upcoming Mint : American Problems</PageHeading>
      <div className="flex flex-row gap-10">
      <div className="flex flex-col gap-8">
      <img src="./images/ap_ex.png"/>
    </div>
    <div className="flex flex-col gap-10 md:px-10 10 width-50%">
      <p className="text-white text-sm">
      This project uses 2021 Census Data and ACS Data (American Community Survey) to get shape and socioeconomic data on all 73,057 census tracts in the United States. This data is used to construct a generative collection of 3,143 generative artworks, one artwork per county in the United States. This collection hopes to explore the issues involved with trying to represent or visualize such a wide body of people and range of land using this data.
      </p>
      <p className="text-white text-sm">
      All artworks are produced generatively in p5.js using the FIPS county code as the seed for randomness. All artworks and the associated code for image generation are stored immutably on Arweave (links can be found on twitter, or on-chain).
      </p>
      <p className="text-white text-sm">
      Mints will be priced at .03 per piece, with a max mint amount of 5 per wallet. As mentioned there is one piece per county in the US, making a total collection size of 3,143. 
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
